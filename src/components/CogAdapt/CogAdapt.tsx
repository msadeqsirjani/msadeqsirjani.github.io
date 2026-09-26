import ProjectPage from '../ProjectPage/ProjectPage';
import ProjectSection from '../ProjectPage/ProjectSection';
import ProjectFigure from '../ProjectPage/ProjectFigure';
import ProjectTable from '../ProjectPage/ProjectTable';
import ProjectList from '../ProjectPage/ProjectList';
import bibtexData from '../../data/bibtex.json';
import cogadaptData from '../../data/cogadapt.json';

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

const ARXIV = 'https://arxiv.org/abs/2605.22774';
const PDF = '/assets/docs/publications/2605.22774v2.pdf';
const IMAGES = '/assets/images/cogadapt';

const SECTIONS = [
  {id: 'motivation', label: 'Motivation'},
  {id: 'abstract', label: 'Abstract'},
  {id: 'pipeline', label: 'Pipeline'},
  {id: 'profine', label: 'ProFine'},
  {id: 'results', label: 'Main results'},
  {id: 'ablation', label: 'LeadBridge ablation'},
  {id: 'reconstruction', label: 'Reconstruction'},
  {id: 'takeaways', label: 'Takeaways'},
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

const CogAdapt = () => (
  <ProjectPage
    title="CogAdapt: Adapting Clinical ECG Foundation Models for Wearable Cognitive Load Assessment"
    authors={AUTHORS}
    affiliation="University of Texas at San Antonio (UTSA)"
    venue="IEEE-EMBS International Conference on Biomedical and Health Informatics (BHI 2026)"
    pdf={PDF}
    link={{label: 'arXiv', href: ARXIV}}
    bibtex={bibtex}
    sections={SECTIONS}
  >
    <ProjectSection
      id="motivation"
      title="The Sensor Gap"
      lede="Clinical ECG foundation models expect 12-lead hospital recordings. Wearable cognitive load datasets provide noisy 3-lead signals and a different task."
    >
      <ProjectFigure
        src={`${IMAGES}/motivation.png`}
        width={622}
        height={431}
        size="medium"
        label="Figure 1."
        alt="Clinical 12-lead ECG foundation model versus a wearable 3-lead cognitive load classifier"
      >
        The challenge: pretrained foundation models expect 12-lead clinical ECG,
        but wearable cognitive load datasets provide only 3-lead recordings.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection id="abstract" title="Abstract">
      <p className="project-abstract">
        Assessing cognitive load continuously and at low latency would help
        adaptive human-computer interaction, but it remains hard because labeled
        data are scarce and models generalize poorly across subjects. Recent ECG
        foundation models are pretrained on millions of clinical diagnostic ECG
        recordings, yet they do not apply directly to wearable devices when the
        sensor configuration and the task both differ. We present{' '}
        <strong>CogAdapt</strong>, a framework that adapts a clinical ECG
        foundation model to wearable cognitive load assessment.{' '}
        <strong>LeadBridge</strong> is a learnable adapter that maps 3-lead
        wearable signals to a 12-lead-compatible representation.{' '}
        <strong>ProFine</strong> is a progressive fine-tuning strategy that
        unfreezes encoder layers in stages while limiting representational
        drift. On CLARE and CL-Drive under leave-one-subject-out
        cross-validation, CogAdapt reaches macro-F1 of 0.626 and 0.768,
        improving over from-scratch baselines by 11.2 and 16.1 percentage
        points.
      </p>
    </ProjectSection>

    <ProjectSection
      id="pipeline"
      title="CogAdapt Pipeline"
      lede="Wearable preprocessing, LeadBridge 3→12 mapping, pretrained ECG-FM, and a binary load head."
    >
      <ProjectFigure
        src={`${IMAGES}/architecture.png`}
        width={1078}
        height={545}
        size="wide"
        label="Figure 2."
        alt="CogAdapt pipeline with data processing, LeadBridge, the ECG-FM encoder, and the cognitive load classification head"
      >
        The CogAdapt pipeline: LeadBridge (3→12 leads), the pretrained ECG-FM
        encoder, and ProFine fine-tuning for cognitive-load classification.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="profine"
      title="ProFine Progressive Fine-Tuning"
      lede="Three scenarios control how much of ECG-FM is updated: frozen, top layers, or full encoder with bucketed learning rates."
    >
      <ProjectFigure
        src={`${IMAGES}/progressive.png`}
        width={538}
        height={205}
        size="medium"
        label="Figure 3."
        alt="ProFine scenarios A, B, and C showing frozen versus trainable LeadBridge, ECG-FM, and classification head"
      >
        Progressive fine-tuning scenarios. Scenario A freezes the encoder.
        Scenario B unfreezes top layers. Scenario C unfreezes all layers.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="results"
      title="Main Results"
      lede="Performance on CLARE and CL-Drive under K-fold and LOSO. Cells are mean ± std over folds. Best per column in bold."
    >
      <ProjectTable
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
      </ProjectTable>
    </ProjectSection>

    <ProjectSection
      id="ablation"
      title="LeadBridge Ablation"
      lede="Frozen encoder (Scenario A). Only the 3→12 mapping and head are trained. LeadBridge wins on macro-F1 for both datasets."
    >
      <ProjectTable
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
      </ProjectTable>
    </ProjectSection>

    <ProjectSection
      id="reconstruction"
      title="PTB-XL Reconstruction"
      lede="Held-out PTB-XL reconstruction for precordial leads V2–V6. LeadBridge leads on RMSE for V2–V5 and on correlation for most leads."
    >
      <ProjectTable
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
      </ProjectTable>
    </ProjectSection>

    <ProjectSection id="takeaways" title="Takeaways">
      <ProjectList items={TAKEAWAYS} />
    </ProjectSection>
  </ProjectPage>
);

export default CogAdapt;
