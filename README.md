# Skills

Reusable agent skills by Monish Khandelwal.

## Install

List the available skills:

```bash
npx skills add 0monish/skills --list
```

Install Request Changes for Codex in the current project:

```bash
npx skills add 0monish/skills --skill request-changes -a codex
```

Add `-g` to install across projects. Omit `-a codex` to select another supported agent.

The [Skills CLI](https://github.com/vercel-labs/skills/blob/main/docs/commands.md) installs directly from this GitHub repository. This collection does not require its own npm package or a custom installer. The private `package.json` is repository tooling; it does not make the GitHub repository private.

## Use

In Codex:

```text
$request-changes Review this PR and draft concise change requests.
```

The description also supports automatic selection by compatible hosts. Automatic selection is host-dependent. Invoking the skill does not grant permission to publish a review.

| Skill | Purpose |
| --- | --- |
| [Request Changes](skills/request-changes/SKILL.md) | Present actionable review findings with direct evidence, a required outcome, and a verification step. |

The portable instructions use the [Agent Skills format](https://agentskills.io/specification). Optional Codex interface metadata lives in `agents/openai.yaml`. This file is separate from an OpenAPI service definition.

## Review format

```markdown
### 🔺 HIGH · 🧵 concurrency · issue (blocking): <observable failure>

- **Problem:** <trigger, defect, consequence>
- **📎 Evidence (traced):** <source trace>; [Code: function](URL), [Rule: section](URL).
- **🛠 Change:** <required behavior>
- **🧪 Check (proposed):** <scenario and expected result>.
```

Use the expanded form when explanation is needed. A simple correction can be one line:

```markdown
🧷 **todo (blocking):** Fix the new local variable typo `timeotMs` to `timeoutMs`.
```

When a repository has no severity scale, use **🛑 Critical, 🔺 High, 🔶 Medium, 🔹 Low**. Keep a repository's existing severity or priority labels without converting them. Defects are `issue` comments; separate kinds use **🚧 Gate, 🧷 Todo, 🔎 Question, 🌱 Suggestion**. These markers differ by shape and always have text labels. `Vulnerability` names a supported security weakness, not a severity or a merge verdict.

One cause gets one canonical thread. Use `Code`, `Rule`, `Run`, `Thread`, and `Fix` link labels only where they help navigation. The summary links findings instead of repeating them. Re-review distinguishes fixed, unverified, refuted, superseded, and deferred claims.

[Eight worked examples](skills/request-changes/references/examples.md) cover security, races, missing proof, compatibility, compact comments, re-review, summaries, and terminology traps. Agents load this reference only when the relevant pattern is needed.

[Design decisions](docs/request-changes-design.md) explain the tradeoffs. [Review evidence](docs/review-evidence.md) contains the KELD census and cross-repository comparisons. The skill works without loading either document.

## Maintain

Use Node.js and npm:

```bash
npm ci --ignore-scripts
npm run check
npx skills add . --list
```

The check validates this collection's deliberately small profile:

- Flat `skills/<name>/SKILL.md` layout, matching lowercase names, and only `name` and `description` frontmatter.
- A nonempty, single-line description and a nonempty instruction body.
- Valid `agents/openai.yaml` interface fields and the correct explicit invocation.
- No em dashes in authored Markdown or YAML. Referenced examples must exist.

These are repository checks, not a certification of agent behavior or formal ASD-STE100 compliance. Keep skill descriptions short. Add reference files only when a real task branch needs them. Keep research, installation guidance, and evaluations outside the installed skill.

## License

[MIT](LICENSE).
