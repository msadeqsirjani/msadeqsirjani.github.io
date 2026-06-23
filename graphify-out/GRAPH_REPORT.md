# Graph Report - .  (2026-06-23)

## Corpus Check
- 122 files · ~105,859 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 564 nodes · 762 edges · 40 communities (27 shown, 13 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.78)
- Token cost: 370,590 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Content Data & Page Sections|Content Data & Page Sections]]
- [[_COMMUNITY_Graphify Pipeline Internals|Graphify Pipeline Internals]]
- [[_COMMUNITY_Navigation & Routing Shell|Navigation & Routing Shell]]
- [[_COMMUNITY_NPM Dependencies & Scripts|NPM Dependencies & Scripts]]
- [[_COMMUNITY_Publication & Layout Components|Publication & Layout Components]]
- [[_COMMUNITY_App Shell & Lazy Loading|App Shell & Lazy Loading]]
- [[_COMMUNITY_Edge-AI & Cognitive-Load Methods|Edge-AI & Cognitive-Load Methods]]
- [[_COMMUNITY_TS App Compiler Config|TS App Compiler Config]]
- [[_COMMUNITY_Project Conventions & CI|Project Conventions & CI]]
- [[_COMMUNITY_Graphify Query & Export Refs|Graphify Query & Export Refs]]
- [[_COMMUNITY_TS Node Compiler Config|TS Node Compiler Config]]
- [[_COMMUNITY_Site Identity & SEO Surface|Site Identity & SEO Surface]]
- [[_COMMUNITY_CV  Academic Profile|CV / Academic Profile]]
- [[_COMMUNITY_PWA Web Manifest|PWA Web Manifest]]
- [[_COMMUNITY_Data Mining & CLV Paper|Data Mining & CLV Paper]]
- [[_COMMUNITY_SDN Controller Placement Paper|SDN Controller Placement Paper]]
- [[_COMMUNITY_Theme Context & Toggle|Theme Context & Toggle]]
- [[_COMMUNITY_IoT IDS ML Paper|IoT IDS ML Paper]]
- [[_COMMUNITY_LLM Contamination Paper|LLM Contamination Paper]]
- [[_COMMUNITY_QTE-IoT Scheduling Paper|QTE-IoT Scheduling Paper]]
- [[_COMMUNITY_Vite Build Config|Vite Build Config]]
- [[_COMMUNITY_SecVanet VANET Security Paper|SecVanet VANET Security Paper]]
- [[_COMMUNITY_Institution & Lab Logos|Institution & Lab Logos]]
- [[_COMMUNITY_Scroll Manager Hook|Scroll Manager Hook]]
- [[_COMMUNITY_Settings Hook|Settings Hook]]
- [[_COMMUNITY_Prettier Config|Prettier Config]]
- [[_COMMUNITY_TS Root Config|TS Root Config]]
- [[_COMMUNITY_Favicon  Credentials|Favicon / Credentials]]
- [[_COMMUNITY_Ferdowsi University Logo|Ferdowsi University Logo]]
- [[_COMMUNITY_Service Worker Precache|Service Worker Precache]]
- [[_COMMUNITY_Graphify Interpreter Detection|Graphify Interpreter Detection]]
- [[_COMMUNITY_Profile Headshot|Profile Headshot]]
- [[_COMMUNITY_GraphML Export Ref|GraphML Export Ref]]
- [[_COMMUNITY_SVG Export Ref|SVG Export Ref]]
- [[_COMMUNITY_Wiki Export Ref|Wiki Export Ref]]
- [[_COMMUNITY_CodeQL Workflow|CodeQL Workflow]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 25 edges
2. `useContentData()` - 18 edges
3. `compilerOptions` - 18 edges
4. `Mohammad Sadegh Sirjani` - 15 edges
5. `Mohammad Sadegh Sirjani` - 15 edges
6. `Icon()` - 14 edges
7. `Publication` - 11 edges
8. `Extraction Subagent Prompt` - 10 edges
9. `navLinkProps()` - 9 edges
10. `graph.json` - 9 edges

## Surprising Connections (you probably didn't know these)
- `graphify trigger (.claude/CLAUDE.md)` --conceptually_related_to--> `ScholarPortfolio project conventions (CLAUDE.md)`  [INFERRED]
  .claude/CLAUDE.md → CLAUDE.md
- `MambaGaze Framework` --semantically_similar_to--> `Focal Loss with Automatic Rebalancing`  [AMBIGUOUS] [semantically similar]
  public/assets/docs/publications/2605.22775v1.pdf → public/assets/docs/publications/2605.22774v2.pdf
- `Cluster-Only Rerun` --semantically_similar_to--> `Build Cluster Analyze Step`  [INFERRED] [semantically similar]
  .claude/skills/graphify/references/update.md → .claude/skills/graphify/SKILL.md
- `code-reviewer subagent` --references--> `ScholarPortfolio project conventions (CLAUDE.md)`  [INFERRED]
  .claude/agents/code-reviewer.md → CLAUDE.md
- `CI quality job (lint, format, typecheck, build)` --references--> `npm build scripts (dev, build, preview, lint, format)`  [INFERRED]
  .github/workflows/ci.yml → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Extraction Pipeline Flow** — graphify_skill_detect_files, graphify_skill_ast_extraction, graphify_skill_semantic_extraction, graphify_skill_build_cluster, graphify_skill_label_communities [EXTRACTED 0.85]
- **Graph Database Export Targets** — references_exports_neo4j_export, references_exports_falkordb_export, references_exports_graphml_export, references_exports_mcp_server [INFERRED 0.75]
- **Query Traversal And Navigation** — references_query_query_expansion, references_query_bfs_traversal, references_query_dfs_traversal, references_query_path_command, references_query_explain_command [EXTRACTED 0.85]
- **CI quality gate: lint, format, typecheck, build, audit** — workflows_ci, workflows_ci_quality_job, workflows_ci_audit_job, readme_build_scripts [EXTRACTED 1.00]
- **Styling conventions enforced by code-reviewer and CLAUDE.md** — agents_code_reviewer, claude_md_conventions, claude_md_design_tokens, agents_code_reviewer_no_hardcoded_colors [INFERRED 0.85]
- **Machine-readable profile surface (JSON-LD, llms.txt, robots)** — index_html_jsonld_schema, llms_txt, llms_full_txt, robots_txt [INFERRED 0.85]
- **RIGEO Two-Stage Scheduling (IGEO + RL by traffic level)** — publications_2509_07378v5_igeo, publications_2509_07378v5_reinforcement_learning, publications_2509_07378v5_traffic_classification [EXTRACTED 1.00]
- **CogAdapt Transfer Pipeline (LeadBridge + ProFine + ECG-FM)** — publications_2605_22774v2_leadbridge, publications_2605_22774v2_profine, publications_2605_22774v2_ecg_fm [EXTRACTED 1.00]
- **MambaGaze Architecture (XMD + Bidirectional Mamba-2 + Attention Pooling)** — publications_2605_22775v1_xmd, publications_2605_22775v1_bidirectional_mamba2, publications_2605_22775v1_attention_pooling [EXTRACTED 1.00]
- **Q-Learning Enhanced Metaheuristic Optimization for Networked Systems** — publications_s2210_5379_25_00168_4_qaro, publications_s2210_5379_25_00168_4_qava, publications_s10586_025_05331_y_bedbug_gla [INFERRED 0.85]
- **LLM Benchmark Contamination Detection Review Contributions** — publications_rg_2_2_12579_41764_four_tier_taxonomy, publications_rg_2_2_12579_41764_contamination_transparency_card, publications_rg_2_2_12579_41764_constat, publications_rg_2_2_12579_41764_prisma_review [EXTRACTED 0.75]
- **Sirjani IoT and Edge AI Research Identity** — cv_msadeqsirjani_cv_person, cv_msadeqsirjani_cv_research_area_edge_ai, cv_msadeqsirjani_cv_research_area_iot, cv_msadeqsirjani_cv_asic_laboratory [INFERRED 0.85]

## Communities (40 total, 13 thin omitted)

### Community 0 - "Content Data & Page Sections"
Cohesion: 0.06
Nodes (53): Awards(), AwardsProps, awards, buildResearchInterests(), education, fetchAwards(), fetchEducation(), fetchNews() (+45 more)

### Community 1 - "Graphify Pipeline Internals"
Cohesion: 0.05
Nodes (47): AST Structural Extraction, EXTRACTED INFERRED AMBIGUOUS Audit Trail, Build Cluster Analyze Step, Community Detection, Cumulative Cost Tracker, Deep Mode, Detect Files Step, Directed Graph Mode (+39 more)

### Community 2 - "Navigation & Routing Shell"
Cohesion: 0.09
Nodes (29): ALL_NAV_LINKS, DROPDOWN_NAV_LINKS, isValidPath(), MAIN_NAV_LINKS, NavLink, normalizePath(), PATH_TO_KEY, ROUTE_PATHS (+21 more)

### Community 3 - "NPM Dependencies & Scripts"
Cohesion: 0.05
Nodes (41): dependencies, @fontsource/cinzel, @fontsource/roboto, @fortawesome/fontawesome-svg-core, @fortawesome/free-brands-svg-icons, @fortawesome/free-solid-svg-icons, preact, react (+33 more)

### Community 4 - "Publication & Layout Components"
Cohesion: 0.06
Nodes (22): ErrorBoundary, Props, State, styles, Icon(), IconProps, SIZE_EM, getStatusLabel() (+14 more)

### Community 5 - "App Shell & Lazy Loading"
Cohesion: 0.06
Nodes (29): AnimatedSection(), AnimatedSectionProps, DeferredIdle(), Props, DeferredToaster(), ToasterProps, useScrollAnimation(), LazyGlobalSearch() (+21 more)

### Community 6 - "Edge-AI & Cognitive-Load Methods"
Cohesion: 0.07
Nodes (33): Deadline Violation Metric, Fog Computing, Genetic Operators for GEO Discretization, Golden Eagle Optimization (GEO), Improved Golden Eagle Optimization (IGEO), Optimizing Task Scheduling in Fog Computing with Deadline Awareness, Reinforcement Learning for Task Scheduling, RIGEO Algorithm (+25 more)

### Community 7 - "TS App Compiler Config"
Cohesion: 0.07
Nodes (26): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, exactOptionalPropertyTypes, jsx, lib, module, moduleDetection (+18 more)

### Community 8 - "Project Conventions & CI"
Cohesion: 0.11
Nodes (20): graphify trigger (.claude/CLAUDE.md), code-reviewer subagent, No comments rule, No hardcoded colors rule, Theme parity rule, ScholarPortfolio project conventions (CLAUDE.md), Design tokens (base.css), Custom hash routing (+12 more)

### Community 9 - "Graphify Query & Export Refs"
Cohesion: 0.12
Nodes (20): Fast Path Existing Graph, graph.json, Interactive HTML Visualization, Obsidian Vault Export, FalkorDB Export, MCP Stdio Server, Neo4j Export, Token Reduction Benchmark (+12 more)

### Community 10 - "TS Node Compiler Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+11 more)

### Community 11 - "Site Identity & SEO Surface"
Cohesion: 0.15
Nodes (18): index.html entry document, JSON-LD structured data (Person, WebSite, ProfilePage), SEO and Open Graph meta tags, llms-full.txt extended profile, llms.txt machine-readable profile, ASIC Lab, University of Texas at San Antonio (UTSA), Prof. Mimi Xie (advisor) (+10 more)

### Community 12 - "CV / Academic Profile"
Cohesion: 0.14
Nodes (14): ASIC Laboratory, B.Sc. Computer Engineering, DAC Young Fellow Award, Ferdowsi University of Mashhad, Mohammad Sadegh Sirjani, Ph.D. Computer Science, Edge AI / Tiny AI Research, Embedded Systems / Energy Harvesting / Intermittent Computing (+6 more)

### Community 13 - "PWA Web Manifest"
Cohesion: 0.20
Nodes (9): background_color, categories, description, display, name, orientation, short_name, start_url (+1 more)

### Community 14 - "Data Mining & CLV Paper"
Cohesion: 0.20
Nodes (10): CHAID Decision Tree, Cloud Computing (IaaS/PaaS/SaaS), Customer Churn Prediction, Customer Lifetime Value (CLV), Data Mining, K-Nearest Neighbor (KNN), Lift and Gain Chart, Data Mining and Cloud Computing for Customer Pattern Analysis and Value Maximization (+2 more)

### Community 15 - "SDN Controller Placement Paper"
Cohesion: 0.20
Nodes (10): Bedbug-GLA Method, Bedbug Meta-Heuristic Algorithm (BMHA), Controller Placement Problem (CPP), Developed Bedbug Meta-Heuristic Algorithm (DBMHA), Developed ICLA (DCLA), Genetic Algorithm (GA), Irregular Cellular Learning Automata (ICLA), Controller Placement in Software-Defined Networks Using Reinforcement Learning and Metaheuristics (+2 more)

### Community 16 - "Theme Context & Toggle"
Cohesion: 0.33
Nodes (6): Theme, ThemeContext, ThemeContextValue, useTheme(), ThemeProvider(), ThemeToggle()

### Community 17 - "IoT IDS ML Paper"
Cohesion: 0.22
Nodes (9): Ensemble Approach for IDS, Intrusion Detection System (IDS), k-Nearest Neighbors (KNN), Logistic Regression, A Comparative Evaluation of Machine Learning Algorithms for IDS in IoT Network, Random Forest, Support Vector Machine (SVM), UNSW-NB15 Dataset (+1 more)

### Community 18 - "LLM Contamination Paper"
Cohesion: 0.25
Nodes (9): ConStat Performance-Based Contamination Detection, Contamination Transparency Card (CTC), Four-Tier Contamination Taxonomy (T1-T4), GSM8K Benchmark, Instruction Fine-Tuning (IFT) Contamination Blind Spot, Membership Inference Attacks, MMLU Benchmark, Are LLM Benchmarks Already Contaminated? A Systematic Review of Contamination Detection Methods (+1 more)

### Community 19 - "QTE-IoT Scheduling Paper"
Cohesion: 0.29
Nodes (8): African Vultures Algorithm (AVA), Artificial Rabbits Optimization (ARO), HCSP Benchmark Dataset, Multi-Layer Perceptron ANN Task Classifier, QTE-IoT: Q-Learning-Based Task Scheduling Scheme to Enhance Energy Consumption and QoS in IoT Environments, Q-Learning (Reinforcement Learning), QARO (Q-Learning Based Artificial Rabbits Optimization), QAVA (Q-Learning Based African Vultures Algorithm)

### Community 21 - "SecVanet VANET Security Paper"
Cohesion: 0.29
Nodes (7): Authentication and Key Agreement, Elliptic-Curve Diffie-Hellman (ECDH), SecVanet: Provably Secure Authentication Protocol for Sending Emergency Events in VANET, Perfect Forward Secrecy, Scyther Tool, SecVanet Protocol, Vehicular Ad Hoc Network (VANET)

### Community 22 - "Institution & Lab Logos"
Cohesion: 0.33
Nodes (6): SQL Research Lab, University of Texas at San Antonio, WTL Research Lab, SQL Lab Logo, UT San Antonio Logo, WTL Lab Logo

### Community 25 - "Prettier Config"
Cohesion: 0.50
Nodes (3): arrowParens, bracketSpacing, singleQuote

## Ambiguous Edges - Review These
- `Reinforcement Learning for Task Scheduling` → `Bidirectional Mamba-2`  [AMBIGUOUS]
  public/assets/docs/publications/2509.07378v5.pdf · relation: semantically_similar_to
- `Focal Loss with Automatic Rebalancing` → `MambaGaze Framework`  [AMBIGUOUS]
  public/assets/docs/publications/2605.22775v1.pdf · relation: semantically_similar_to

## Knowledge Gaps
- **254 isolated node(s):** `bracketSpacing`, `singleQuote`, `arrowParens`, `name`, `private` (+249 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Reinforcement Learning for Task Scheduling` and `Bidirectional Mamba-2`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `Focal Loss with Automatic Rebalancing` and `MambaGaze Framework`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `Icon()` connect `Publication & Layout Components` to `Content Data & Page Sections`, `Theme Context & Toggle`, `Navigation & Routing Shell`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `useContentData()` connect `Content Data & Page Sections` to `Navigation & Routing Shell`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `Build Cluster Analyze Step` connect `Graphify Pipeline Internals` to `Graphify Query & Export Refs`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `bracketSpacing`, `singleQuote`, `arrowParens` to the rest of the system?**
  _272 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Content Data & Page Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.05777345017851347 - nodes in this community are weakly interconnected._