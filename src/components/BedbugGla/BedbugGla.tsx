import ProjectPage from '../ProjectPage/ProjectPage';
import ProjectSection from '../ProjectPage/ProjectSection';
import ProjectFigure from '../ProjectPage/ProjectFigure';
import ProjectTable from '../ProjectPage/ProjectTable';
import ProjectList from '../ProjectPage/ProjectList';
import bibtexData from '../../data/bibtex.json';

const AUTHORS = [
  {name: 'Mohammad Sadegh Sirjani', marks: '1'},
  {name: 'Ali Maleki', marks: '2'},
  {name: 'Amir Pakmehr', marks: '3'},
  {name: 'Maedeh Abedini Bagha', marks: '4,5'},
  {name: 'Ali Ghaffari', marks: '5,6,7'},
  {name: 'Ali Asghar Pour Haji Kazem', marks: '6'},
];

const AFFILIATIONS = [
  'Department of Computer Science, University of Texas at San Antonio, San Antonio, TX, USA',
  'Department of Computer Engineering, Shi.C., Islamic Azad University, Shiraz, Iran',
  'Department of Computer and Information Technology Engineering, Qa.C., Islamic Azad University, Qazvin, Iran',
  'Roshdiyeh Higher Education Institute, Tabriz, Iran',
  'Department of Computer Engineering, Ta.C., Islamic Azad University, Tabriz, Iran',
  'Department of Software Engineering, Istinye University, Istanbul, Türkiye',
  'Department of Computer Science, Khazar University, Baku, Azerbaijan',
];

const IMAGES = '/assets/images/bedbug-gla';

const SECTIONS = [
  {id: 'motivation', label: 'Motivation'},
  {id: 'abstract', label: 'Abstract'},
  {id: 'method', label: 'Bedbug-GLA'},
  {id: 'setup', label: 'Topologies and setup'},
  {id: 'results', label: 'Results'},
  {id: 'takeaways', label: 'Takeaways'},
];

const STEPS = [
  [
    'Step 1',
    'DCLA: irregular cellular learning automata with a GA-derived reinforcement signal',
    'Number of controllers',
  ],
  [
    'Step 2',
    'DBMHA: Bedbug metaheuristic with genetic operators and a chaotic initial population',
    'Controller-to-switch assignment',
  ],
];

const CONTRIBUTIONS = [
  <>
    <strong>DCLA.</strong> Each cell of the cellular learning automata observes
    its neighborhood, selects an action, and adapts from feedback. A genetic
    algorithm supplies the reinforcement signal to speed up learning.
  </>,
  <>
    <strong>Choosing the number of controllers.</strong> DCLA sizes the
    controller set to the network&apos;s size, structure, traffic, and
    controller workloads.
  </>,
  <>
    <strong>DBMHA.</strong> Genetic crossover and mutation help the Bedbug
    algorithm escape local optima, and a chaotic map diversifies the initial
    population.
  </>,
  <>
    <strong>Multi-objective assignment.</strong> A weighted fitness function
    balances controller load, propagation latency, and energy usage.
  </>,
];

const NETWORKS = [
  ['Internet2 OS3E', 'Country', 'USA', '34', '42'],
  ['IRIS', 'Region', 'Tennessee, USA', '51', '64'],
  ['Colt', 'Continent', 'Europe', '153', '177'],
];

const PARAMETERS = [
  ['Initial population', '30'],
  ['Run time', '30 iterations'],
  ['Traffic', 'Random (0, 500)'],
  ['e_base', '0.1'],
  ['e_dyn', '0.001'],
  ['e_trans', '1'],
  ['l_i', '1'],
  ['α, β (DCLA)', '0.01'],
  ['ε̂ (BMHA)', '0.185'],
  ['MinVar, MaxVar (BMHA)', '0, 1'],
  ['Search agents (ALO)', '40'],
  ['r1, r2 (PSO, GEWO)', 'Random in [0, 1]'],
  ["c1', c2' (PSO)", '1.7, 2'],
  ['Inertia weight (PSO)', '0.75'],
];

const RESULTS = [
  ['PSO', '2356.74', '1493.33', '393.33'],
  ['ALO', '2297.64', '1357.00', '257.00'],
  ['GEWO', '1957.51', '1273.33', '143.33'],
  ['BMHA', '1977.16', '1266.67', '166.67'],
  ['Bedbug-GLA', '1888.86', '1221.00', '121.00'],
];

const GAINS = [
  ['PSO', '19.85%', '18.24%', '69.24%'],
  ['ALO', '17.79%', '10.02%', '52.92%'],
  ['GEWO', '3.51%', '4.11%', '15.58%'],
  ['BMHA', '4.47%', '3.61%', '27.40%'],
];

const TAKEAWAYS = [
  'Splitting controller placement into sizing (DCLA) and assignment (DBMHA) lets each step use the method that suits it.',
  'Genetic operators and chaotic initialization keep the Bedbug search diverse and help it avoid premature convergence.',
  'On Internet2 OS3E, Bedbug-GLA improves maximum controller load by 4%–18%, congested-controller overload by 16%–69%, and energy usage by 4%–20% over PSO, ALO, GEWO, and BMHA.',
  'ALO reaches the lowest end-to-end delay; Bedbug-GLA stays comparable on latency while using much less energy, trading a little delay for a balanced multi-objective result.',
];

const bibtex = bibtexData.Sirjani2025.bibtex;

const Header = ({labels}: {labels: string[]}) => (
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

const BedbugGla = () => (
  <ProjectPage
    title="Controller Placement in Software-Defined Networks Using Reinforcement Learning and Metaheuristics"
    authors={AUTHORS}
    affiliation={AFFILIATIONS}
    venue="Cluster Computing, vol. 28, no. 10, art. 660 (2025)"
    pdf="/assets/docs/publications/s10586-025-05331-y.pdf"
    link={{label: 'DOI', href: 'https://doi.org/10.1007/s10586-025-05331-y'}}
    bibtex={bibtex}
    sections={SECTIONS}
  >
    <ProjectSection
      id="motivation"
      title="Where Should the Controllers Go?"
      lede="Software-defined networks move all control logic into controllers, so how many controllers a network has, and which switches each one manages, sets its latency, load balance, and energy use. Finding that placement is NP-hard, and prior work rarely optimizes all of these objectives together."
    />

    <ProjectSection id="abstract" title="Abstract">
      <p className="project-abstract">
        Software-defined networking (SDN) has revolutionized network management
        by enabling dynamic control and optimization of network resources. A key
        challenge in SDN deployment is the strategic placement and assignment of
        controllers, which significantly affects network performance in terms of
        energy consumption, latency, and load balancing. This research addresses
        the controller placement problem by proposing a two-step method that
        combines enhanced reinforcement learning with an improved metaheuristic
        algorithm, termed <strong>Bedbug-GLA</strong>. In the first step, an
        irregular cellular learning automata model is developed to determine the
        optimal number of controllers required. In the second step, the Bedbug
        metaheuristic algorithm is employed to efficiently assign controllers to
        switches. Simulation results demonstrate that Bedbug-GLA achieves up to
        an 18% improvement in maximum controller load, a 69% reduction in
        congested controller overload, and a 20% decrease in energy consumption
        compared to state-of-the-art metaheuristic approaches, as evaluated on
        standard network topologies derived from real-world datasets.
      </p>
    </ProjectSection>

    <ProjectSection
      id="method"
      title="Bedbug-GLA in Two Steps"
      lede="Bedbug-GLA first learns how many controllers the network needs, then decides which switches each controller manages."
    >
      <ProjectTable
        compact
        text
        label="Table 1."
        caption="The two steps of Bedbug-GLA."
      >
        <Header labels={['Step', 'Method', 'Output']} />
        <tbody>
          {STEPS.map(([step, method, output]) => (
            <tr key={step}>
              <th scope="row" className="is-label">
                {step}
              </th>
              <td>{method}</td>
              <td className="is-best">{output}</td>
            </tr>
          ))}
        </tbody>
      </ProjectTable>
      <ProjectList items={CONTRIBUTIONS} />
      <ProjectFigure
        src={`${IMAGES}/flowchart.jpg`}
        width={1400}
        height={1185}
        size="medium"
        label="Figure 1."
        alt="Bedbug-GLA flowchart: find the optimal number of controllers with DCLA, then assign controllers with DBMHA using a chaotic initial population, GA and BMHA updates, and a global best"
      >
        General flowchart of Bedbug-GLA: DCLA finds the number of controllers,
        then DBMHA assigns controllers to switches.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="setup"
      title="Real-World Topologies"
      lede="Bedbug-GLA is evaluated on three topologies from the Internet Topology Zoo with 3, 4, and 5 controllers, against PSO, ALO, GEWO, and BMHA. Traffic between random origins and destinations varies from 0 to 500 packets."
    >
      <ProjectFigure
        src={`${IMAGES}/topologies.jpg`}
        width={1600}
        height={846}
        size="wide"
        label="Figure 2."
        alt="Maps of the Colt Telecom network across Europe, the Internet2 OS3E network across the USA, and the IRIS network in Tennessee"
      >
        The Internet2 OS3E, IRIS, and Colt network topologies.
      </ProjectFigure>
      <ProjectTable
        compact
        label="Table 2."
        caption="The details of the evaluated SDN topologies."
      >
        <Header
          labels={['Network', 'Extent', 'Location', 'Switches', 'Links']}
        />
        <tbody>
          {NETWORKS.map(([name, ...cells]) => (
            <tr key={name}>
              <th scope="row" className="is-label">
                {name}
              </th>
              {cells.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </ProjectTable>
      <ProjectTable
        compact
        label="Table 3."
        caption="Simulation parameters and constants."
      >
        <Header labels={['Parameter', 'Value']} />
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
      lede="On Internet2 OS3E, averaged over 100 runs and 3–5 controllers, Bedbug-GLA has the lowest energy usage, maximum controller load, and congested-controller overload."
    >
      <ProjectFigure
        src={`${IMAGES}/energy.png`}
        width={1490}
        height={1018}
        size="medium"
        label="Figure 3."
        alt="Bar chart of energy usage in the Internet2 OS3E topology for PSO, ALO, GEWO, BMHA, and Bedbug-GLA with 3, 4, and 5 controllers"
      >
        Energy usage in the Internet2 OS3E topology with 3, 4, and 5
        controllers.
      </ProjectFigure>
      <ProjectTable
        compact
        label="Table 4."
        caption="Averages over 3, 4, and 5 controllers in Internet2 OS3E. Lower is better."
      >
        <Header
          labels={[
            'Method',
            'Energy (J)',
            'Max controller load',
            'Congested overload',
          ]}
        />
        <tbody>
          {RESULTS.map(([method, ...values]) => {
            const ours = method === 'Bedbug-GLA';
            return (
              <tr key={method} className={ours ? 'is-ours' : undefined}>
                <th scope="row" className="is-label">
                  {method}
                </th>
                {values.map((value, index) => (
                  <td key={index} className={ours ? 'is-best' : undefined}>
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
        label="Table 5."
        caption="Bedbug-GLA improvement over each baseline."
      >
        <Header
          labels={[
            'vs.',
            'Energy',
            'Max controller load',
            'Congested overload',
          ]}
        />
        <tbody>
          {GAINS.map(([method, ...values]) => (
            <tr key={method}>
              <th scope="row" className="is-label">
                {method}
              </th>
              {values.map((value, index) => (
                <td key={index} className="is-best">
                  {value}
                </td>
              ))}
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

export default BedbugGla;
