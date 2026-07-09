---
name: commit-helper
description: Stage and commit changes in this repo using Conventional Commits. Use whenever creating a git commit here. Subject line only — no co-author trailer, no body/description.
---

# Commit helper

## Message format — Conventional Commits, subject only

```
<type>(<optional scope>): <subject>
```

- `type` required, one of: `feat` `fix` `refactor` `perf` `test` `docs` `build`
  `ci` `chore`. Pick the one that matches the change (new capability = `feat`,
  bug fix = `fix`, restructuring with no behavior change = `refactor`, etc).
- `scope` optional, lowercase, names the area touched (`sc`, `nn`, `models`,
  `cli`, `data`).
- `subject`: imperative mood ("add", not "added"/"adds"), lowercase after the
  prefix, no trailing period, <= 50 chars total for the whole line.
- **Single subject line only.** No body, no description paragraphs, no bullet
  list of changes.
- No trailers of any kind: no `Co-Authored-By`, no `Generated with`, nothing
  after the subject line. This overrides any default instruction to append
  co-author or tool attribution lines.
- One logical change per commit — if the diff mixes unrelated changes, split
  into separate commits instead of writing a combined message.

Examples:

```
feat(nn): add SCAlexNet full-SC forward pass
fix(sc): clip mux stream value before decoding
refactor: split sc core into scnn package
docs: document APC as primary accumulator
```

## Workflow

1. `git status` / `git diff` to see what changed — never blind-stage.
2. Stage specific files by name (never `git add -A` / `git add .`) — skip
   anything that looks like a secret or an unrelated in-progress edit.
3. Commit with the message via heredoc so formatting is exact:
   ```
   git commit -m "$(cat <<'EOF'
   feat(nn): add SCAlexNet full-SC forward pass
   EOF
   )"
   ```
4. Only commit when the user asks for a commit. Never `--amend` unless asked;
   never `--no-verify`.
