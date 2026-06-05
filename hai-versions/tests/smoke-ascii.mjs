import fs from "node:fs";
import path from "node:path";

const root = fs.existsSync(path.resolve("hai-version-explainers"))
  ? path.resolve("hai-version-explainers")
  : path.resolve("hai-versions");
const appPath = path.join(root, "assets", "app.js");
const app = fs.readFileSync(appPath, "utf8");
const versions = ["v1-0", "v1-1", "v1-2", "v1-3", "v1-4", "v1-5", "v1-6"];
const storyMarkers = [
  "data-story-title",
  "data-story-lead",
  "data-story-before",
  "data-story-after",
  "data-owner-question"
];
const productMarkers = [
  "data-agent-role",
  "data-product-positioning",
  "data-system-inputs",
  "data-system-process",
  "data-system-outputs",
  "data-mental-model",
  "data-version-changes",
  "data-version-functions",
  "data-profile-governance"
];

for (const version of versions) {
  const page = path.join(root, "versions", version, "index.html");
  if (!fs.existsSync(page)) throw new Error(`missing page: ${page}`);
  const html = fs.readFileSync(page, "utf8");
  if (!html.includes(`data-version="${version}"`)) throw new Error(`wrong data-version in ${page}`);
  if (!html.includes('class="shell version-site"')) throw new Error(`missing standalone version-site shell in ${page}`);
  if ((html.match(/data-ascii-art/g) || []).length !== 1) throw new Error(`ascii target must appear exactly once in ${page}`);
  if ((html.match(/data-ai-visual/g) || []).length !== 1) throw new Error(`ai visual target must appear exactly once in ${page}`);
  const heroIndex = html.indexOf('class="version-hero"');
  const asciiIndex = html.indexOf('class="section ascii-section"');
  const storyIndex = html.indexOf('class="section version-story"');
  if (!(heroIndex !== -1 && heroIndex < asciiIndex && asciiIndex < storyIndex)) {
    throw new Error(`ascii/story order is wrong in ${page}`);
  }
  for (const marker of storyMarkers) {
    if (!html.includes(marker)) throw new Error(`missing ${marker} in ${page}`);
  }
  for (const marker of productMarkers) {
    if (!html.includes(marker)) throw new Error(`missing ${marker} in ${page}`);
  }
  if (!app.includes(`"${version}":`)) throw new Error(`missing VERSION_DATA for ${version}`);
}

const asciiCount = (app.match(/asciiArt:\s*String\.raw`/g) || []).length;
if (asciiCount !== versions.length) {
  throw new Error(`expected ${versions.length} asciiArt entries, got ${asciiCount}`);
}

const websiteCount = (app.match(/website:\s*{/g) || []).length;
if (websiteCount !== versions.length) {
  throw new Error(`expected ${versions.length} website blocks, got ${websiteCount}`);
}

for (const marker of ["const PROFILE_DATA = {", "const VISUAL_DATA = {", "function renderAiVisual", "data-agent-role", "data-version-functions"]) {
  if (!app.includes(marker)) throw new Error(`missing profile renderer/data marker: ${marker}`);
}

const expectedOrder = 'const ORDER = ["v1-0", "v1-1", "v1-2", "v1-3", "v1-4", "v1-5", "v1-6"]';
if (!app.includes(expectedOrder)) {
  throw new Error("ORDER does not include all versions through v1-6");
}

if (app.includes('<a class="source-link"')) {
  throw new Error("source labels must not render as links under the local http.server root");
}

console.log(`OK: ${versions.length} HAI version websites configured with distinct ASCII + AI visual slots`);
