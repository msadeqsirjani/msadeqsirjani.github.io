---
name: minimal-code
description: Code style rule — minimal, neat, clean code. Use whenever writing or refactoring code in this repo.
---

# Minimal, neat, clean code

When writing code in this repo:

- Smallest implementation that does the job. No speculative features, no
  unused parameters, no dead branches, no "just in case" abstractions.
- Prefer flat and obvious over clever: plain functions before classes, direct
  numpy expressions before helper indirection.
- One way to do each thing — no duplicate code paths that differ only in style.
- Short files, short functions. If a function does not fit on one screen,
  split it.
- Consistent naming and formatting throughout; match the existing style of the
  file being edited.
- Delete code rather than keep it "for reference" — git history is the
  reference.
