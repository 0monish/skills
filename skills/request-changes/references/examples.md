# Request Changes examples

Load only the example matching the current task. These are **format illustrations**, not fresh reviews or claims about current PR heads. Historical links provide provenance and can be superseded. Apply repository rules before using any severity or blocking label.

## 1. Security boundary, source-traced

An example adapted from the [original registry credential discussion](https://github.com/pnpm/get.pnpm.io/pull/63#discussion_r4115306707). Assume the reviewer verified the relevant origin-only check on the cited revision before assigning HIGH. This sample does not assert a current credential leak.

```markdown
### 🔺 HIGH · 🛡️ security · issue (blocking): Registry credentials escape the configured path

- **Problem:** When the tarball URL shares the registry origin but not its path, `headersFor` can attach registry credentials outside the authorized prefix.
- **📎 Evidence (traced):** `headersFor` compares origins but not paths. [Code: original `headersFor`](https://github.com/pnpm/get.pnpm.io/blob/14268f9a77498ce37038f629140978d073d1e33c/get-pnpm/src/registry.ts#L151-L154); [Thread: original review](https://github.com/pnpm/get.pnpm.io/pull/63#discussion_r4115306707). No network exploit run is claimed here.
- **🛠 Change:** Attach scoped credentials only when the initial request destination is inside the configured registry path.
- **🧪 Check (proposed):** An in-prefix URL keeps its token. An out-of-prefix same-origin URL receives no token.
```

Do not label this a confirmed `vulnerability` until the relevant code and reachable credential path support that stronger claim on the reviewed revision. An external review comment alone is not proof. The [redirect destination finding](https://github.com/pnpm/get.pnpm.io/pull/63#discussion_r4123401302) is a distinct entry point and should not be silently merged into this fix.

## 2. Race, reproduced on an exact revision

Adapted from the [native half-close report](https://github.com/gyldlab/keld/pull/1300#discussion_r4417340422). The stated 5/5 result is the historical reporter's result, not a fresh execution.

```markdown
### 🔺 HIGH · 🧵 concurrency · issue (blocking): A second preparation is admitted before Ready

- **Problem:** A write-half close can reach the owner before Ready, while an asynchronous failure message allows Ready to arm recovery first. A second supervisor preparation can begin before Ready.
- **📎 Evidence (reported):** [Thread: Linux half-close reproduction](https://github.com/gyldlab/keld/pull/1300#discussion_r4417340422) reports 5/5 failures at `b2fffe1a`. The test used `Socket.end()` and a held navigation, not a full link close.
- **🛠 Change:** Make the attempt-scoped pre-Ready denial win against Ready and recovery admission. Keep post-Ready recovery working.
- **🧪 Check (proposed):** Half-close before releasing navigation. Observe zero successor preparations. An early-arm mutant must fail; the healthy post-Ready control must pass.
```

For a review that independently runs this reproduction, replace `reported` with `reproduced` and link the exact new run, tested commit, platform, and witness.

## 3. Missing acceptance proof, not a demonstrated defect

Adapted from the [real-device work-area acceptance request](https://github.com/gyldlab/keld/pull/1164#discussion_r4366997562). This GATE example assumes an exact-head evidence inventory has verified the required comparison is missing. Without that check, leave the status unverified, not blocking.

```markdown
### 🚧 GATE · 🔬 verification · blocking: Second-display parity is unverified

- **Problem:** The required second-display, negative-offset, and dock-inset cases have no linked same-machine comparison. Source arithmetic alone cannot close this acceptance condition.
- **📎 Evidence (reported):** [Rule: pinned conversion contract](https://github.com/gyldlab/keld/blob/56b98a217c1db2842b32bab33c7093cf78ea9483/docs/specs/gh481-host-pushed-display-theme.md#L391-L409); [Thread: acceptance request](https://github.com/gyldlab/keld/pull/1164#discussion_r4366997562). The hypothetical reviewer has checked the current-head run inventory and found no qualifying receipt.
- **🛠 Change:** Supply the required platform comparison or obtain a documented scope decision from the responsible owner.
- **🧪 Check (proposed):** Compare the same layout and build against the declared oracle. Link the device, revision, outputs, and mismatches.
```

`GATE` does not mean MEDIUM or HIGH. Do not assert that the product already fails on the missing platform.

## 4. Bounded compatibility defect

Adapted from the [dialog defaultPath review](https://github.com/gyldlab/keld/pull/1308#discussion_r4417823605), without claiming the present implementation is broken. Impact is intentionally unranked: the historical review's labels do not establish a general MEDIUM rating.

```markdown
### 🧭 compatibility · issue (blocking): Directory defaultPath opens its parent

- **Problem:** An absolute directory hint is split into parent and basename. Open starts one directory too high; Save also inserts the directory name into the filename field.
- **📎 Evidence (reported):** [Thread: defaultPath behavior](https://github.com/gyldlab/keld/pull/1308#discussion_r4417823605). Native behavior needs verification at the reviewed commit.
- **🛠 Change:** When the absolute hint names an existing directory, use that directory. Preserve the existing file-hint behavior.
- **🧪 Check (proposed):** Test absolute directory and file hints in Open and Save. Assert both the starting folder and the filename field.
```

This historical concern was [reported as addressed by a later revision](https://github.com/gyldlab/keld/pull/1308#pullrequestreview-5706040350), with [fix commit](https://github.com/gyldlab/keld/commit/7689216ab453435e011d2fbf5c0c60db8c5d03d3). This is a before-fix presentation example, not a new review request.

## 5. Tiny required correction and optional improvement

These are synthetic wording examples. The inline diff already identifies the location.

```markdown
🧷 **todo (blocking):** Fix the new local variable typo `timeotMs` to `timeoutMs`.

🌱 **suggestion (non-blocking):** Consider extracting the repeated parser setup if another call site needs the same configuration.

🔎 **question (non-blocking):** What should this caller do when the operation is cancelled?
```

Do not add a CRITICAL/LOW label, category icon, or four repeated fields to these short comments. A question does not become a defect just because the reviewer can imagine failure.

## 6. Re-review: fix, refutation, and supersession

The reply stays in the canonical thread. Use the latest inspected revision and never claim to withdraw another reviewer's submission. The `fixed` and `unverified` lines below are **synthetic templates, not executed results**. Replace all angle-bracket values with real evidence before publishing.

```markdown
🏁 **fixed at `<verified-sha>`:** The receiver now binds the reply to the current document. [Fix: commit](<verified-commit-url>) and [Run: current-head negative control](<verified-run-url>) confirm stale replies are refused. No remaining action in this thread.

🧾 **refuted (historical):** The earlier claim assumed `std.posix.sigaction` returns an error union. The author's cited vendored declaration returns `void`. [Thread: original premise](https://github.com/oven-sh/bun/pull/25474#discussion_r2611672457); [Thread: counterevidence](https://github.com/oven-sh/bun/pull/25474#discussion_r2662096965). Recheck the vendored version before relying on this decision.

🔎 **decision pending (historical):** The same reviewer proposed deferring the shared-style extraction. [Thread: earlier direction](https://github.com/microsoft/vscode/pull/268248#discussion_r2401980523); [Thread: later proposal](https://github.com/microsoft/vscode/pull/268248#discussion_r2438699754). Verify the owner's acceptance before marking the older direction superseded.

🔀 **superseded (template):** [Thread: accepted replacement](<verified-decision-url>) replaces the earlier requirement in this PR. The remaining action is `<current-required-action>`.

⏳ **unverified at `<verified-sha>`:** Source change is present at [Fix: commit](<verified-commit-url>); the required native run is absent. Remaining action: execute and link the platform control.
```

Never publish synthetic template values. A reviewer proposal is not an accepted owner decision. Refuted means the premise failed; fixed means a valid defect was corrected with proof. These states are not interchangeable.

## 7. Review summary with canonical pointers

Use a short linked list for a few findings. For many independent findings, a compact `Impact | Finding | Status` table MAY aid scanning. Do not duplicate full bodies.

```markdown
Request changes on historical head `3074566f`. Source inspected; no native test was executed in this review pass.

- [Retained startup sender](https://github.com/gyldlab/keld/pull/1306#discussion_r4416623665) | source finding
- [Terminal write failure](https://github.com/gyldlab/keld/pull/1306#discussion_r4416623681) | source finding

Next: verify both source findings on a new head and execute the relevant negative controls.
```

This summary is adapted from the [historical review receipt](https://github.com/gyldlab/keld/pull/1306#pullrequestreview-5705636945). No new severity was invented for the two historical source findings. Use returned GitHub thread URLs after publication. Before posting, replace all example revisions and statements with current, verified evidence. Do not invent a comment ID, issue link, or result.

## 8. Severity and vulnerability are different terms

These are **classification examples only**, not reports of real defects:

| Incorrect interpretation | Correct classification |
| --- | --- |
| "Critical vulnerability" because a required test is missing | 🚧 `gate (blocking)` if a cited requirement and missing run are verified. No product impact is established. |
| "Confirmed vulnerability" because a possible attack is mentioned | 🔎 `question` until a source-backed exploit or boundary failure is established. |
| "High priority" means "HIGH impact" | Keep the repository's priority term. Assess impact separately; do not translate P1 into HIGH. |
| "Low impact" means "non-blocking" | 🔹 LOW may still block under an explicit acceptance rule. Disposition is independent. |
| "Critical" because a fix is difficult | Difficulty does not define severity. Use 🛑 CRITICAL only for supported catastrophic consequences. |

Do not use `vulnerable`, `exploit`, `reproduced`, or a CVSS score as decoration. Each carries an evidence claim. Link the relevant source, rule, and run when that claim matters.
