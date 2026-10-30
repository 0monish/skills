# Review evidence and comparison

Research snapshot: 30 October 2026, UTC. This is presentation research, not a new technical review of the sampled changes. The [design](request-changes-design.md) explains the resulting choices. The installed [skill](../skills/request-changes/SKILL.md) does not require this document.

## Coverage

| Source | Inspected material | Boundary |
| --- | --- | --- |
| KELD | Complete available API inventory of 794 PRs; a 45-record presentation sample across 11 PRs. | Inventory completeness does not mean every technical claim was revalidated. |
| VS Code and Bun | Six PR discussions each, including human formal change requests. | Purposive disagreement-rich sample, mostly 2025 with 2026 examples. Individual comments can belong to COMMENTED reviews. |
| Electron and Tauri | Three PRs each; 210 combined timeline records, including 12 CHANGES_REQUESTED submissions. | Includes bots, author replies, and maintainer comments that disclose AI assistance. |
| pnpm and get.pnpm.io | Two pnpm PRs and one installer PR. | The pnpm PRs had only empty approval reviews; the installer provided substantive bot feedback and author replies. |
| KDE/KWin | Four archived reviewer messages about three revisions, 2017-2020. | Current Invent pages were inaccessible. These are historical examples, not a current KDE review audit. |

The outside comparison covers 21 GitHub PR discussions and three archived KWin revisions. It supports design counterexamples, not a ranking of repositories, a frequency estimate, or a claim that all cited reviewers were correct. Human-account attribution does not establish whether an assistant helped write a comment.

## KELD census

[Machine-readable measurements](data/keld-review-census-2026-10-30.json) record the method and limits. Collection completed at `2026-10-30T23:36:55.868820+00:00`.

GraphQL pagination covered 32 pages of up to 25 PRs. Nested review and conversation-comment totals were reconciled. REST pagination covered 19 pages of up to 100 inline comments, with 24 on the last page. Unique counts and returned totals were checked.

| Record type | Count |
| --- | ---: |
| Pull requests | 794 |
| Review submissions | 2,162 |
| PR conversation comments | 2,637 |
| Inline comments, including replies | 1,824 |
| Root inline comments | 1,047 |
| Stored CHANGES_REQUESTED review records | 155 |
| PRs represented by those review records | 74 |
| Root inline comments attached to those records | 203 |

The 155 stored records are not 155 current blockers. Reviews can have been superseded or belong to merged PRs. Dismissed reviews may previously have requested changes. Deleted and pre-edit comment versions are not recovered.

### Where length actually occurs

A word here is one non-whitespace run in the raw API body. Markup, code, and collapsed details count. P90 uses nearest rank.

| Raw-body group | Median words | P90 | Maximum | Over 500 words |
| --- | ---: | ---: | ---: | ---: |
| CHANGES_REQUESTED review bodies | 141 | 342 | 680 | 5 |
| Root comments attached to those reviews | 123 | 271 | 460 | 0 |
| All root inline comments | 223 | 502 | 8,008 | 105 |
| PR conversation comments | 192 | 722 | 2,385 | 515 |

Bloat is not uniform. The [8,008-word root comment](https://github.com/gyldlab/keld/pull/1178#discussion_r4367911932) contains generated analysis and scripts inside collapsed details. By contrast, the median root attached to a change-request review is 123 words. A universal reduction target would remove useful information from already concise findings.

An exact-repeat check found no groups with identical trimmed bodies of at least 150 characters in the same PR, among 155 change-request bodies and 1,047 roots. This test excludes replies and conversation comments and cannot detect semantic duplicates.

### Concrete KELD lessons

| Source | Observation | Design consequence |
| --- | --- | --- |
| [#1307: generated identity](https://github.com/gyldlab/keld/pull/1307#discussion_r4419829487) | Ninety words already preserve equal-title inputs, different preload grants, collision risk, acceptable remedies, and a negative control. | Improve provenance and scope; do not shorten by quota. |
| [#1307: private-state gate](https://github.com/gyldlab/keld/pull/1307#discussion_r4429155170) | The 330-word finding repeats its causal chain across prose, an example, the requested fix, and the check. It concerns a conditional specification defect, not a tested Windows exploit. | Consolidate repeated explanation while preserving the trust boundary and evidence limit. |
| [#1311: milestone dependencies](https://github.com/gyldlab/keld/pull/1311#discussion_r4429148711) | One 240-word comment combines T2's timeout dependency and T3's signal-producer dependency. | Split independently fixable causes. Do not achieve brevity by losing one. |
| [#1280: native release](https://github.com/gyldlab/keld/pull/1280#discussion_r4429057983) | Source and API ordering support a release-order concern; the observable Windows interleaving still needs execution. | Keep source trace distinct from runtime reproduction. Preserve event order and exact platform requirements. |
| [#1300: native Linux race](https://github.com/gyldlab/keld/pull/1300#discussion_r4417340422) | The reported result depends on a real write-half close, an event barrier, the executed build, and a control. Its reported reproduction revision differs from the later anchor revision. | Bind results to the executed artifact. Compression must retain distinctions that make the experiment meaningful. |
| [#1306: generated patch](https://github.com/gyldlab/keld/pull/1306#discussion_r4416623681) and [#1276: wording](https://github.com/gyldlab/keld/pull/1276#discussion_r4421731222) | A diff, a committable suggestion, and an agent-prompt restatement repeat the same action. | Keep one actionable representation; link separately addressable evidence. |
| [#1306 re-review](https://github.com/gyldlab/keld/pull/1306#pullrequestreview-5705636945) and [#1308 re-review](https://github.com/gyldlab/keld/pull/1308#pullrequestreview-5706040350) | Existing threads are reused; source-only evidence and addressed versus remaining concerns are distinguished. | Preserve these good patterns. Re-review should describe the change in evidence or decision. |

### Historical rewrite example

This reformats the historically reported [private-state finding](https://github.com/gyldlab/keld/pull/1307#discussion_r4429155170). It is not a claim about the present code or a newly executed exploit. The original repository's P1 label is retained without assigning it a universal severity meaning.

#### ⚠️ P1 | security | blocking: Private-state gates can become unconditional grants

- **Problem:** A trusted click can set private `unlocked` state before `if (unlocked) send('delete-all', ...args)`. A classifier that checks only page-input-dependent branches misses this gate, allowing raw same-document sends to bypass the exposed function.
- **Evidence:** [Rule: classifier](https://github.com/gyldlab/keld/blob/eae63da8b46b1848d0435703054a6e4f7f818650/docs/specs/gh1184-windows-preload-facade.md#L1067-L1111), [Rule: main-world nonce model](https://github.com/gyldlab/keld/blob/eae63da8b46b1848d0435703054a6e4f7f818650/docs/specs/gh1184-windows-preload-facade.md#L263-L340). Supplied historical source reasoning; no Windows exploit executed here.
- **Change:** Treat reachable branches that suppress or alter the sink, or selectively expose it, as gating unless unconditional equivalence is proved. If uncertain, require developer attestation or retain `channels: []`; disclose the attestation residual.
- **Check:** Proposed: without trusted click or attestation, exposed and raw calls produce zero handler entries. A mutant checking only page-input branches permits one raw-call entry and must fail.

The original remains the provenance record. This example does not establish measured token savings or improved comprehension.

## VS Code and Bun

Discovery searched 2025 PRs with `review:changes_requested`, ordered by comment count, then selected varied scopes and added one 2026 PR per repository. The discussion evidence was inspected; the underlying bugs were not independently reproduced.

| Evidence | What it teaches |
| --- | --- |
| VS Code [#265796 observable test request](https://github.com/microsoft/vscode/pull/265796#discussion_r2333058611) and [repeated review](https://github.com/microsoft/vscode/pull/265796#pullrequestreview-3206116137) | Asking to observe open tabs and clean them up gives an acceptance condition. Repeating a test-category label alone leaves the required boundary ambiguous. |
| VS Code [#315056 causal review](https://github.com/microsoft/vscode/pull/315056#pullrequestreview-4248368897) and [scope correction](https://github.com/microsoft/vscode/pull/315056#discussion_r3209598127) | Pinned cross-file links make getter loss and actual tool behavior recoverable. Later unrelated changes still need an explicit scope boundary. |
| VS Code [#268248 earlier direction](https://github.com/microsoft/vscode/pull/268248#discussion_r2401980523) and [later decision](https://github.com/microsoft/vscode/pull/268248#discussion_r2438699754) | Shared-style extraction was later deferred. Record which decision supersedes the other so an agent does not implement retired advice. |
| VS Code [#243558 bot suggestion](https://github.com/microsoft/vscode/pull/243558#discussion_r2447896061) and [author correction](https://github.com/microsoft/vscode/pull/243558#discussion_r2640092735) | The author says the API accepts a delta, contrary to the suggestion's absolute-size premise. Validate the callee contract before supplying executable code. |
| Bun [#22258 column handling](https://github.com/oven-sh/bun/pull/22258#discussion_r2313508029) and [#22568 exact replacement](https://github.com/oven-sh/bun/pull/22568#discussion_r2338774197) | A concrete input or local replacement can be a complete compact request. Mandatory four-field output would add repetition. |
| Bun [#25474 bot claim](https://github.com/oven-sh/bun/pull/25474#discussion_r2611672457) and [API rebuttal](https://github.com/oven-sh/bun/pull/25474#discussion_r2662096965) | A severity label and a long transcript do not settle a disputed return type. Reassess contrary evidence and distinguish refuted from fixed. |
| Bun [#33866 scope split](https://github.com/oven-sh/bun/pull/33866#pullrequestreview-4941379627) and [property checks](https://github.com/oven-sh/bun/pull/33866#pullrequestreview-4942146974) | Existing bugs, current requirements, and deferred RSS work are separated. Content assertions do not prove output-width properties they never observe. |

The full twelve-PR sample comprised VS Code #237751, #243558, #265796, #268248, #273060, #315056 and Bun #21307, #22258, #22568, #22756, #25474, #33866.

## Electron, Tauri, and KDE

| Evidence | What it teaches |
| --- | --- |
| Electron [#51243 callback lifecycle](https://github.com/electron/electron/pull/51243#discussion_r4404117577) | A cross-window lifecycle defect needs mechanism, ownership, event order, and an observable check. This justifies expanded findings. |
| Electron [#53740 follow-up](https://github.com/electron/electron/pull/53740#discussion_r3991458935) | The reviewer identifies what remains open at one revision and what another revision addressed, explicitly limiting evidence to source inspection. Re-review is a delta. |
| Electron [#52374 first bot status](https://github.com/electron/electron/pull/52374#pullrequestreview-5653853715) and [later status](https://github.com/electron/electron/pull/52374#pullrequestreview-5714694901) | Repeated status bodies say no high-confidence issues while retaining the same minor item. A new commit alone does not justify repeating unchanged prose. |
| Electron [#52374 native-convention disagreement](https://github.com/electron/electron/pull/52374#issuecomment-5221935392) | The contributor challenges AI-assisted review assertions using Paint and Notepad. The disagreement requires applicable native evidence, not more confident wording. |
| Tauri [#7170 artifact mismatch](https://github.com/tauri-apps/tauri/pull/7170#discussion_r1260985415) | A reporter later identifies workspace deduplication substituting a released package for the test package. The executed artifact matters as much as a plausible reproduction. |
| Tauri [#16210 test removal](https://github.com/tauri-apps/tauri/pull/16210#issuecomment-6041683921) and [comparison receipt](https://github.com/tauri-apps/tauri/pull/16210#issuecomment-6203969083) | Redundant tests can be removed. A same-machine comparison with build identity can distinguish competing explanations more effectively. |
| Tauri [#16387 compatibility question](https://github.com/tauri-apps/tauri/pull/16387#pullrequestreview-5680038532) | A linked unresolved custom-protocol concern supports a question. It does not itself prove that the proposed code caused a regression. |
| KWin [D25663 initial review](https://mail.kde.org/pipermail/kwin/2019-December/002453.html) and [follow-up](https://mail.kde.org/pipermail/kwin/2019-December/002571.html), 2019 | The reviewer accepts either consistency with an existing design or an argument for an alternative, then defers one concern while retaining style corrections. Required resolution need not dictate one implementation. |
| KWin [D5928 provenance question](https://mail.kde.org/pipermail/plasma-devel/2017-October/075397.html), 2017 | An attribution link does not establish the needed licensing fact. The reviewer states uncertainty and asks for specialist input. |
| KWin [D28310 local corrections](https://mail.kde.org/pipermail/kwin/attachments/20200327/f5034976/attachment.html), 2020 | Formal requested changes include literal and naming clarity. Review disposition is not a severity classification. |

## Related pnpm repositories

[pnpm #15699](https://github.com/pnpm/pnpm/pull/15699) and [#16321](https://github.com/pnpm/pnpm/pull/16321) had only empty approval review bodies in the retrieved data. They are not evidence-rich requested-change examples.

[get.pnpm.io #63](https://github.com/pnpm/get.pnpm.io/pull/63) supplied 19 reviews and 23 inline comments, including bot findings and author replies; a human maintainer later approved. The following patterns are bot-review evidence, not claims about the maintainer's review style.

- **Semantic duplication:** [Greptile](https://github.com/pnpm/get.pnpm.io/pull/63#discussion_r4115306707) and [CodeRabbit](https://github.com/pnpm/get.pnpm.io/pull/63#discussion_r4115313938) describe the same initial URL credential-path scope problem at the same commit. Their bodies differ, so exact-text deduplication misses it. Reuse one canonical cause and link the other evidence.
- **Do not over-deduplicate:** The later [redirect-scope finding](https://github.com/pnpm/get.pnpm.io/pull/63#discussion_r4123401302) concerns checking each redirect destination. It is a distinct entry point and correction, even though it also concerns credential scope.
- **Preserve valid behavior:** The [author's resolution](https://github.com/pnpm/get.pnpm.io/pull/63#discussion_r4123302501) separates best-effort default configuration discovery from errors in explicitly configured credentials. A blanket failure or blanket ignore rule would lose one intended case.
- **Check rule authority:** A [style comment](https://github.com/pnpm/get.pnpm.io/pull/63#discussion_r4115306716) cites a bot's custom-context rule. That attribution alone does not establish a public repository requirement. A formatting skill must not turn reviewer preference into product severity.
- **Keep follow-ups small:** The [author's correction reply](https://github.com/pnpm/get.pnpm.io/pull/63#discussion_r4123208955) identifies the commit, preserved scope, and regression checks without repeating the original body.

These historical comments are not assertions that the concerns remain unresolved.

## Contribution guidance cross-check

The [VS Code contribution guide](https://github.com/microsoft/vscode/wiki/How-to-Contribute#pull-requests) supports focused changes and appropriate tests. [Bun's agent guidance](https://github.com/oven-sh/bun/blob/main/CLAUDE.md) distinguishes genuine regressions and testing the changed build. The [Electron guide](https://www.electronjs.org/docs/latest/development/pull-requests) treats requested changes as potentially tiny or substantive and separates acceptance from CI checks. [Tauri's guide](https://raw.githubusercontent.com/tauri-apps/tauri/dev/.github/CONTRIBUTING.md) emphasizes minimal reproduction and has its own AI publication rules.

These sources support evidence, scope, and repository-specific acceptance. None establishes a universal four-heading comment standard. Target publication rules remain controlling; observing a repository does not authorize posting automated reviews there.
