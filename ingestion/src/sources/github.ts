import type { NormalizedSource, SourceAdapter } from "../types.js";
import { canonicalizeUrl, sha256 } from "../utils.js";
type GitHubRelease = {
  name: string | null;
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
  author?: { login?: string };
};
const headers = {
  accept: "application/vnd.github+json",
  "user-agent": "ai-knowledge-harvester/0.1",
  "x-github-api-version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};
async function github<T>(path: string): Promise<T> {
  const r = await fetch(`https://api.github.com${path}`, { headers });
  if (!r.ok) throw new Error(`GitHub API ${r.status}: ${path}`);
  return r.json() as Promise<T>;
}
export class GitHubAdapter implements SourceAdapter {
  canHandle(input: string) {
    try {
      return new URL(input).hostname.toLowerCase() === "github.com";
    } catch {
      return false;
    }
  }
  async acquire(input: string): Promise<NormalizedSource> {
    const url = new URL(input);
    const [owner, repo, ...rest] = url.pathname.split("/").filter(Boolean);
    if (!owner || !repo) throw new Error(`Unsupported GitHub URL: ${input}`);
    const repository = `${owner}/${repo}`;
    if (rest[0] === "releases" && rest[1] === "tag" && rest[2]) {
      const release = await github<GitHubRelease>(
        `/repos/${repository}/releases/tags/${encodeURIComponent(rest.slice(2).join("/"))}`,
      );
      const content = `# ${release.name ?? release.tag_name}\n\n${release.body}`;
      return {
        metadata: {
          title: release.name ?? `${repository} ${release.tag_name}`,
          url: release.html_url,
          canonicalUrl: canonicalizeUrl(release.html_url),
          sourceType: "github_release",
          publishedAt: release.published_at,
          retrievedAt: new Date().toISOString(),
          repository,
          release: release.name ?? release.tag_name,
          tag: release.tag_name,
          ...(release.author?.login ? { author: release.author.login } : {}),
        },
        content,
        contentHash: sha256(content),
      };
    }
    const repoData = await github<{
      html_url: string;
      description: string | null;
      default_branch: string;
      pushed_at: string;
      owner: { login: string };
    }>(`/repos/${repository}`);
    const chunks: string[] = [];
    const readme = await fetch(
      `https://raw.githubusercontent.com/${repository}/${repoData.default_branch}/README.md`,
    );
    if (readme.ok)
      chunks.push(`# README\n${(await readme.text()).slice(0, 60000)}`);
    const tree = await github<{
      sha: string;
      tree: Array<{ path: string; type: string; url: string }>;
    }>(`/repos/${repository}/git/trees/${repoData.default_branch}?recursive=1`);
    const useful = tree.tree
      .filter(
        (item) =>
          item.type === "blob" &&
          /(^|\/)(CHANGELOG|SPECIFICATION|ARCHITECTURE|docs?\/.*\.(?:md|mdx))$/i.test(
            item.path,
          ),
      )
      .slice(0, 8);
    for (const item of useful) {
      const raw = await fetch(
        `https://raw.githubusercontent.com/${repository}/${repoData.default_branch}/${item.path}`,
      );
      if (raw.ok)
        chunks.push(`\n# ${item.path}\n${(await raw.text()).slice(0, 25000)}`);
    }
    const content = chunks.join("\n");
    if (!content)
      throw new Error(`No prioritized documentation found for ${repository}`);
    return {
      metadata: {
        title: repository,
        url: repoData.html_url,
        canonicalUrl: canonicalizeUrl(repoData.html_url),
        sourceType: "github",
        publishedAt: repoData.pushed_at,
        retrievedAt: new Date().toISOString(),
        author: repoData.owner.login,
        repository,
        commit: tree.sha,
      },
      content,
      contentHash: sha256(content),
    };
  }
}
