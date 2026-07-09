---
name: implement-and-commit
description: Workflow rule for this repo — after implementing a change, run exactly one minimal check that proves it works, then commit. Do not re-run commands repeatedly or explore variants once the change is verified.
---

# Implement, verify once, commit

When making a code change in this repo:

1. Implement the change.
2. Run **one** minimal command that proves the change does what it's supposed
   to — smallest `--num-test`, smallest stream `--length`, a single combo, not
   a matrix of every arch/mode/accum/length variant. The goal is proof of
   correctness, not a benchmark.
3. If that check passes, stop testing and commit (see `commit-helper`).
4. If it fails, fix and re-check once — don't pile up alternate commands
   trying to triangulate the problem inline; think first, then run the next
   check.
5. Delete throwaway smoke-test artifacts (e.g. a `results/*.json` from a
   10-image sanity run) before committing — only real reports belong in
   `results/`.

Do not:
- Run the same script repeatedly across many parameter combinations "just to
  see."
- Leave long background verification jobs running as a substitute for a quick
  targeted check.
- Treat exploratory testing as part of the task unless the user asked for a
  benchmark/sweep specifically.

This keeps iteration fast and matches how the user wants to work: implement,
confirm it works, move on.
