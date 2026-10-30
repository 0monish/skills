import { readFile, readdir } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isMap, isScalar, parseDocument } from "yaml";

const root = fileURLToPath(new URL("../", import.meta.url));
const failures = [];
const record = (file, message) => failures.push(relative(root, file) + ": " + message);
const requireThat = (ok, file, message) => { if (!ok) record(file, message); };
const nonempty = (value) => typeof value === "string" && value.trim().length > 0;
const oneLine = (value) => nonempty(value) && !/[\r\n]/.test(value);

function yaml(source, file) {
  const doc = parseDocument(source, { uniqueKeys: true });
  for (const error of [...doc.errors, ...doc.warnings]) record(file, error.message);
  if (doc.errors.length || doc.warnings.length) return null;
  if (!isMap(doc.contents)) {
    record(file, "expected a YAML mapping");
    return null;
  }
  return doc;
}

async function checkSkill(directory) {
  const file = join(directory, "SKILL.md");
  const text = (await readFile(file, "utf8")).replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
  if (!match) {
    record(file, "expected YAML frontmatter followed by Markdown");
    return;
  }
  const doc = yaml(match[1], file);
  if (!doc) return;
  const metadata = doc.toJS({ maxAliasCount: 0 });
  requireThat(Object.keys(metadata).sort().join(",") === "description,name", file,
    "frontmatter must contain only name and description");
  const name = metadata.name;
  requireThat(typeof name === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)
    && name.length <= 64 && name === basename(directory), file,
    "name must match the folder and use 1 to 64 lowercase letters, digits, or single hyphens");
  const description = doc.get("description", true);
  const value = description?.value;
  requireThat(isScalar(description) && oneLine(value) && value.length <= 1024, file,
    "description must be a nonempty single-line string of at most 1024 characters");
  if (description?.range) {
    requireThat(!/[\r\n]/.test(match[1].slice(...description.range.slice(0, 2))), file,
      "description must occupy one physical source line");
  }
  requireThat(match[2].trim().length > 0, file, "instruction body must not be empty");

  const configFile = join(directory, "agents", "openai.yaml");
  const configDoc = yaml(await readFile(configFile, "utf8"), configFile);
  if (!configDoc) return;
  const config = configDoc.toJS({ maxAliasCount: 0 });
  const ui = config.interface;
  requireThat(ui && typeof ui === "object" && !Array.isArray(ui), configFile,
    "interface must be a mapping");
  requireThat(oneLine(ui?.display_name), configFile, "display_name must be a nonempty line");
  requireThat(oneLine(ui?.short_description)
    && ui.short_description.length >= 25 && ui.short_description.length <= 64, configFile,
    "short_description must contain 25 to 64 characters on one line");
  const expectedInvocation = "$" + name;
  requireThat(oneLine(ui?.default_prompt)
    && ui.default_prompt.split(/[^$a-z0-9-]+/).includes(expectedInvocation), configFile,
    "default_prompt must mention " + expectedInvocation);
  if (config.policy !== undefined) {
    requireThat(config.policy && typeof config.policy === "object" && !Array.isArray(config.policy),
      configFile, "policy must be a mapping");
    const implicit = config.policy?.allow_implicit_invocation;
    requireThat(implicit === undefined || typeof implicit === "boolean", configFile,
      "allow_implicit_invocation must be a boolean");
  }
}

async function checkText(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const file = join(directory, entry.name);
    if (entry.isDirectory()) await checkText(file);
    else if ([".md", ".yaml", ".yml"].includes(extname(file))) {
      const source = await readFile(file, "utf8");
      requireThat(!source.includes(String.fromCodePoint(0x2014)), file, "em dashes are not allowed");
      if ([".yaml", ".yml"].includes(extname(file))) yaml(source, file);
    }
  }
}

try {
  const directory = join(root, "skills");
  const entries = await readdir(directory, { withFileTypes: true });
  const skills = entries.filter((entry) => entry.isDirectory() && !entry.name.startsWith("."));
  requireThat(skills.length > 0, directory, "expected at least one skill");
  for (const entry of skills) {
    try { await checkSkill(join(directory, entry.name)); }
    catch (error) { record(join(directory, entry.name), error.message); }
  }
  await checkText(root);
  if (!failures.length) console.log("Checked " + skills.length + " skill(s): all repository checks passed.");
} catch (error) {
  record(root, error.message);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
