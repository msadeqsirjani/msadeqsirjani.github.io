import ProjectPage from '../ProjectPage/ProjectPage';
import ProjectSection from '../ProjectPage/ProjectSection';
import ProjectFigure from '../ProjectPage/ProjectFigure';
import ProjectTable from '../ProjectPage/ProjectTable';
import ProjectList from '../ProjectPage/ProjectList';
import bibtexData from '../../data/bibtex.json';

const AUTHORS = [
  'Mohammad Sadegh Sirjani',
  'Mohammad Ahmad',
  'Amir Mousavi',
  'Erfan Nourbakhsh',
  'Khoa Nguyen',
];

const IMAGES = '/assets/images/rigeo';

const SECTIONS = [
  {id: 'motivation', label: 'Motivation'},
  {id: 'abstract', label: 'Abstract'},
  {id: 'related', label: 'Related work'},
  {id: 'framework', label: 'RIGEO framework'},
  {id: 'rl', label: 'Reinforcement learning'},
  {id: 'igeo', label: 'IGEO'},
  {id: 'setup', label: 'Simulation setup'},
  {id: 'results', label: 'Results'},
  {id: 'takeaways', label: 'Takeaways'},
];

const RELATED = [
  {ref: 'Wang et al. [6]', year: '2018', factors: [true, true, false]},
  {ref: 'Vispute et al. [7]', year: '2023', factors: [true, false, false]},
  {ref: 'Azami et al. [3]', year: '2022', factors: [true, true, false]},
  {ref: 'Klatoun et al. [8]', year: '2022', factors: [true, true, true]},
  {ref: 'Hosseini et al. [9]', year: '2022', factors: [true, true, true]},
  {ref: 'Ghanavati et al. [4]', year: '2020', factors: [false, false, false]},
];

const SPLIT = [
  {tasks: 'Short deadline', nodes: 'Low-traffic FNs', scheduler: 'IGEO'},
  {
    tasks: 'Long deadline',
    nodes: 'High-traffic FNs',
    scheduler: 'Reinforcement learning',
  },
];

const ALGORITHM = `Require: task T with deadline D, fog nodes F = {f1, ..., fn}
Ensure:  scheduled and processed task

 1  LowTrafficFNs ← ∅, HighTrafficFNs ← ∅
 2  for each f ∈ F do
 3      if f.traffic < traffic_threshold then
 4          add f to LowTrafficFNs
 5      else
 6          add f to HighTrafficFNs
 7  if T.deadline < deadline_threshold then
 8      f ← SELECT(LowTrafficFNs)
 9      result ← IGEO_PROCESS(T, f)
10  else
11      f ← SELECT(HighTrafficFNs)
12      result ← RL_PROCESS(T, f)
13  return result`;

const PARAMETERS = [
  {
    group: 'Workload',
    rows: [
      ['Fog nodes (m)', '20'],
      ['Network topology', 'Full mesh'],
      ['Task loads evaluated', '200, 300, 400, 500, 600'],
      ['Time slots (T)', '10'],
      ['Monte Carlo runs', '50'],
      ['Population size (Npop)', '50'],
      ['Iterations per batch (Niter)', '2'],
      ['Traffic history length', '200 steps'],
      ['Max node traffic load', '100 units'],
    ],
  },
  {
    group: 'Fog nodes',
    rows: [
      ['CPU capacity (Cj)', 'U{81, …, 100} units'],
      ['Memory (Mj)', 'U{5, …, 16} GB'],
      ['Energy rate (εj)', 'U{3, 4, 5} + U[0, 1) J/cycle'],
      ['Energy harvest (hj)', '0.003'],
      ['Cost rate (κj)', 'U[0, 1)'],
      ['QoS throughput (θj)', 'U[0.5, 1.5]'],
    ],
  },
  {
    group: 'Network',
    rows: [
      ['Task data size (si)', '≤ ci × 0.5 ≈ 2.5 MB'],
      ['Link bandwidth (Bjk)', '≥ 1 Gbps (wired LAN)'],
      ['Propagation delay (δjk)', '< 0.1 ms (co-located)'],
      ['Communication overhead', 'Negligible (≪ Ei)'],
    ],
  },
  {
    group: 'Thresholds',
    rows: [
      ['Deadline threshold', '25th percentile'],
      ['Traffic threshold', 'Median of node mean'],
    ],
  },
];

const GAINS = [
  {metric: 'Energy consumption', gain: '29% lower', baseline: 'GEO'},
  {metric: 'Energy consumption', gain: '26% lower', baseline: 'GWO'},
  {metric: 'Response time', gain: '86% faster', baseline: 'GEO'},
  {metric: 'Response time', gain: '80% faster', baseline: 'GWO'},
  {metric: 'Deadline violation', gain: '19% lower', baseline: 'WCLA+GA'},
  {metric: 'Deadline violation', gain: '14% lower', baseline: 'ETFC'},
];

const RL_STEPS = [
  <>
    <strong>State.</strong> The index of the most recently assigned high-traffic
    fog node; the first state is drawn uniformly from the high-traffic set.
  </>,
  <>
    <strong>Action.</strong> Greedily pick the high-traffic node with the
    highest learned preference P(s, f) from the current state.
  </>,
  <>
    <strong>Reward.</strong> When the task meets its deadline, P(s, a) scales up
    by 10%; on a violation it scales down by 10%, clipped to [0, 1].
  </>,
  <>
    <strong>Transition.</strong> The state moves to the assigned node, so the
    policy adapts as tasks in the batch arrive.
  </>,
];

const TAKEAWAYS = [
  'Splitting fog nodes by traffic and tasks by deadline lets each scheduler work where it is strongest.',
  'IGEO discretizes Golden Eagle Optimization with mutation for exploration and crossover for exploitation, fitting short-deadline tasks on low-traffic nodes.',
  'A lightweight table-based RL policy handles long-deadline tasks on busy nodes without meta-heuristic overhead.',
  'At 600 tasks, RIGEO cuts energy by up to 29%, response time by up to 86%, and deadline violations by up to 19% against state-of-the-art baselines.',
];

const bibtex = bibtexData.sirjani2026optimizing.bibtex;

const Rigeo = () => (
  <ProjectPage
    title="Optimizing Task Scheduling in Fog Computing with Deadline Awareness"
    authors={AUTHORS}
    affiliation="Department of Computer Science, University of Texas at San Antonio (UTSA)"
    venue="IEEE 2nd International Conference on Secure IoT, Assured and Trusted Computing (SATC 2026)"
    paper="https://doi.org/10.1109/SATC69565.2026.11542230"
    code="https://github.com/msadeqsirjani/RIGEO"
    bibtex={bibtex}
    sections={SECTIONS}
  >
    <ProjectSection
      id="motivation"
      title="Deadlines at the Edge"
      lede="Time-sensitive IoT applications such as e-health, smart grids, and smart traffic need fast, deadline-aware responses. Fog nodes bring computation closer to devices, but their limited, heterogeneous resources make task scheduling the bottleneck."
    >
      <ProjectFigure
        src={`${IMAGES}/architecture.jpg`}
        width={1200}
        height={1093}
        size="small"
        label="Figure 1."
        alt="Three-layer IoT-Fog-Cloud architecture with a cloud data center, a fog layer of servers, and an IoT layer of devices"
      >
        The architecture of the IoT-Fog-Cloud network. The fog layer schedules
        tasks close to devices, while the cloud provides large-scale compute and
        storage.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection id="abstract" title="Abstract">
      <p className="project-abstract">
        The rise of Internet of Things (IoT) devices has led to the development
        of numerous time-sensitive applications that require quick responses and
        low latency. Fog computing has emerged as a solution for processing
        these IoT applications, but it faces challenges such as resource
        allocation and job scheduling. Therefore, it is crucial to determine how
        to assign and schedule tasks on Fog nodes. This work aims to schedule
        tasks in IoT while minimizing the total energy consumption of nodes and
        enhancing the Quality of Service (QoS) requirements of IoT tasks, taking
        into account task deadlines. This paper classifies Fog nodes into two
        categories based on their traffic level: low and high. It schedules
        short-deadline tasks on low-traffic nodes using an{' '}
        <strong>Improved Golden Eagle Optimization (IGEO)</strong> algorithm, an
        enhancement that utilizes genetic operators for discretization.
        Long-deadline tasks are processed on high-traffic nodes using{' '}
        <strong>reinforcement learning (RL)</strong>. This combined approach is
        called the{' '}
        <strong>
          Reinforcement Improved Golden Eagle Optimization (RIGEO)
        </strong>{' '}
        algorithm. Experimental results demonstrate that RIGEO achieves up to a
        29% reduction in energy consumption, up to an 86% improvement in
        response time, and up to a 19% reduction in deadline violations compared
        to state-of-the-art algorithms.
      </p>
    </ProjectSection>

    <ProjectSection
      id="related"
      title="Related Work"
      lede="Prior schedulers target energy, deadlines, or latency, but rarely all three. RIGEO optimizes energy consumption, deadline violation time, and response time together."
    >
      <ProjectTable
        compact
        label="Table I."
        caption="Comparison of factors considered in related work."
      >
        <thead>
          <tr>
            <th scope="col" className="is-label">
              Reference
            </th>
            <th scope="col">Year</th>
            <th scope="col">Energy efficiency</th>
            <th scope="col">Deadline constraints</th>
            <th scope="col">Latency reduction</th>
          </tr>
        </thead>
        <tbody>
          {RELATED.map(row => (
            <tr key={row.ref}>
              <th scope="row" className="is-label">
                {row.ref}
              </th>
              <td>{row.year}</td>
              {row.factors.map((factor, index) => (
                <td key={index}>{factor ? '✓' : '×'}</td>
              ))}
            </tr>
          ))}
          <tr className="is-ours">
            <th scope="row" className="is-label">
              RIGEO (ours)
            </th>
            <td>2026</td>
            <td className="is-best">✓</td>
            <td className="is-best">✓</td>
            <td className="is-best">✓</td>
          </tr>
        </tbody>
      </ProjectTable>
    </ProjectSection>

    <ProjectSection
      id="framework"
      title="RIGEO Framework"
      lede="Fog nodes whose mean traffic exceeds the network-wide median are labeled high-traffic; tasks below the 25th-percentile deadline are short-deadline. Each class goes to the scheduler that suits it."
    >
      <ProjectTable
        compact
        label="Table II."
        caption="How RIGEO routes tasks to fog nodes and schedulers."
      >
        <thead>
          <tr>
            <th scope="col" className="is-label">
              Tasks
            </th>
            <th scope="col">Fog nodes</th>
            <th scope="col">Scheduler</th>
          </tr>
        </thead>
        <tbody>
          {SPLIT.map(row => (
            <tr key={row.tasks}>
              <th scope="row" className="is-label">
                {row.tasks}
              </th>
              <td>{row.nodes}</td>
              <td className="is-best">{row.scheduler}</td>
            </tr>
          ))}
        </tbody>
      </ProjectTable>
      <figure className="project-code">
        <pre>
          <code>{ALGORITHM}</code>
        </pre>
        <figcaption className="project-caption">
          <span>Algorithm 1.</span> RIGEO task scheduling: traffic-based node
          split, then deadline-based dispatch to IGEO or RL.
        </figcaption>
      </figure>
    </ProjectSection>

    <ProjectSection
      id="rl"
      title="Reinforcement Learning for Long Deadlines"
      lede="A table-based policy schedules long-deadline tasks on high-traffic nodes. It maintains a communication-preference matrix P and updates it online as each task in the batch is processed."
    >
      <ProjectList items={RL_STEPS} />
    </ProjectSection>

    <ProjectSection
      id="igeo"
      title="IGEO: Discrete Golden Eagle Search"
      lede="Golden Eagle Optimization balances cruising (exploration) and attacking (exploitation). Task scheduling is discrete, so IGEO replaces the continuous position update with genetic operators: mutation when the step vector favors exploration, crossover when it favors exploitation."
    >
      <ProjectFigure
        src={`${IMAGES}/mutation.jpg`}
        width={1400}
        height={416}
        size="medium"
        label="Figure 2."
        alt="Mutation operator changing two genes of a task assignment vector"
      >
        Mutation operator. Green segments are genes subject to mutation; blue
        segments remain constant.
      </ProjectFigure>
      <ProjectFigure
        src={`${IMAGES}/crossover.jpg`}
        width={1600}
        height={503}
        size="wide"
        label="Figure 3."
        alt="One-point and two-point crossover between two parent task assignment vectors"
      >
        Crossover operations: (a) one-point and (b) two-point. Purple and green
        mark the exchanged segments.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="setup"
      title="Simulation Setup"
      lede="Workloads of 200–600 tasks are scheduled on 20 heterogeneous fog nodes over 10 time slots, averaged over 50 Monte Carlo runs. Baselines are GEO, GWO, WCLA+GA, and ETFC."
    >
      <ProjectTable compact label="Table III." caption="Simulation parameters.">
        <thead>
          <tr>
            <th scope="col" className="is-label">
              Parameter
            </th>
            <th scope="col" className="is-label">
              Value
            </th>
          </tr>
        </thead>
        {PARAMETERS.map(({group, rows}) => (
          <tbody key={group}>
            <tr className="is-ours">
              <th scope="colgroup" colSpan={2} className="is-label">
                {group}
              </th>
            </tr>
            {rows.map(([name, value]) => (
              <tr key={name}>
                <th scope="row" className="is-label">
                  {name}
                </th>
                <td className="is-label">{value}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </ProjectTable>
    </ProjectSection>

    <ProjectSection
      id="results"
      title="Results"
      lede="RIGEO distributes tasks more evenly across fog nodes, lowering energy use, deadline violations, and response time across all task loads."
    >
      <ProjectFigure
        src={`${IMAGES}/results.png`}
        width={2140}
        height={798}
        size="wide"
        label="Figure 4."
        alt="Bar charts of energy consumption, deadline violation time, and response time for GEO, GWO, WCLA+GA, ETFC, and RIGEO from 200 to 600 tasks"
      >
        Performance with 200–600 tasks and 20 fog nodes over 50 runs: (a) energy
        consumption, (b) deadline violation, (c) response time.
      </ProjectFigure>
      <ProjectTable
        compact
        label="Table IV."
        caption="RIGEO improvements at maximum load (600 tasks)."
      >
        <thead>
          <tr>
            <th scope="col" className="is-label">
              Metric
            </th>
            <th scope="col">RIGEO</th>
            <th scope="col">vs.</th>
          </tr>
        </thead>
        <tbody>
          {GAINS.map(row => (
            <tr key={row.metric + row.baseline}>
              <th scope="row" className="is-label">
                {row.metric}
              </th>
              <td className="is-best">{row.gain}</td>
              <td>{row.baseline}</td>
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

export default Rigeo;
