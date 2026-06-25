# ScholarPortfolio — project conventions

React + TypeScript + Vite single-page academic portfolio. Custom hash routing
(no router lib). Static deploy (GitHub Pages).

## Styling rules (IMPORTANT)

- **No hardcoded colors.** Never put hex / `rgb()` / `rgba()` literals in
  component CSS. Use the design tokens defined in `src/styles/base.css`
  (`--accent-color`, `--text-color`, `--text-light`, `--white`, `--gray-light`,
  `--border-color`, `--success-color`, `--status-*`, etc.).
- Every color must work in **both light and dark** themes. Tokens are defined
  twice in `base.css`: `:root` (light) and `[data-theme='dark']`. If you need a
  new color, add a token in **both** blocks, then reference `var(--token)`.
- Reuse the existing scale tokens: spacing/radii (`--shape-card`,
  `--button-border-radius`), elevation (`--elev-1/2/3`), type (`--fs-xs` …
  `--fs-3xl`). Don't introduce raw px font-sizes.
- Section visual language is a **plain list of rows** (News, Awards, Teaching):
  muted uppercase lead on the left, hover tint, no card chrome. The
  **Publications full page** (`#publications-all`) uses **cards**. Keep new work
  consistent with whichever pattern the section already uses.

## Layout / data

- Content lives in `src/data/*.json`; types in `src/types/`.
- Publication status badge colors come from `--status-{published,accepted,review,preprint}`
  (+ `-bg`) tokens. `arxiv` status label = PREPRINT; any venue text matching
  `/preprint/i` is hidden (the badge conveys it).
- Main Publications section shows 5 rows + a "View all" link to the
  `#publications-all` hash route (rendered by `App.tsx` `view` state).
- Publication **title, author list, and abstract** are `text-align: justify`
  in both renderers (main list `.publication-title`/`.publication-authors`,
  cards `.pub-card-title`/`.pub-card-authors`/`.pub-card-abstract p`). Keep
  them justified.

## Code style

- **No comments.** Don't add comments to CSS, TS, or TSX. Code should be
  self-explanatory through naming. This applies to new code and edits — do not
  reintroduce explanatory comments, section banners, or JSDoc.

## Commits

Subject line only — no body, no `Co-Authored-By` trailer.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
