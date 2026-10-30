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
### ⚠️ HIGH | correctness | blocking: <observable failure>

- **Problem:** <trigger, defect, consequence>
- **Evidence:** <observed result or source trace>; [Code: function](URL), [Rule: section](URL).
- **Change:** <required behavior>
- **Check:** <scenario and expected result>; <proposed or executed>.
```

Use the expanded form when explanation is needed. A simple correction can be one line:

```markdown
⚠️ **change (blocking):** Rename `retryMS` to `retryMs` to match adjacent public options.
```

One cause gets one canonical thread. Use `Code`, `Rule`, `Run`, `Thread`, and `Fix` link labels only where they help navigation. The summary links findings instead of repeating them. Re-review distinguishes fixed, unverified, refuted, superseded, and deferred claims.

Questions, optional suggestions, and verified fixes use `❓`, `💡`, and `✅`, with text labels. Impact severity stays separate from blocking status. A verified missing acceptance condition uses `GATE` without inventing a product defect.

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
- No em dashes in authored Markdown or YAML.

These are repository checks, not a certification of agent behavior or formal ASD-STE100 compliance. Keep skill descriptions short. Add reference files only when a real task branch needs them. Keep research, installation guidance, and evaluations outside the installed skill.

## License

[MIT](LICENSE).
