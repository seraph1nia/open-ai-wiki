import { assertValidWiki, validateWiki } from "./wiki-validator.js";

const report = await validateWiki();
assertValidWiki(report);
console.log(`WIKI_OK files=${report.files} links=${report.links}`);
