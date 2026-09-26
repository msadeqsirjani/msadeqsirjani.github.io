import type {ReactNode} from 'react';
import ProjectPage from '../ProjectPage/ProjectPage';
import ProjectSection from '../ProjectPage/ProjectSection';
import ProjectFigure from '../ProjectPage/ProjectFigure';
import ProjectTable from '../ProjectPage/ProjectTable';
import ProjectList from '../ProjectPage/ProjectList';
import bibtexData from '../../data/bibtex.json';

const AUTHORS = [
  'Erfan Nourbakhsh',
  'Mohammad Sadegh Sirjani',
  'Amir Mousavi',
  'Khoa Nguyen',
  'John Quarles',
  'Mimi Xie',
  'Rocky Slavin',
];

const SECTIONS = [
  {id: 'abstract', label: 'Abstract'},
  {id: 'taxonomy', label: 'Contamination taxonomy'},
  {id: 'detection', label: 'Detection families'},
  {id: 'evidence', label: 'Benchmark evidence'},
  {id: 'mitigation', label: 'Mitigation'},
  {id: 'ctc', label: 'Transparency card'},
  {id: 'takeaways', label: 'Takeaways'},
];

const TIERS = [
  {
    tier: 'T1',
    type: 'Exact',
    mechanism:
      'Verbatim or near-verbatim test instances in the training corpus',
    evidence: 'MMLU 57% option guessing; HumanEval 10-gram collisions',
    severity: 'Critical',
    detectability: 'High',
  },
  {
    tier: 'T2',
    type: 'Syntactic',
    mechanism:
      'Test data present after surface transformation (paraphrase, shuffle, retokenization)',
    evidence:
      'GPT-4-level performance from paraphrased fine-tuning; MMLU-CF lexical leakage',
    severity: 'High',
    detectability: 'Medium',
  },
  {
    tier: 'T3',
    type: 'Semantic',
    mechanism:
      'Semantically equivalent content without lexical overlap (translations, reformulations)',
    evidence: 'Cross-lingual inflation',
    severity: 'Moderate',
    detectability: 'Low',
  },
  {
    tier: 'T4',
    type: 'Task-level',
    mechanism:
      'Exposure to task format, reasoning pattern, or domain knowledge without specific test instances',
    evidence: 'GSM1K accuracy drops; zero-shot task contamination',
    severity: 'Variable',
    detectability: 'Very low',
  },
];

const FAMILIES = [
  [
    'String-matching',
    'White-box',
    'T1 exact overlap audits',
    'Weak under paraphrase; misses T3–T4',
  ],
  [
    'Likelihood-based',
    'Gray-box',
    'Open-weight memorization signals',
    'Sensitive to format and probability access',
  ],
  [
    'Membership inference',
    'Gray-box',
    'Document / collection scale',
    'Often near-random at instance level',
  ],
  [
    'LLM-prompted probes',
    'Black-box',
    'Proprietary API settings',
    'Heuristic, gameable, weakly calibrated',
  ],
  [
    'Benchmark-level auditing',
    'Black / gray',
    'Leaderboards and closed models (e.g., ConStat)',
    'Needs careful controls and effect-size reporting',
  ],
];

const EVIDENCE = [
  [
    'MMLU',
    'GPT-4 TS-Guessing 57% (baseline 25%); ITD drops up to 19.0%; top 7B Open LLM Leaderboard models with ConStat δ̂ > 10%; weaker match on MMLU-CF',
  ],
  [
    'GSM8K',
    'Up to 8% drop on GSM1K (ρ = 0.60); ConStat δ̂ ≈ 27%–40% for InternLM-2-Math-7B',
  ],
  [
    'HumanEval',
    'Confirmed 10-gram collisions; post-cutoff drops on LiveCodeBench',
  ],
  [
    'HellaSwag / PIQA',
    'Flagged by multiple techniques; ConStat effects about 6%–11% on top-ranked 7B models',
  ],
];

const MITIGATION = [
  [
    'Static decontamination',
    'n-gram / semantic filters; contamination-free redesigns (e.g., MMLU-CF, Clean-Eval)',
    'Scalable baselines miss deeper semantic / task leakage',
  ],
  [
    'Inference-time decontamination (ITD)',
    'Detect contaminated items at eval time, rewrite, and re-score without retraining',
    'Model-specific rewritten exams hurt leaderboard comparability',
  ],
  [
    'Dynamic benchmarks',
    'Rolling refresh / post-cutoff novelty (LiveBench, LiveCodeBench, LatestEval-style)',
    'Strongest preventive path for T3 / T4; needs continuous generation cost',
  ],
];

const CTC = [
  [
    'Training data',
    'Pretraining corpus names and versions; cutoff dates; deduplication; total token count',
  ],
  [
    'Decontamination',
    'Methods and thresholds; datasets checked; known failure modes',
  ],
  [
    'Evidence provided',
    'Post-hoc overlap, likelihood, and / or calibrated performance audits (e.g., ConStat, TED); known contaminated benchmarks',
  ],
  [
    'IFT stage',
    'Fine-tuning composition; whether benchmark examples are included; answer augmentation strategy',
  ],
  [
    'Reproducibility',
    'Prompt templates; few-shot ordering and count; scoring; multi-run variance; generation parameters',
  ],
];

const TAKEAWAYS = [
  'Substantial contamination signals recur across major benchmarks, with reported inflation of roughly 6%–40% under setting-dependent assumptions.',
  'No detection family is reliable across all tiers, access settings, and training stages.',
  'Instruction fine-tuning contamination remains a critical blind spot for current detectors.',
  'RL / post-training contamination auditing is only beginning to mature.',
  'Adopt CTC-style disclosure, strengthen evaluation-of-evaluation infrastructure, and prioritize IFT- and RL-targeted detection.',
];

const bibtex = bibtexData.nourbakhsh2026contaminated.bibtex;

const Head = ({labels}: {labels: string[]}) => (
  <thead>
    <tr>
      {labels.map((label, index) => (
        <th key={label} scope="col" className={index === 0 ? 'is-label' : ''}>
          {label}
        </th>
      ))}
    </tr>
  </thead>
);

const Rows = ({rows}: {rows: ReactNode[][]}) => (
  <tbody>
    {rows.map(([first, ...rest], index) => (
      <tr key={index}>
        <th scope="row" className="is-label">
          {first}
        </th>
        {rest.map((cell, column) => (
          <td key={column}>{cell}</td>
        ))}
      </tr>
    ))}
  </tbody>
);

const Contamination = () => (
  <ProjectPage
    title="Are LLM Benchmarks Already Contaminated? A Systematic Review of Contamination Detection Methods"
    authors={AUTHORS}
    affiliation="University of Texas at San Antonio (UTSA)"
    venue="Fifth Workshop on Generation, Evaluation and Metrics (GEM 2026), colocated with ACL 2026 · San Diego, California, USA"
    award="Outstanding Paper"
    pdf="/assets/docs/publications/2026.gem-main.50.pdf"
    link={{
      label: 'ACL Anthology',
      href: 'https://aclanthology.org/2026.gem-main.50/',
    }}
    bibtex={bibtex}
    sections={SECTIONS}
  >
    <ProjectSection id="abstract" title="Abstract">
      <p className="project-abstract">
        Large Language Models (LLMs) are trained on web-scale corpora,
        increasing the risk that benchmark test data appears in training sets
        and inflates reported performance. We present a systematic literature
        review of 55 studies on LLM benchmark contamination through late 2025.
        Our contributions are: (1) a four-tier contamination taxonomy (Exact,
        Syntactic, Semantic, Task-Level; T1–T4); (2) a comparative analysis of
        five detection families (string-matching, likelihood-based, membership
        inference, LLM-prompted detection, and benchmark auditing), including
        access assumptions and failure modes; (3) a synthesis of contamination
        evidence on MMLU, GSM8K, HumanEval, and HellaSwag by measurement
        construct; (4) a comparative evaluation of mitigation strategies across
        lifecycle points, access assumptions, and evidence maturity; and (5) a{' '}
        <strong>Contamination Transparency Card (CTC)</strong> framework for
        future releases. Across studies, no detection method is consistently
        reliable across contamination tiers, model-access settings, and training
        stages. We identify instruction tuning as a persistent blind spot, note
        that RL/post-training contamination auditing is only beginning to
        mature, and report inflation estimates spanning roughly 6%–40% under
        benchmark- and setting-dependent assumptions.
      </p>
    </ProjectSection>

    <ProjectSection
      id="taxonomy"
      title="Four-Tier Contamination Taxonomy"
      lede="Mechanism-first tiers map overlap type to expected detectability and mitigation leverage, unifying fragmented prior terminology."
    >
      <ProjectTable
        text
        label="Table 1."
        caption="Taxonomy of benchmark contamination in LLM evaluation (T1–T4)."
      >
        <Head
          labels={[
            'Tier',
            'Type',
            'Mechanism',
            'Representative evidence',
            'Severity',
            'Detectability',
          ]}
        />
        <Rows
          rows={TIERS.map(tier => [
            tier.tier,
            <strong key="type">{tier.type}</strong>,
            tier.mechanism,
            tier.evidence,
            tier.severity,
            tier.detectability,
          ])}
        />
      </ProjectTable>
    </ProjectSection>

    <ProjectSection
      id="detection"
      title="Contamination Detection Families"
      lede="Five detection families along the white-box to black-box access spectrum. Probing methods need corpus or log-probability access; prompting methods use outputs alone."
    >
      <ProjectFigure
        src="/assets/images/contamination/taxonomy.jpg"
        width={2000}
        height={753}
        size="wide"
        label="Figure 1."
        alt="Taxonomy of contamination detection methods arranged from white-box probing methods to black-box prompting methods"
      >
        Taxonomy of contamination detection methods organized along the
        white-box to black-box access spectrum. Probing-based methods (left)
        require corpus or log-probability access; prompting-based methods
        (right) operate on model outputs alone.
      </ProjectFigure>
      <ProjectTable
        text
        label="Table 2."
        caption="Family-level synthesis of detection methods surveyed across 55 studies."
      >
        <Head labels={['Family', 'Access', 'Best for', 'Main failure modes']} />
        <Rows rows={FAMILIES} />
      </ProjectTable>
    </ProjectSection>

    <ProjectSection
      id="evidence"
      title="What Benchmarks Show"
      lede="Evidence is stratified by benchmark and measurement family. Hit rates, likelihood scores, and benchmark-level deltas measure different constructs and are not collapsed into one metric."
    >
      <ProjectTable
        text
        label="Table 3."
        caption="Benchmark-specific contamination signals synthesized in the review. Effect sizes are not directly comparable across methods."
      >
        <Head labels={['Benchmark', 'Selected signals']} />
        <Rows rows={EVIDENCE} />
      </ProjectTable>
    </ProjectSection>

    <ProjectSection
      id="mitigation"
      title="Mitigation Landscape"
      lede="Static, inference-time, and dynamic strategies trade coverage, standardization, and cost. No single fix covers all tiers."
    >
      <ProjectTable
        text
        label="Table 4."
        caption="Comparative mitigation strategies across lifecycle points."
      >
        <Head labels={['Strategy', 'What it does', 'Caveat']} />
        <Rows rows={MITIGATION} />
      </ProjectTable>
    </ProjectSection>

    <ProjectSection
      id="ctc"
      title="Contamination Transparency Card"
      lede="A minimal five-dimension disclosure framework modelled on Model Cards and Datasheets. Absence of contamination evidence is not evidence of absence."
    >
      <ProjectTable
        text
        label="Table 5."
        caption="Proposed Contamination Transparency Card (CTC). All dimensions are required for benchmark releases; training data, decontamination, and IFT stage are additionally recommended for model technical reports."
      >
        <Head labels={['Dimension', 'Required disclosures']} />
        <Rows rows={CTC} />
      </ProjectTable>
    </ProjectSection>

    <ProjectSection id="takeaways" title="Takeaways">
      <ProjectList items={TAKEAWAYS} />
    </ProjectSection>
  </ProjectPage>
);

export default Contamination;
