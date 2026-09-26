import {useState} from 'react';
import type {ReactNode} from 'react';
import toast from 'react-hot-toast';
import Icon from '../Icon/Icon';
import {
  faArrowLeft,
  faCheck,
  faCopy,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {ROUTE_PATHS} from '../../constants/siteNav';
import {navLinkProps} from '../../utils/router';
import bibtexData from '../../data/bibtex.json';
import cogadaptData from '../../data/cogadapt.json';
import './CogAdapt.css';

const paper = {
  title:
    'CogAdapt: Adapting Clinical ECG Foundation Models for Wearable Cognitive Load Assessment',
  venue:
    'IEEE-EMBS International Conference on Biomedical and Health Informatics',
  authors: [
    'Amir Mousavi',
    'Erfan Nourbakhsh',
    'Mohammad Sadegh Sirjani',
    'Mimi Xie',
    'Rocky Slavin',
    'Leslie Neely',
    'John Davis',
    'John Quarles',
  ],
  arxiv: 'https://arxiv.org/abs/2605.22774',
  pdf: '/assets/docs/publications/2605.22774v2.pdf',
};

const bibtex = bibtexData.mousavi2026cogadapt.bibtex;

const {mainResults: main, ablation, reconstruction: recon} = cogadaptData;

const SECTIONS = [
  {id: 'motivation', label: 'Sensor gap'},
  {id: 'abstract', label: 'Abstract'},
  {id: 'pipeline', label: 'Pipeline'},
  {id: 'profine', label: 'ProFine'},
  {id: 'results', label: 'Results'},
  {id: 'ablation', label: 'Ablation'},
  {id: 'reconstruction', label: 'Reconstruction'},
  {id: 'takeaways', label: 'Takeaways'},
  {id: 'citation', label: 'BibTeX'},
];

const SCENARIOS = [
  {
    name: 'Scenario A',
    detail: 'Encoder frozen; only LeadBridge and the head are trained.',
  },
  {
    name: 'Scenario B',
    detail: 'Top encoder layers unfrozen with bucketed learning rates.',
  },
  {
    name: 'Scenario C',
    detail: 'Full encoder unfrozen with layer-specific learning rates.',
  },
];

const TAKEAWAYS = [
  'Clinical ECG pretraining can transfer to wearable cognitive load when the sensor gap is closed with a learned lead adapter.',
  'LeadBridge beats zero-padding, random adapters, and fixed Dower transforms on LOSO macro-F1 under a frozen encoder.',
  'Progressive unfreezing improves monotonically from A to B to C; full adaptation yields the strongest subject-independent results.',
  'Cross-dataset transfer still drops, so environment and label physiology remain open challenges.',
];

const score = (value: string) => parseFloat(value.split('±')[0] ?? value);

const bestIndex = (values: string[], direction: 'min' | 'max') => {
  const scores = values.map(score);
  const target =
    direction === 'min' ? Math.min(...scores) : Math.max(...scores);
  return scores.indexOf(target);
};

const columnBest = (
  rows: {values: string[]}[],
  columns: number[] = rows[0]?.values.map((_, i) => i) ?? [],
) =>
  (rows[0]?.values ?? []).map((_, column) =>
    columns.includes(column)
      ? bestIndex(
          rows.map(row => row.values[column] ?? ''),
          'max',
        )
      : -1,
  );

const mainBest = columnBest(main.rows);
const ablationBest = columnBest(ablation.rows, [0, 2]);

const cellClass = (isBest: boolean) => (isBest ? 'is-best' : undefined);

interface PaperSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}

const PaperSection = ({id, eyebrow, title, children}: PaperSectionProps) => (
  <section
    className="section cogadapt-paper-section"
    id={id}
    aria-labelledby={`${id}-title`}
  >
    <div className="container">
      <p className="cogadapt-eyebrow">{eyebrow}</p>
      <h2 className="section-title" id={`${id}-title`}>
        {title}
      </h2>
      {children}
    </div>
  </section>
);

interface ResultsTableProps {
  caption: ReactNode;
  narrow?: boolean;
  children: ReactNode;
}

const ResultsTable = ({caption, narrow, children}: ResultsTableProps) => (
  <figure className="cogadapt-table-figure">
    <div className="cogadapt-table-wrap" tabIndex={0}>
      <table className={`cogadapt-results-table${narrow ? ' is-narrow' : ''}`}>
        {children}
      </table>
    </div>
    <figcaption>{caption}</figcaption>
  </figure>
);

interface MethodRowProps {
  method: string;
  ours?: boolean | undefined;
  values: string[];
  row: number;
  best: number[];
}

const MethodRow = ({method, ours, values, row, best}: MethodRowProps) => (
  <tr className={ours ? 'is-ours' : undefined}>
    <th scope="row">{method}</th>
    {values.map((value, column) => (
      <td key={column} className={cellClass(best[column] === row)}>
        {value}
      </td>
    ))}
  </tr>
);

const CogAdapt = () => {
  const [copied, setCopied] = useState(false);

  const copyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      toast.success('BibTeX copied to clipboard');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Unable to copy BibTeX automatically');
    }
  };

  return (
    <article className="cogadapt-page">
      <header className="cogadapt-hero">
        <div className="container">
          <a
            className="page-back-link cogadapt-back-link"
            {...navLinkProps(ROUTE_PATHS.publications)}
          >
            <Icon icon={faArrowLeft} size="sm" />
            All publications
          </a>

          <div className="cogadapt-hero-content">
            <div className="cogadapt-hero-visual">
              <img
                src="/assets/images/cogadapt/motivation.png"
                width="622"
                height="431"
                alt="Clinical twelve-lead ECG foundation model compared with noisy three-lead wearable ECG signals for cognitive load classification"
              />
            </div>

            <div className="cogadapt-hero-copy">
              <p className="cogadapt-status">
                <span className="cogadapt-status-dot" aria-hidden="true" />
                Accepted at IEEE EMBS BHI 2026
              </p>
              <h1>{paper.title}</h1>
              <h2>{paper.venue}</h2>
              <p className="cogadapt-authors">
                {paper.authors.map((author, index) => (
                  <span key={author}>
                    {author === 'Mohammad Sadegh Sirjani' ? (
                      <strong>{author}</strong>
                    ) : (
                      author
                    )}
                    {index < paper.authors.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <p className="cogadapt-affiliation">
                University of Texas at San Antonio
              </p>

              <div className="hero-buttons cogadapt-actions">
                <a
                  className="btn btn-primary"
                  href={paper.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon={faFilePdf} />
                  Read paper
                </a>
                <a
                  className="btn btn-secondary"
                  href={paper.arxiv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  arXiv
                </a>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => void copyBibtex()}
                >
                  <Icon icon={copied ? faCheck : faCopy} />
                  {copied ? 'Copied' : 'BibTeX'}
                </button>
                <span
                  className="btn btn-secondary cogadapt-disabled"
                  aria-disabled="true"
                  title="Code coming soon"
                >
                  <Icon icon={faGithub} />
                  Code soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="cogadapt-jump" aria-label="Page sections">
        <div className="container">
          <ul>
            {SECTIONS.map(section => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <PaperSection
        id="motivation"
        eyebrow="Introduction"
        title="The sensor gap"
      >
        <p className="cogadapt-section-copy">
          Clinical ECG foundation models expect twelve-lead hospital recordings.
          Wearable cognitive load datasets provide noisy three-lead signals and
          a different task.
        </p>
        <figure className="cogadapt-figure is-medium">
          <img
            src="/assets/images/cogadapt/motivation.png"
            width="622"
            height="431"
            loading="lazy"
            alt="Clinical twelve-lead ECG foundation model compared with noisy three-lead wearable ECG signals for cognitive load classification"
          />
          <figcaption>
            <strong>Figure 1.</strong> Pretrained foundation models expect
            twelve-lead clinical ECG, but wearable cognitive load datasets
            provide only three-lead recordings.
          </figcaption>
        </figure>
      </PaperSection>

      <PaperSection id="abstract" eyebrow="Paper" title="Abstract">
        <p className="cogadapt-abstract">
          Assessing cognitive load continuously and at low latency would help
          adaptive human-computer interaction, but it remains hard because
          labeled data are scarce and models generalize poorly across subjects.
          Recent ECG foundation models are pretrained on millions of clinical
          diagnostic ECG recordings, yet they do not apply directly to wearable
          devices when the sensor configuration and the task both differ. We
          present CogAdapt, a framework that adapts a clinical ECG foundation
          model to wearable cognitive load assessment. LeadBridge is a learnable
          adapter that maps three-lead wearable signals to a
          twelve-lead-compatible representation. ProFine is a progressive
          fine-tuning strategy that unfreezes encoder layers in stages while
          limiting representational drift. On CLARE and CL-Drive under
          leave-one-subject-out cross-validation, CogAdapt reaches macro-F1 of
          0.626 and 0.768, improving over from-scratch baselines by 11.2 and
          16.1 percentage points.
        </p>
        <div className="cogadapt-result-notes">
          <p>
            <strong>+11.2 pts</strong>
            <span>CLARE LOSO macro-F1 over the from-scratch baseline</span>
          </p>
          <p>
            <strong>+16.1 pts</strong>
            <span>CL-Drive LOSO macro-F1 over the from-scratch baseline</span>
          </p>
        </div>
      </PaperSection>

      <PaperSection id="pipeline" eyebrow="Method" title="CogAdapt pipeline">
        <p className="cogadapt-section-copy">
          Wearable preprocessing feeds LeadBridge, which learns the
          three-to-twelve-lead mapping. The pretrained ECG foundation model
          extracts clinical representations, and a compact head classifies low
          versus high cognitive load.
        </p>
        <figure className="cogadapt-figure is-wide">
          <img
            src="/assets/images/cogadapt/architecture.png"
            width="1078"
            height="545"
            loading="lazy"
            alt="CogAdapt architecture showing ECG data processing, LeadBridge, the pretrained ECG foundation model, and the cognitive load classification head"
          />
          <figcaption>
            <strong>Figure 2.</strong> The CogAdapt pipeline: LeadBridge (3→12
            leads), the pretrained ECG-FM encoder, and ProFine fine-tuning for
            cognitive-load classification.
          </figcaption>
        </figure>
      </PaperSection>

      <PaperSection
        id="profine"
        eyebrow="Adaptation"
        title="ProFine progressive fine-tuning"
      >
        <p className="cogadapt-section-copy">
          Three scenarios control how much of the ECG foundation model is
          updated: a frozen encoder, its top layers, or the full encoder with
          bucketed learning rates.
        </p>
        <ul className="cogadapt-scenarios">
          {SCENARIOS.map(scenario => (
            <li key={scenario.name}>
              <span className="cogadapt-scenario-lead">{scenario.name}</span>
              <span>{scenario.detail}</span>
            </li>
          ))}
        </ul>
        <figure className="cogadapt-figure is-medium">
          <img
            src="/assets/images/cogadapt/progressive.png"
            width="538"
            height="205"
            loading="lazy"
            alt="ProFine scenarios A, B, and C showing frozen and trainable LeadBridge, ECG foundation model, and classification modules"
          />
          <figcaption>
            <strong>Figure 3.</strong> Scenario A freezes the encoder, scenario
            B unfreezes its top layers, and scenario C unfreezes all layers.
          </figcaption>
        </figure>
      </PaperSection>

      <PaperSection id="results" eyebrow="Results" title="Main results">
        <p className="cogadapt-section-copy">
          Progressive full adaptation transfers the clinical model more
          effectively than wearable baselines trained from scratch, under both
          K-fold and subject-independent evaluation.
        </p>
        <ResultsTable
          caption={
            <>
              <strong>Table I.</strong> Performance on CLARE and CL-Drive. Cells
              are mean ± std over folds (K-fold 10; LOSO 20 on CLARE, 21 on
              CL-Drive). AUC is AUROC. Best per column highlighted.
            </>
          }
        >
          <thead>
            <tr>
              <th scope="col" rowSpan={3}>
                Method
              </th>
              {main.datasets.map(dataset => (
                <th
                  key={dataset}
                  scope="colgroup"
                  colSpan={main.protocols.length * main.metrics.length}
                >
                  {dataset}
                </th>
              ))}
            </tr>
            <tr>
              {main.datasets.flatMap(dataset =>
                main.protocols.map(protocol => (
                  <th
                    key={`${dataset}-${protocol}`}
                    scope="colgroup"
                    colSpan={main.metrics.length}
                  >
                    {protocol}
                  </th>
                )),
              )}
            </tr>
            <tr>
              {main.datasets.flatMap(dataset =>
                main.protocols.flatMap(protocol =>
                  main.metrics.map(metric => (
                    <th key={`${dataset}-${protocol}-${metric}`} scope="col">
                      {metric}
                    </th>
                  )),
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {main.rows.map((row, index) => (
              <MethodRow
                key={row.method}
                row={index}
                method={row.method}
                ours={row.ours}
                values={row.values}
                best={mainBest}
              />
            ))}
          </tbody>
        </ResultsTable>
      </PaperSection>

      <PaperSection
        id="ablation"
        eyebrow="Ablation"
        title="LeadBridge ablation"
      >
        <p className="cogadapt-section-copy">
          With the encoder frozen (scenario A), only the three-to-twelve-lead
          mapping and the head are trained. LeadBridge wins on macro-F1 for both
          datasets.
        </p>
        <ResultsTable
          narrow
          caption={
            <>
              <strong>Table II.</strong> LeadBridge ablation under the frozen
              ECG-FM encoder. Best F1 highlighted.
            </>
          }
        >
          <thead>
            <tr>
              <th scope="col" rowSpan={2}>
                3→12 mapping
              </th>
              {main.datasets.map(dataset => (
                <th key={dataset} scope="colgroup" colSpan={2}>
                  {dataset}
                </th>
              ))}
            </tr>
            <tr>
              {main.datasets.flatMap(dataset =>
                ['F1', 'AUC'].map(metric => (
                  <th key={`${dataset}-${metric}`} scope="col">
                    {metric}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {ablation.rows.map((row, index) => (
              <MethodRow
                key={row.method}
                row={index}
                method={row.method}
                ours={row.ours}
                values={row.values}
                best={ablationBest}
              />
            ))}
          </tbody>
        </ResultsTable>
      </PaperSection>

      <PaperSection
        id="reconstruction"
        eyebrow="Pretraining"
        title="PTB-XL reconstruction"
      >
        <p className="cogadapt-section-copy">
          On held-out PTB-XL recordings, LeadBridge reconstructs the precordial
          leads V2–V6 with the lowest RMSE on V2–V5 and the highest correlation
          on most leads.
        </p>
        <ResultsTable
          narrow
          caption={
            <>
              <strong>Table III.</strong> Held-out PTB-XL reconstruction for
              V2–V6. RMSE in µV. Best per lead and metric highlighted.
            </>
          }
        >
          <thead>
            <tr>
              <th scope="col" rowSpan={2}>
                Lead
              </th>
              <th scope="colgroup" colSpan={recon.methods.length}>
                RMSE ↓ (µV)
              </th>
              <th scope="colgroup" colSpan={recon.methods.length}>
                Correlation ↑
              </th>
            </tr>
            <tr>
              {['rmse', 'corr'].flatMap(metric =>
                recon.methods.map(method => (
                  <th key={`${metric}-${method}`} scope="col">
                    {method}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {recon.rows.map(row => {
              const bestRmse = bestIndex(row.rmse, 'min');
              const bestCorr = bestIndex(row.corr, 'max');
              return (
                <tr key={row.lead}>
                  <th scope="row">{row.lead}</th>
                  {row.rmse.map((value, i) => (
                    <td key={`rmse-${i}`} className={cellClass(i === bestRmse)}>
                      {value}
                    </td>
                  ))}
                  {row.corr.map((value, i) => (
                    <td key={`corr-${i}`} className={cellClass(i === bestCorr)}>
                      {value}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </ResultsTable>
      </PaperSection>

      <PaperSection id="takeaways" eyebrow="Summary" title="Takeaways">
        <ul className="cogadapt-takeaways">
          {TAKEAWAYS.map(takeaway => (
            <li key={takeaway}>{takeaway}</li>
          ))}
        </ul>
      </PaperSection>

      <section className="section cogadapt-paper-section" id="citation">
        <div className="container">
          <p className="cogadapt-eyebrow">Cite</p>
          <div className="cogadapt-citation-heading">
            <h2 className="section-title">BibTeX</h2>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => void copyBibtex()}
            >
              <Icon icon={copied ? faCheck : faCopy} />
              {copied ? 'Copied' : 'Copy BibTeX'}
            </button>
          </div>
          <pre className="cogadapt-bibtex">
            <code>{bibtex}</code>
          </pre>
        </div>
      </section>
    </article>
  );
};

export default CogAdapt;
