---
name: no-comments
description: Code style rule — write code with no comments. Use whenever writing or editing code in this repo.
---

# No comments in code

When writing or editing code in this repo:

- Write NO comments: no inline comments, no block comments, no commented-out
  code.
- Do not add module docstrings, function docstrings, or class docstrings.
- Make the code self-explanatory instead: clear names, small functions, obvious
  data flow. If a line needs a comment to be understood, rewrite the line.
- When editing existing code, remove comments in the code you touch; leave
  untouched code alone unless asked to clean the whole file.
- Documentation belongs in README.md / docs/, never in source files.
