---
name: modular-structure
description: Architecture rule — implement code as small modules with clear boundaries. Use whenever adding features or restructuring code in this repo.
---

# Modular, structured implementation

When implementing or restructuring code in this repo:

- One module = one concern. Split by responsibility (encoding, arithmetic,
  layers, model, CLI), never by file size alone.
- Modules depend downward only: CLI -> model -> layers -> primitives. No
  circular imports, no reaching around layers.
- Each module exposes a small explicit API; everything else is private
  (`_name`).
- Shared parameters travel in one context/config object, not as long argument
  lists threaded through every call.
- Keep entry points (train/evaluate scripts) thin: argument parsing and
  orchestration only, no core logic.
- Prefer a package directory with focused files over one large module.
