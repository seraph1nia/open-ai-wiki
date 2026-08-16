#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
repository_wiki="$repo_root/openwiki"
personal_root="$HOME/.openwiki"
personal_wiki="$personal_root/wiki"
publisher_marker="$personal_root/.ai-knowledge-publisher"
source_config="$repo_root/config/openwiki/onboarding.json"
action="${1:-update}"
shift || true

# Some pnpm versions forward the `--` argument separator verbatim; drop it so
# `pnpm wiki:ingest -- <target>` and `pnpm wiki:ingest <target>` behave alike.
if [[ "${1:-}" == "--" ]]; then
  shift
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "wiki update requires rsync" >&2
  exit 1
fi

publisher_id="$(git -C "$repo_root" remote get-url origin 2>/dev/null || printf '%s' "$repo_root")"

has_unclaimed_personal_state() {
  [[ -f "$personal_root/onboarding.json" || -f "$personal_root/INSTRUCTIONS.md" ]] && return 0
  [[ -d "$personal_wiki" ]] && find "$personal_wiki" -mindepth 1 -print -quit | grep -q . && return 0
  [[ -d "$personal_root/connectors" ]] && find "$personal_root/connectors" -mindepth 1 -print -quit | grep -q . && return 0
  return 1
}

claim_personal_workspace() {
  mkdir -p "$personal_root"

  if [[ -f "$publisher_marker" ]]; then
    local claimed_by
    claimed_by="$(<"$publisher_marker")"
    if [[ "$claimed_by" != "$publisher_id" ]]; then
      echo "~/.openwiki is already claimed by another publishing repository: $claimed_by" >&2
      exit 1
    fi
    return
  fi

  if has_unclaimed_personal_state; then
    echo "Refusing to publish an existing, unclaimed personal OpenWiki workspace." >&2
    echo "Move ~/.openwiki aside or review and claim it explicitly before running this repository's wiki commands." >&2
    exit 1
  fi

  printf '%s\n' "$publisher_id" >"$publisher_marker"
}

stage_personal_workspace() {
  claim_personal_workspace
  mkdir -p "$personal_wiki"
  cp "$source_config" "$personal_root/onboarding.json"
  cp "$repository_wiki/INSTRUCTIONS.md" "$personal_root/INSTRUCTIONS.md"
  rsync -a --delete --exclude=INSTRUCTIONS.md "$repository_wiki/" "$personal_wiki/"
}

publish_personal_wiki() {
  rsync -a --delete --exclude=INSTRUCTIONS.md "$personal_wiki/" "$repository_wiki/"
}

stage_personal_workspace

case "$action" in
  chat)
    openwiki personal "$@"
    ;;
  ingest)
    # The target is optional, so only consume the first argument when it is a
    # source id rather than a flag; otherwise `ingest --scheduled` would send
    # `--scheduled` where the CLI expects `<source|source-instance|all>`.
    target=all
    if [[ -n "${1:-}" && "$1" != -* ]]; then
      target="$1"
      shift
    fi
    openwiki ingest "$target" --print "$@"
    ;;
  update)
    if (($# > 0)); then
      request="$*"
      openwiki personal --update --print "$request"
    else
      openwiki ingest all --print
    fi
    ;;
  *)
    echo "usage: $0 <chat|ingest|update> [arguments]" >&2
    echo "       $0 ingest [all|<connector-id>|<source-instance-id>]" >&2
    exit 2
    ;;
esac

publish_personal_wiki
