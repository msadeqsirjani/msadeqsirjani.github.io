---
name: minimal-code
description: Code style rule — minimal, neat, clean code, and rewriting existing code to its simplest behavior-preserving form. Use whenever writing, refactoring, or simplifying code in this repo.
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

## Simplifying existing code

When asked to simplify, flatten, or de-abstract code, rewrite it to its
simplest form while preserving exact external behavior. Apply KISS and YAGNI
ruthlessly. Do not add new functionality.

- Eliminate unnecessary abstractions, layers, or design patterns.
- Reduce conditionals to the clearest logical form.
- Use standard language idioms; remove clever but obscure constructs.
- Do not alter public API signatures unless the simplification is otherwise
  impossible (and note the change).
- Output only the rewritten code. No explanatory text unless asked.
