import {useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import toast from 'react-hot-toast';
import Icon from '../Icon/Icon';
import {
  faArrowLeft,
  faCheck,
  faCopy,
  faFilePdf,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {ROUTE_PATHS} from '../../constants/siteNav';
import {navLinkProps} from '../../utils/router';
import bibtexData from '../../data/bibtex.json';
import cogadaptData from '../../data/cogadapt.json';
import './CogAdapt.css';

const AUTHORS = [
  'Amir Mousavi',
  'Erfan Nourbakhsh',
  'Mohammad Sadegh Sirjani',
  'Mimi Xie',
  'Rocky Slavin',
  'Leslie Neely',
  'John Davis',
  'John Quarles',
];

const SELF = 'Mohammad Sadegh Sirjani';
const ARXIV = 'https://arxiv.org/abs/2605.22774';
const PDF = '/assets/docs/publications/2605.22774v2.pdf';
const IMAGES = '/assets/images/cogadapt';

const SECTIONS = [
  {id: 'top', label: 'Top'},
  {id: 'motivation', label: 'Motivation'},
  {id: 'abstract', label: 'Abstract'},
  {id: 'pipeline', label: 'Pipeline'},
  {id: 'profine', label: 'ProFine'},
  {id: 'results', label: 'Main results'},
  {id: 'ablation', label: 'LeadBridge ablation'},
  {id: 'reconstruction', label: 'Reconstruction'},
  {id: 'takeaways', label: 'Takeaways'},
  {id: 'bibtex', label: 'BibTeX'},
];

const TAKEAWAYS = [
  'Clinical ECG pretraining can transfer to wearable cognitive load when the sensor gap is closed with a learned lead adapter.',
  'LeadBridge beats zero-padding, random adapters, and fixed Dower transforms on LOSO macro-F1 under a frozen encoder.',
  'Progressive unfreezing (ProFine) improves monotonically from A → B → C; full adaptation yields the strongest subject-independent results.',
  'Cross-dataset transfer still drops, so environment and label physiology remain open challenges.',
];

const bibtex = bibtexData.mousavi2026cogadapt.bibtex;
const {mainResults: main, ablation, reconstruction: recon} = cogadaptData;

const score = (value: string) => parseFloat(value.split('±')[0] ?? value);

const bestOf = (values: string[], direction: 'min' | 'max' = 'max') => {
  const scores = values.map(score);
  const pick = direction === 'min' ? Math.min : Math.max;
  return scores.indexOf(pick(...scores));
};

const bestRowPerColumn = (rows: {values: string[]}[]) =>
  (rows[0]?.values ?? []).map((_, column) =>
    bestOf(rows.map(row => row.values[column] ?? '')),
  );

const mainBest = bestRowPerColumn(main.rows);
const ablationBest = bestRowPerColumn(ablation.rows).map((row, column) =>
  column % 2 === 0 ? row : -1,
);

const bestClass = (isBest: boolean) => (isBest ? 'is-best' : undefined);

const useActiveSection = () => {
  const [active, setActive] = useState(SECTIONS[0]?.id);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.35;
      let current = SECTIONS[0]?.id;
      for (const {id} of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return active;
};

interface PaperSectionProps {
  id: string;
  kicker: string;
  title: string;
  lede?: string;
  alt?: boolean;
  children: ReactNode;
}

const PaperSection = ({
  id,
  kicker,
  title,
  lede,
  alt,
  children,
}: PaperSectionProps) => (
  <section
    id={id}
    className={`cogadapt-band${alt ? ' is-alt' : ''}`}
    aria-labelledby={`${id}-title`}
  >
    <div className="cogadapt-inner">
      <p className="cogadapt-kicker">{kicker}</p>
      <h2 className="cogadapt-heading" id={`${id}-title`}>
        {title}
      </h2>
      {lede && <p className="cogadapt-lede">{lede}</p>}
      {children}
    </div>
  </section>
);

interface FigureProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  size: 'medium' | 'wide';
  children: ReactNode;
}

const Figure = ({
  src,
  width,
  height,
  alt,
  label,
  size,
  children,
}: FigureProps) => (
  <figure className={`cogadapt-figure is-${size}`}>
    <img src={src} width={width} height={height} loading="lazy" alt={alt} />
    <figcaption className="cogadapt-caption">
      <span>{label}</span> {children}
    </figcaption>
  </figure>
);

interface PaperTableProps {
  label: string;
  caption: string;
  compact?: boolean;
  children: ReactNode;
}

const PaperTable = ({label, caption, compact, children}: PaperTableProps) => (
  <figure className={`cogadapt-table-figure${compact ? ' is-compact' : ''}`}>
    <div className="cogadapt-table-scroll" tabIndex={0}>
      <table className="cogadapt-table">{children}</table>
    </div>
    <figcaption className="cogadapt-caption">
      <span>{label}</span> {caption}
    </figcaption>
  </figure>
);

const CogAdapt = () => {
  const [copied, setCopied] = useState(false);
  const active = useActiveSection();

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
      <nav className="cogadapt-dots" aria-label="Page sections">
        {SECTIONS.map(({id, label}) => (
          <a
            key={id}
            href={`#${id}`}
            title={label}
            aria-label={label}
            aria-current={active === id ? 'location' : undefined}
            className={active === id ? 'is-active' : undefined}
          />
        ))}
      </nav>

      <header className="cogadapt-hero" id="top">
        <div className="cogadapt-inner">
          <a
            className="page-back-link cogadapt-back"
            {...navLinkProps(ROUTE_PATHS.publications)}
          >
            <Icon icon={faArrowLeft} size="sm" />
            All publications
          </a>

          <p className="cogadapt-badge">
            <span aria-hidden="true" />
            IEEE EMBS BHI 2026
          </p>

          <h1 className="cogadapt-title">
            <em>CogAdapt</em>: Adapting Clinical ECG Foundation Models for
            Wearable Cognitive Load Assessment
          </h1>

          <p className="cogadapt-authors">
            {AUTHORS.map((author, index) => (
              <span key={author}>
                {author === SELF ? <strong>{author}</strong> : author}
                <sup>1</sup>
                {index < AUTHORS.length - 1 && ', '}
              </span>
            ))}
          </p>
          <p className="cogadapt-meta">
            <sup>1</sup>University of Texas at San Antonio (UTSA)
          </p>
          <p className="cogadapt-meta is-venue">
            IEEE-EMBS International Conference on Biomedical and Health
            Informatics (BHI 2026)
          </p>

          <div className="cogadapt-links">
            <a
              className="btn btn-primary"
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon icon={faFilePdf} />
              Paper
            </a>
            <a
              className="btn btn-secondary"
              href={ARXIV}
              target="_blank"
              rel="noopener noreferrer"
            >
              arXiv
            </a>
            <span
              className="btn btn-secondary is-disabled"
              aria-disabled="true"
              title="Code coming soon"
            >
              <Icon icon={faGithub} />
              Code (Soon)
            </span>
            <a className="btn btn-secondary" href="#bibtex">
              <Icon icon={faQuoteRight} />
              BibTeX
            </a>
          </div>
        </div>
      </header>

      <PaperSection
        id="motivation"
        kicker="Introduction"
        title="The Sensor Gap"
        lede="Clinical ECG foundation models expect 12-lead hospital recordings. Wearable cognitive load datasets provide noisy 3-lead signals and a different task."
        alt
      >
        <Figure
          src={`${IMAGES}/motivation.png`}
          width={622}
          height={431}
          size="medium"
          label="Figure 1."
          alt="Clinical 12-lead ECG foundation model versus a wearable 3-lead cognitive load classifier"
        >
          The challenge: pretrained foundation models expect 12-lead clinical
          ECG, but wearable cognitive load datasets provide only 3-lead
          recordings.
        </Figure>
      </PaperSection>

      <PaperSection id="abstract" kicker="Paper" title="Abstract">
        <p className="cogadapt-abstract">
          Assessing cognitive load continuously and at low latency would help
          adaptive human-computer interaction, but it remains hard because
          labeled data are scarce and models generalize poorly across subjects.
          Recent ECG foundation models are pretrained on millions of clinical
          diagnostic ECG recordings, yet they do not apply directly to wearable
          devices when the sensor configuration and the task both differ. We
          present <strong>CogAdapt</strong>, a framework that adapts a clinical
          ECG foundation model to wearable cognitive load assessment.{' '}
          <strong>LeadBridge</strong> is a learnable adapter that maps 3-lead
          wearable signals to a 12-lead-compatible representation.{' '}
          <strong>ProFine</strong> is a progressive fine-tuning strategy that
          unfreezes encoder layers in stages while limiting representational
          drift. On CLARE and CL-Drive under leave-one-subject-out
          cross-validation, CogAdapt reaches macro-F1 of 0.626 and 0.768,
          improving over from-scratch baselines by 11.2 and 16.1 percentage
          points.
        </p>
      </PaperSection>

      <PaperSection
        id="pipeline"
        kicker="Method"
        title="CogAdapt Pipeline"
        lede="Wearable preprocessing, LeadBridge 3→12 mapping, pretrained ECG-FM, and a binary load head."
        alt
      >
        <Figure
          src={`${IMAGES}/architecture.png`}
          width={1078}
          height={545}
          size="wide"
          label="Figure 2."
          alt="CogAdapt pipeline with data processing, LeadBridge, the ECG-FM encoder, and the cognitive load classification head"
        >
          The CogAdapt pipeline: LeadBridge (3→12 leads), the pretrained ECG-FM
          encoder, and ProFine fine-tuning for cognitive-load classification.
        </Figure>
      </PaperSection>

      <PaperSection
        id="profine"
        kicker="Adaptation"
        title="ProFine Progressive Fine-Tuning"
        lede="Three scenarios control how much of ECG-FM is updated: frozen, top layers, or full encoder with bucketed learning rates."
      >
        <Figure
          src={`${IMAGES}/progressive.png`}
          width={538}
          height={205}
          size="medium"
          label="Figure 3."
          alt="ProFine scenarios A, B, and C showing frozen versus trainable LeadBridge, ECG-FM, and classification head"
        >
          Progressive fine-tuning scenarios. Scenario A freezes the encoder.
          Scenario B unfreezes top layers. Scenario C unfreezes all layers.
        </Figure>
      </PaperSection>

      <PaperSection
        id="results"
        kicker="Results"
        title="Main Results"
        lede="Performance on CLARE and CL-Drive under K-fold and LOSO. Cells are mean ± std over folds. Best per column in bold."
        alt
      >
        <PaperTable
          label="Table I."
          caption="Performance on CLARE and CL-Drive under K-fold and LOSO. Cells are mean ± std over folds (K-fold 10; LOSO 20 on CLARE, 21 on CL-Drive). AUC is AUROC."
        >
          <thead>
            <tr>
              <th scope="col" rowSpan={3} className="is-label">
                Method
              </th>
              {main.datasets.map(dataset => (
                <th key={dataset} scope="colgroup" colSpan={6}>
                  {dataset}
                </th>
              ))}
            </tr>
            <tr>
              {main.datasets.flatMap(dataset =>
                main.protocols.map(protocol => (
                  <th key={dataset + protocol} scope="colgroup" colSpan={3}>
                    {protocol}
                  </th>
                )),
              )}
            </tr>
            <tr>
              {main.datasets.flatMap(dataset =>
                main.protocols.flatMap(protocol =>
                  main.metrics.map(metric => (
                    <th key={dataset + protocol + metric} scope="col">
                      {metric}
                    </th>
                  )),
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {main.rows.map((row, index) => (
              <tr key={row.method} className={row.ours ? 'is-ours' : undefined}>
                <th scope="row" className="is-label">
                  {row.method}
                </th>
                {row.values.map((value, column) => (
                  <td
                    key={column}
                    className={bestClass(mainBest[column] === index)}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </PaperTable>
      </PaperSection>

      <PaperSection
        id="ablation"
        kicker="Ablation"
        title="LeadBridge Ablation"
        lede="Frozen encoder (Scenario A). Only the 3→12 mapping and head are trained. LeadBridge wins on macro-F1 for both datasets."
      >
        <PaperTable
          compact
          label="Table II."
          caption="LeadBridge ablation under the frozen ECG-FM encoder. Best F1 cells in bold."
        >
          <thead>
            <tr>
              <th scope="col" rowSpan={2} className="is-label">
                3→12 Mapping
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
                  <th key={dataset + metric} scope="col">
                    {metric}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {ablation.rows.map((row, index) => (
              <tr key={row.method} className={row.ours ? 'is-ours' : undefined}>
                <th scope="row" className="is-label">
                  {row.method}
                </th>
                {row.values.map((value, column) => (
                  <td
                    key={column}
                    className={bestClass(ablationBest[column] === index)}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </PaperTable>
      </PaperSection>

      <PaperSection
        id="reconstruction"
        kicker="Pretraining"
        title="PTB-XL Reconstruction"
        lede="Held-out PTB-XL reconstruction for precordial leads V2–V6. LeadBridge leads on RMSE for V2–V5 and on correlation for most leads."
        alt
      >
        <PaperTable
          compact
          label="Table III."
          caption="Held-out PTB-XL reconstruction for V2–V6. RMSE in µV."
        >
          <thead>
            <tr>
              <th scope="col" rowSpan={2} className="is-label">
                Lead
              </th>
              <th scope="colgroup" colSpan={3}>
                RMSE ↓ (µV)
              </th>
              <th scope="colgroup" colSpan={3}>
                Correlation ↑
              </th>
            </tr>
            <tr>
              {['rmse', 'corr'].flatMap(metric =>
                recon.methods.map(method => (
                  <th key={metric + method} scope="col">
                    {method}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {recon.rows.map(row => {
              const rmseBest = bestOf(row.rmse, 'min');
              const corrBest = bestOf(row.corr);
              return (
                <tr key={row.lead}>
                  <th scope="row" className="is-label">
                    {row.lead}
                  </th>
                  {row.rmse.map((value, i) => (
                    <td key={`rmse${i}`} className={bestClass(i === rmseBest)}>
                      {value}
                    </td>
                  ))}
                  {row.corr.map((value, i) => (
                    <td key={`corr${i}`} className={bestClass(i === corrBest)}>
                      {value}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </PaperTable>
      </PaperSection>

      <PaperSection id="takeaways" kicker="Summary" title="Takeaways">
        <ul className="cogadapt-takeaways">
          {TAKEAWAYS.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </PaperSection>

      <PaperSection id="bibtex" kicker="Cite" title="BibTeX" alt>
        <div className="cogadapt-bibtex">
          <button
            type="button"
            className="cogadapt-copy"
            onClick={() => void copyBibtex()}
            aria-label={copied ? 'Copied' : 'Copy BibTeX'}
            title={copied ? 'Copied' : 'Copy BibTeX'}
          >
            <Icon icon={copied ? faCheck : faCopy} size="sm" />
          </button>
          <pre>
            <code>{bibtex}</code>
          </pre>
        </div>
      </PaperSection>
    </article>
  );
};

export default CogAdapt;
