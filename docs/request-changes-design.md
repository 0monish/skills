# Request Changes: design and validation

Research date: 30 October 2026, UTC. The normative workflow is [SKILL.md](../skills/request-changes/SKILL.md). [Review evidence](review-evidence.md) records the corpus, examples, and limits. These documents are optional research context, outside the installed skill.

## Decision

Use one self-contained finding per independently fixable cause, anchored to the relevant diff. Check four things: Problem, Evidence, Change, and Check. Expand them into four bullets when explanation matters; keep an obvious local correction to one sentence or exact suggestion. The summary indexes canonical threads and material scope limits.

This is a local profile inspired by established guidance. It is not an IETF standard, a strict Conventional Comments parser format, or a certification of ASD-STE100 compliance.

## Components, dependencies, and verification

| Component | Independence boundary | Correctness check |
| --- | --- | --- |
| Scope and revision | Independent of visual styling; prerequisite for current claims. | Reconcile the reviewed revision with the candidate before publishing. |
| Causal finding | Depends on code or contract evidence, not on the chosen severity word. | Can the stated trigger reach the stated consequence? |
| Evidence | Independent of typography; depends on source applicability. | Does the exact linked source support the nearby claim at the relevant version? |
| Severity | Depends on demonstrated impact and scope. Independent of priority, confidence, and disposition. | Would changing only a deadline or review policy change the severity? It should not. |
| Acceptance gap | Depends on a cited acceptance rule. Does not establish a product defect. | Can the missing evidence be identified without inventing a runtime failure? |
| Required change | Depends on the failed behavior. Implementation advice remains optional. | Could a different correct implementation satisfy the same request? |
| Verification | Depends on the behavior and its trigger, not the proposed patch's text. | Would the unfixed behavior fail the check? Could a valid-path control catch a disabling fix? |
| Finding identity | Depends on cause and required outcome, not wording, author, or current line number. | Does the existing thread already own this correction? |
| Retrieval and decision state | Depends on exact sources and later authoritative decisions. Independent of icon choice. | Can a future agent recover the applicable contract, inspected revision, and active request without guessing? |
| Markdown and icons | Presentation can change independently if the same decisions remain recoverable. | Remove icons and formatting: do the text labels still communicate the meaning? |
| Publication | Depends on authorization, current anchors, and prior write outcomes. | After an uncertain write, can the existing review be reconciled before retrying? |
| Packaging | Independent of any particular repository's review policy. | Does the installer discover the skill, and does metadata name its actual invocation? |

These units are not all mutually independent. For example, severity depends on the consequence, and a change request depends on a supported finding. Treating every unit as independent would hide those prerequisites.

## Why this shape

### Four checks, two output sizes

The first design required four bullets for every finding. Actual inline naming and local replacement requests in Bun, VS Code, and historical KWin reviews challenged that choice. If the location, reason, and completion are already evident, repeating them under four headings adds no decision value. The final skill makes the expanded form conditional.

Problem contains the trigger, faulty behavior, and consequence. Splitting those into three mandatory sections creates more scaffolding than many defects need. Combining them into one unexplained label loses the cause. Two short sentences usually preserve both.

Evidence names the observation or source trace. A primary link lets another agent verify the claim without consuming a pasted specification. The local claim remains explicit, because a bare link forces readers to infer why it matters. Commit-pinned code links preserve the inspected version.

Change states the required outcome. A tiny code suggestion is useful when it is exact and independently understandable. Requiring a complete patch for every review would encourage guesses and duplicate the implementer's work.

Check states a scenario and observable result. It distinguishes a proposed test from an executed result. A race needs an event order. A security rejection often needs a valid-path control so that rejecting everything does not appear correct.

This adapts [Google's guidance](https://google.github.io/eng-practices/review/reviewer/comments.html) to explain relevant reasons while leaving implementation judgment to the author. A check can be inspection, a focused experiment, or a meaningful test. A test that only mirrors a trivial implementation is not automatically useful.

### One title carries the first decision

An expanded finding's heading contains severity, category, disposition, and an observable failure. "Stale replies discard the current request" identifies the failure. A compact correction can omit a meaningless impact score.

The skill keeps impact, acceptance, and certainty distinct. HIGH is an impact level. Blocking is a review acceptance decision. Reproduced and Traced describe the evidence. GATE is reserved for a verified acceptance gap with no demonstrated product impact. A missing required native run can prevent acceptance without proving a platform defect.

A repository's documented scale takes precedence. P0 and P1 are not assigned a universal meaning. Scheduling priority is omitted unless the task requires it.

### Icons are a visual grammar, not decoration

The initial four-icon scheme did not distinguish severity, review intent, and topic at a glance. A [CodeRabbit KELD example](https://github.com/gyldlab/keld/pull/2#discussion_r3774406489) makes these axes visible separately: reliability domain, major impact, and heavy-lift effort. Its [security counterpart](https://github.com/gyldlab/keld/pull/2#discussion_r3774406507) uses a different domain marker. In a local inventory of 715 root inline comments by that bot, 595 contained "Quick win" and 119 "Heavy lift"; many included collapsed analysis. These are descriptive counts of the inspected records, not measured user comprehension or token savings.

The revised design uses **different shapes plus words** for impact: 🛑 CRITICAL, 🔺 HIGH, 🔶 MEDIUM, 🔹 LOW. Nonseverity actions have their own shapes: 🚧 GATE, 🧷 TODO, 🔎 QUESTION, 🌱 SUGGESTION. A topic icon, such as 🛡️ security or 🧵 concurrency, is optional and never replaces its text label. Expanded findings use stable 📎 Evidence, 🛠 Change, and 🧪 Check field markers. Compact corrections do not receive these three repeated fields.

The title puts impact first, then topic and intent. Review status stays separate. Do not put an effort estimate into every title: a HIGH defect can be a local fix or an architectural repair. `vulnerability` is a security finding type, not a synonym for CRITICAL. An unverified exploit hypothesis is not a confirmed vulnerability. `GATE` names an unmet verified acceptance condition, not the impact of a hypothetical product bug.

This uses the separation of severity and security severity described in [GitHub code scanning](https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning-alerts) and the [FIRST CVSS v4 qualitative scale](https://www.first.org/cvss/v4.0/specification-document) as terminology references, **not** as authority to invent CVSS scores. The independent review-intent grammar is informed by [Conventional Comments](https://conventionalcomments.org/). Shape and text redundancies follow [W3C use-of-color guidance](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), without claiming WCAG certification.

The optional [worked examples](../skills/request-changes/references/examples.md) are routed only when the case is complex or ambiguous. They contain historical primary links and explicit limits, not current findings. Markdown examples are not duplicated as executable templates or JSON.

### Lists, tables, and links have different jobs

Use bullets for an expanded finding's different fields, a table for a real mapping or comparison, and a short list of links for the review index. Do not place whole findings into wide table cells.

A table containing a long defect, source excerpts, patch, and test procedure is difficult to scan in a narrow diff pane. An all-prose comment can hide the requested action. Neither observation proves that one syntax always uses fewer model tokens.

A collapsible details block hides rendered text but still sends its contents through the API. It is therefore not a context reduction mechanism by itself.

### Report evidence without process labels

Historical examples can contain reviewer branding, tool badges, or internal workflow narration. These labels do not belong in the reusable output pattern. Keep method details when they affect reproducibility, evidence limits, or required disclosure. For example, source inspection and an executed platform test establish different evidence. Preserve citations and decision ownership without copying ceremonial reviewer labels.

### Links should recover the decision

Role-labelled links tell an agent why it would open a target. Code provides the inspected source; Rule provides the controlling contract; Run provides an execution receipt; Thread provides the canonical conversation or decision; Fix provides the corrective change. None of these labels makes its target trustworthy by itself.

Use only the pointers needed for the claim or next action. An inline anchor already supplies location, so every small comment does not need another Code link. A version-sensitive finding does need the relevant code or contract version. A test result needs the revision and artifact that actually ran.

Prefer one hop to the relevant lines, result, or decision. Linking a repository root or an entire issue search forces the next agent to reconstruct the path. Copying the whole specification consumes context and can drift from the source. A short local causal statement plus an exact source target balances these costs.

A pinned source preserves history but does not establish current truth. A future agent must read later decisions and current code before acting. VS Code's changed scope direction and Bun's disputed API premise show why "links exist" is weaker than "the active decision is recoverable."

### Re-review is a delta

Reuse the existing thread for the same cause and required outcome. Reply with current status, new evidence, and remaining action. Do not append the original finding again. Different reviewers can describe the same cause differently; conversely, two security findings can require independent fixes.

Fixed, still present, and unverified describe the checked outcome. Refuted records a disproved premise. Superseded points to a replacement decision. Deferred points to an authorized follow-up and owner where known. These states preserve history without asking future readers to treat every old instruction as active.

A resolved flag can record conversation state without proving the code is correct. An outdated anchor can follow a changed diff without proving the defect disappeared. A timed-out write can have succeeded. These cases require source or publication reconciliation, not another copy of the comment.

## Alternatives rejected

| Alternative | Reason |
| --- | --- |
| Four mandatory headings for every correction | Repeats facts already evident from a short inline request. |
| One large top-level review containing every finding | Weak local anchors, difficult independent resolution, repeated retrieval. |
| An identical full finding in both thread and summary | Two copies can drift and consume context. |
| A mandatory JSON block beside Markdown | Duplicates the same semantics without a current machine-consumer requirement. |
| A new finding ID registry | GitHub thread IDs already identify published conversations. |
| A purely color-coded severity ladder | Color alone is not an accessible or portable distinction. |
| Putting effort in every title | Effort estimates can be unverified and are independent of impact. |
| Icons for every body sentence | Complicates scanning and consumes input without adding a decision. |
| Every pointer in every finding | Adds repetitive links when the anchor and local statement already suffice. |
| Treating "fixed" as the only closed state | Misrepresents disproved claims and superseded requirements. |
| Severity inferred from an icon or P-number | Requires an implicit legend and can mix impact with urgency. |
| CRITICAL for every possible security consequence | Severity requires a supported consequence and stated conditions. |
| A fixed word cap that discards evidence | Shortness is not a substitute for recoverable causality and scope. |
| A complete patch for every finding | Encourages speculative implementation and bloated comments. |
| A custom npm CLI for one Markdown skill | The existing Skills CLI already installs GitHub collections. |
| Reproducing a complete controlled-language dictionary | Adds substantial context and still would not demonstrate formal STE compliance. |

## Repository distribution

The collection uses the discoverable `skills/request-changes/SKILL.md` layout. Frontmatter contains only the name and a one-line description. `agents/openai.yaml` contains the OpenAI interface metadata and an explicit invocation example.

The root package manifest is private development tooling with one pinned YAML parser and a lockfile. The GitHub collection remains public and can be installed with `npx skills add 0monish/skills`. No custom npm executable, package publication, or installation lifecycle hook is required.

The repository check parses YAML rather than approximating it with regular expressions. It checks the collection's small profile, interface metadata, and no-em-dash rule. A read-only GitHub Actions job runs the same check. Root documentation and MIT licensing support public reuse without expanding the installed skill.

## Validation performed

- OpenAI's bundled skill validator accepted the skill.
- Skills CLI 1.7.4 discovered exactly one skill through the local repository path.
- The repository check accepted the normal files and a CRLF variant.
- Nine deliberately invalid cases failed: em dash, name mismatch, duplicate YAML key, physically multiline description, escaped description newline, empty body, wrong explicit invocation, missing interface file, and a string in place of a boolean policy.
- Three fresh agent tasks exercised the instructions without receiving the expected answers. The first two covered stale replies, duplicate threads, zero selected tests, unsupported security claims, formatting-only scope, and cancelled native proof. Their outputs led to the GATE distinction and a shorter re-review rule.
- The third task used the revised skill. It preserved an unknown publication outcome, avoided a blind retry, reported a queued native proof as GATE, and gave a source-qualified reply in the original thread.
- Two further tasks exercised the compact format and decision recovery. A local correction stayed on one line. A re-review distinguished a superseded direction, a refuted API premise, and queued current-head acceptance proof. It preserved role-labelled pointers and did not use an older green run as current evidence.
- The latter draft used withdrawal language about another author's finding. The final wording explicitly preserves author attribution and distinguishes reporting a refutation from withdrawing someone else's review.
- Separate reviews inspected the repository setup and the revised skill's classification, publication, navigation, and verification semantics.

These are bounded development observations. They do not establish a statistical improvement across models, universal token savings, automatic activation in every host, or native product qualification. Structural validation and agent behavior are different evidence.

## Primary references

| Source | Applied principle |
| --- | --- |
| [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119.html) and [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174.html) | Explicit requirement strength; special meanings for uppercase keywords. |
| [ASD-STE100 official FAQ](https://asd-ste100.org/STE_faq.html) | Short sentences, active voice, one topic, and relevant conditions before actions. |
| [Conventional Comments](https://conventionalcomments.org/) | Explicit comment intent and disposition. This profile uses its own Markdown heading syntax. |
| [Google review comments](https://google.github.io/eng-practices/review/reviewer/comments.html) and [review standard](https://google.github.io/eng-practices/review/reviewer/standard.html) | Relevant reasoning, useful guidance, and technical evidence over preferences. |
| [GitHub review workflow](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/reviewing-proposed-changes-in-a-pull-request) | Inline comments, review disposition, and separate repository merge enforcement. |
| [GitHub permanent links](https://docs.github.com/en/repositories/working-with-files/using-files/getting-permanent-links-to-files) and [review comment API](https://docs.github.com/en/rest/pulls/comments) | Stable source versions, exact anchors, and canonical comment identities. |
| [W3C H86](https://www.w3.org/WAI/WCAG21/Techniques/html/H86) | Preserve icon meaning with text. |
| [Agent Skills specification](https://agentskills.io/specification) | Portable frontmatter and folder structure. |
| [OpenAI interface metadata](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.system/skill-creator/references/openai_yaml.md) and [current skill documentation](https://learn.chatgpt.com/docs/build-skills) | Optional host metadata and invocation behavior. |
| [Skills CLI discovery](https://github.com/vercel-labs/skills/blob/92a9a34ac3bf88e695e468b90c7bf32f163d32c8/docs/creating-skills.md) and [commands](https://github.com/vercel-labs/skills/blob/92a9a34ac3bf88e695e468b90c7bf32f163d32c8/docs/commands.md) | GitHub source installation and supported layout. |
| [Matt Pocock's writing-for-agents](https://github.com/mattpocock/skills/blob/a496f5513d4a4cf889bc48e189e579f4b0bdf6aa/skills/productivity/writing-for-agents/SKILL.md) | Task triggers, local completion criteria, and selective disclosure. |
| [YAML v2 API](https://eemeli.org/yaml/v2/) | A real YAML parser for repository checks. |

Matt's guidance was compared critically. Host-specific invocation switches and claims about universal context savings were not transferred into the portable skill. No upstream skill was copied wholesale.
