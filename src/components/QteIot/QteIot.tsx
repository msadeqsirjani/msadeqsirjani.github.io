import ProjectPage from '../ProjectPage/ProjectPage';
import ProjectSection from '../ProjectPage/ProjectSection';
import ProjectFigure from '../ProjectPage/ProjectFigure';
import ProjectTable from '../ProjectPage/ProjectTable';
import ProjectList from '../ProjectPage/ProjectList';
import bibtexData from '../../data/bibtex.json';

const AUTHORS = [
  {name: 'Ali Ghaffari', marks: '1,2,3'},
  {name: 'Vesal Firoozi', marks: '4'},
  {name: 'Ali Maleki', marks: '5'},
  {name: 'Mohammad Sadegh Sirjani', marks: '6'},
  {name: 'Maedeh Abedini Bagha', marks: '1,7'},
];

const AFFILIATIONS = [
  'Department of Computer Engineering, Ta.C., Islamic Azad University, Tabriz, Iran',
  'Department of Computer Engineering, Istinye University, Istanbul, Türkiye',
  'Department of Computer Science, Khazar University, Baku, Azerbaijan',
  'Department of Computer Engineering, Ma.C., Islamic Azad University, Mashhad, Iran',
  'Department of Computer Engineering, Shiraz Branch, Islamic Azad University, Shiraz, Iran',
  'Department of Electronics, Information and Bioengineering, Politecnico di Milano, Milan, Italy',
  'Roshdiyeh Higher Education Institute, Tabriz, Iran',
];

const IMAGES = '/assets/images/qte-iot';

const SECTIONS = [
  {id: 'motivation', label: 'Motivation'},
  {id: 'abstract', label: 'Abstract'},
  {id: 'framework', label: 'QTE-IoT pipeline'},
  {id: 'classifier', label: 'Task classification'},
  {id: 'hybrids', label: 'Q-learning hybrids'},
  {id: 'setup', label: 'Simulation setup'},
  {id: 'results', label: 'Results'},
  {id: 'takeaways', label: 'Takeaways'},
];

const ROUTING = [
  ['Time-sensitive', 'Fog layer', 'QAVA'],
  ['Security', 'Private cloud', 'QARO'],
  ['Normal', 'Public cloud', 'QARO'],
];

const COMPONENTS = [
  <>
    <strong>MLP-ANN classifier.</strong> Sorts incoming tasks into
    time-sensitive, security, and normal classes from 18 task features.
  </>,
  <>
    <strong>QAVA.</strong> The African Vulture Algorithm combined with
    Q-learning schedules time-sensitive tasks on fog nodes.
  </>,
  <>
    <strong>QARO.</strong> An enhanced Artificial Rabbits Optimization with
    Q-learning schedules tasks on private and public cloud VMs.
  </>,
  <>
    <strong>Monitoring agent.</strong> Tracks resource load and, above a
    threshold, re-schedules cloud tasks or uses a greedy algorithm to offload
    fog tasks to another node.
  </>,
];

const CLASSIFIER = [
  ['Accuracy', '98.88%'],
  ['Precision', '98.73%'],
  ['Recall', '98%'],
  ['F1-score', '98.5%'],
];

const HYBRIDS = [
  {
    name: 'QARO',
    baselines: ['QL-only', 'ARO-only'],
    rows: [
      ['Makespan (s)', '142', '217', '195', '34% faster'],
      ['Energy consumption (J)', '18200', '24700', '22100', '26% better'],
      ['Deadline violations (%)', '4.1', '11.3', '8.2', '54% reduction'],
      ['Load imbalance', '0.11', '0.28', '0.19', '61% improvement'],
    ],
  },
  {
    name: 'QAVA',
    baselines: ['QL-only', 'AVA-only'],
    rows: [
      ['Makespan (s)', '120', '180', '150', '20% faster'],
      ['Energy consumption (J)', '15500', '22500', '20000', '22% better'],
      ['Deadline violations (%)', '3.5', '10.5', '7.0', '50% reduction'],
      ['Load imbalance', '0.08', '0.25', '0.15', '47% improvement'],
    ],
  },
];

const PARAMETERS = [
  ['Initial population (MGWO, OSAPSO, QARO, QAVA)', '30'],
  ['Iterations', '50'],
  ['Fog nodes', '50'],
  ['Private cloud VMs', '50'],
  ['Public cloud VMs', '50'],
  ['β (Q-learning)', '0.1'],
  ['γ (Q-learning)', '0.15'],
  ['L1, L2 (QAVA)', '0.8, 0.2'],
  ['w (QAVA)', '2.5'],
  ['P1, P2, P3 (QAVA)', '0.6, 0.4, 0.6'],
];

const RESULTS = [
  ['MGWO', '2532.37', '7.27', '26.61', '71.43'],
  ['OSAPSO', '2524.86', '3.16', '25.32', '85.18'],
  ['ARO', '2540.00', '3.17', '27.89', '78.38'],
  ['AVA', '2501.96', '3.08', '22.08', '86.92'],
  ['WCLA+GA', '2656.06', '2.65', '20.40', '89.22'],
  ['ETFC', '2654.82', '2.87', '22.68', '93.84'],
  ['QTE-IoT', '2350.26', '1.52', '16.63', '99.39'],
];

const GAINS = [
  ['Energy consumption', '6%–12%'],
  ['Load imbalance', '42%–79%'],
  ['Response time', '25%–40%'],
  ['Deadline satisfaction', '6%–39%'],
];

const TAKEAWAYS = [
  'Classifying tasks first lets each class run where it fits: time-sensitive tasks in the fog, security tasks in the private cloud, and normal tasks in the public cloud.',
  'Pairing Q-learning with metaheuristics speeds convergence: QARO and QAVA beat their standalone counterparts on makespan, energy, deadline violations, and load imbalance.',
  'The monitoring agent keeps load balanced by re-scheduling or offloading tasks before resources congest.',
  'On HCSP benchmark instances, QTE-IoT cuts energy by 6%–12% and response time by 25%–40%, and reaches over 99% average deadline satisfaction.',
];

const bibtex = bibtexData.GHAFFARI2025101247.bibtex;

const QteIot = () => (
  <ProjectPage
    title="QTE-IoT: Q-Learning-Based Task Scheduling Scheme to Enhance Energy Consumption and QoS in IoT Environments"
    authors={AUTHORS}
    affiliation={AFFILIATIONS}
    venue="Sustainable Computing: Informatics and Systems (2025)"
    pdf="/assets/docs/publications/S2210-5379(25)00168-4.pdf"
    link={{
      label: 'DOI',
      href: 'https://doi.org/10.1016/j.suscom.2025.101247',
    }}
    bibtex={bibtex}
    sections={SECTIONS}
  >
    <ProjectSection
      id="motivation"
      title="Scheduling Across Fog and Cloud"
      lede="IoT devices generate tasks with very different needs. Fog nodes sit close to devices for low latency, while public and private clouds offer scale and security. Deciding where each task runs, and when, drives energy use and quality of service."
    >
      <ProjectFigure
        src={`${IMAGES}/architecture.jpg`}
        width={421}
        height={420}
        size="small"
        label="Figure 1."
        alt="Fog-cloud-IoT architecture with public, hybrid, and private clouds, a fog layer of nodes, and an IoT device layer"
      >
        The FCIoT architecture: an IoT layer of devices, a fog layer of fog
        nodes, and a cloud layer with public and private clouds.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection id="abstract" title="Abstract">
      <p className="project-abstract">
        As the proliferation of Internet of Things (IoT) devices continues
        unabated, the demand for efficient task scheduling mechanisms becomes
        increasingly critical. Task scheduling in the IoT is pivotal for
        optimizing resource utilization, minimizing latency, and enhancing the
        overall system&apos;s performance. This research proposes a novel method
        called <strong>QTE-IoT</strong>, standing for a Q-learning-based task
        scheduling scheme to enhance energy consumption and QoS in IoT
        environments. QTE-IoT commences by categorizing tasks into three
        classes: time-sensitive tasks, security tasks, and normal tasks. This
        classification is achieved using a multi-layer perceptron artificial
        neural network. Subsequently, time-sensitive tasks are offloaded to the
        fog layer and scheduled using the proposed African Vulture Algorithm
        combined with Q-learning, which we designate as <strong>QAVA</strong>.
        Security tasks are offloaded to the private cloud, while normal tasks
        are offloaded to the public cloud. For task scheduling in private and
        public cloud environments, QTE-IoT employs a proposed enhanced version
        of Artificial Rabbits Optimization integrated with the Q-learning
        algorithm, known as <strong>QARO</strong>. Additionally, the QTE-IoT
        method incorporates a monitoring agent to oversee resource workload,
        thereby preventing congestion and delays. Simulation results on
        instances of the HCSP benchmark dataset demonstrate that QTE-IoT
        outperforms other state-of-the-art methods in various performance
        metrics. QTE-IoT achieves significant improvements compared to other
        methods and algorithms, including a 6% to 12% reduction in energy
        consumption. Furthermore, QTE-IoT exhibits substantial improvements in
        load imbalance (42% to 79%), response time (25% to 40%), and deadline
        satisfaction (6% to 39%) compared to existing approaches.
      </p>
    </ProjectSection>

    <ProjectSection
      id="framework"
      title="QTE-IoT Pipeline"
      lede="Tasks are classified first, then routed to the layer and scheduler that suit them, while a monitoring agent watches resource load."
    >
      <ProjectTable
        compact
        label="Table 1."
        caption="How QTE-IoT routes each task class."
      >
        <thead>
          <tr>
            <th scope="col" className="is-label">
              Task class
            </th>
            <th scope="col">Destination</th>
            <th scope="col">Scheduler</th>
          </tr>
        </thead>
        <tbody>
          {ROUTING.map(([task, destination, scheduler]) => (
            <tr key={task}>
              <th scope="row" className="is-label">
                {task}
              </th>
              <td>{destination}</td>
              <td className="is-best">{scheduler}</td>
            </tr>
          ))}
        </tbody>
      </ProjectTable>
      <ProjectList items={COMPONENTS} />
      <ProjectFigure
        src={`${IMAGES}/flowchart.jpg`}
        width={442}
        height={478}
        size="small"
        label="Figure 2."
        alt="QTE-IoT flowchart: classify tasks by MLP, send security tasks to the private cloud, time-sensitive tasks to the fog, and others to the public cloud, with a monitoring agent that offloads or re-schedules on overload"
      >
        The flowchart of QTE-IoT, including the monitoring agent that offloads
        or re-schedules tasks when a node or VM exceeds its load threshold.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="classifier"
      title="Task Classification"
      lede="An MLP-ANN with 18 input neurons, one per task attribute, sorts tasks into the three classes. It trains on 70% of the labeled tasks and is tested on the remaining 30%."
    >
      <ProjectTable
        compact
        label="Table 2."
        caption="Performance metrics of the MLP-ANN model."
      >
        <thead>
          <tr>
            <th scope="col" className="is-label">
              Metric
            </th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {CLASSIFIER.map(([metric, value]) => (
            <tr key={metric}>
              <th scope="row" className="is-label">
                {metric}
              </th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </ProjectTable>
    </ProjectSection>

    <ProjectSection
      id="hybrids"
      title="Q-Learning Hybrids"
      lede="Each hybrid is benchmarked against Q-learning alone and its metaheuristic alone on 400 tasks over 50 independent runs. QARO uses 25 private and 25 public cloud resources; QAVA uses 50 fog resources."
    >
      {HYBRIDS.map(({name, baselines, rows}, index) => (
        <ProjectTable
          key={name}
          compact
          label={`Table ${index + 3}.`}
          caption={`Benchmark comparison of ${name}.`}
        >
          <thead>
            <tr>
              <th scope="col" className="is-label">
                Metric
              </th>
              <th scope="col">{name}</th>
              {baselines.map(baseline => (
                <th key={baseline} scope="col">
                  {baseline}
                </th>
              ))}
              <th scope="col">Improvement</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([metric, ours, ...rest]) => (
              <tr key={metric}>
                <th scope="row" className="is-label">
                  {metric}
                </th>
                <td className="is-best">{ours}</td>
                {rest.map((value, column) => (
                  <td key={column}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </ProjectTable>
      ))}
    </ProjectSection>

    <ProjectSection
      id="setup"
      title="Simulation Setup"
      lede="Experiments use HCSP benchmark instances enriched to 18 features per task: 1000 labeled tasks (50% time-sensitive, 40% normal, 10% security), 200–600 tasks per run, 2000–6000 MIPS resources, and 10 repetitions per experiment in MATLAB R2019b."
    >
      <ProjectTable compact label="Table 5." caption="Simulation parameters.">
        <thead>
          <tr>
            <th scope="col" className="is-label">
              Parameter
            </th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {PARAMETERS.map(([name, value]) => (
            <tr key={name}>
              <th scope="row" className="is-label">
                {name}
              </th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </ProjectTable>
    </ProjectSection>

    <ProjectSection
      id="results"
      title="Results"
      lede="QTE-IoT is compared with ARO, AVA, MGWO, OSAPSO, WCLA+GA, and ETFC across 200–600 tasks and 30–50 resources. It posts the best average on every metric."
    >
      <ProjectTable
        compact
        label="Table 6."
        caption="Averages over 200–600 tasks and 30, 40, and 50 resources. Lower is better for energy, load imbalance, and response time; higher is better for deadline satisfaction."
      >
        <thead>
          <tr>
            <th scope="col" className="is-label">
              Method
            </th>
            <th scope="col">Energy (J)</th>
            <th scope="col">Load imbalance</th>
            <th scope="col">Response time</th>
            <th scope="col">Deadline satisfaction (%)</th>
          </tr>
        </thead>
        <tbody>
          {RESULTS.map(([method, ...values]) => {
            const ours = method === 'QTE-IoT';
            return (
              <tr key={method} className={ours ? 'is-ours' : undefined}>
                <th scope="row" className="is-label">
                  {method}
                </th>
                {values.map((value, column) => (
                  <td key={column} className={ours ? 'is-best' : undefined}>
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </ProjectTable>
      <ProjectTable
        compact
        label="Table 7."
        caption="QTE-IoT improvement range over the compared methods."
      >
        <thead>
          <tr>
            <th scope="col" className="is-label">
              Metric
            </th>
            <th scope="col">Improvement</th>
          </tr>
        </thead>
        <tbody>
          {GAINS.map(([metric, gain]) => (
            <tr key={metric}>
              <th scope="row" className="is-label">
                {metric}
              </th>
              <td className="is-best">{gain}</td>
            </tr>
          ))}
        </tbody>
      </ProjectTable>
    </ProjectSection>

    <ProjectSection id="takeaways" title="Takeaways">
      <ProjectList items={TAKEAWAYS} />
    </ProjectSection>
  </ProjectPage>
);

export default QteIot;
