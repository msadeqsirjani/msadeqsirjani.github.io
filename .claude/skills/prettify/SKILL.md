---
name: prettify
description: Format repo files consistently. Use after writing or editing Python or JSON files, or when the user asks to prettify/format files. Python via black, JSON via json.dumps indent=2.
---

# Prettify files

Format files in this repo so every file has one consistent style.

## Python (`src/`, `tests/`)

```bash
black src tests
```

Format a single file after editing it: `black <file>`.
black is installed system-wide (`/Library/Frameworks/Python.framework/Versions/3.12/bin/black`).

## JSON (`results/`, config files)

Always produce `json.dumps(indent=2)` style — 2-space indent, one array element
per line, trailing newline. Never hand-format JSON. To re-format:

```bash
python3 - <<'EOF'
import json, pathlib
for p in pathlib.Path("results").glob("*.json"):
    p.write_text(json.dumps(json.loads(p.read_text()), indent=2) + "\n")
EOF
```

## Rules

- Run on the files you touched before finishing a task; run repo-wide only when
  asked.
- Shell scripts and Markdown: leave formatting as-is.
- Formatting must never change behavior — if black rewrites something
  surprising, review the diff before moving on.
- House rules still apply: no comments/docstrings get added by formatting.
