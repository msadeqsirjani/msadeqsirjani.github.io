import ProjectPage from '../ProjectPage/ProjectPage';
import ProjectSection from '../ProjectPage/ProjectSection';
import ProjectFigure from '../ProjectPage/ProjectFigure';
import ProjectTable from '../ProjectPage/ProjectTable';
import ProjectList from '../ProjectPage/ProjectList';
import TableHead from '../ProjectPage/TableHead';
import TableRows from '../ProjectPage/TableRows';
import bibtexData from '../../data/bibtex.json';

const AUTHORS = [
  {name: 'Seyed Amir Mousavi', marks: '1'},
  {name: 'Mohammad Sadegh Sirjani', marks: '1'},
  {name: 'Seyyed Javad Bozorg Zadeh Razavi', marks: '1'},
  {name: 'Morteza Nikooghadam', marks: '2'},
];

const AFFILIATIONS = [
  'Department of Computer, Ferdowsi University of Mashhad, Mashhad, Iran',
  'Department of Computer Engineering, Imam Reza International University, Mashhad, Iran',
];

const IMAGES = '/assets/images/secvanet';

const SECTIONS = [
  {id: 'motivation', label: 'Motivation'},
  {id: 'abstract', label: 'Abstract'},
  {id: 'registration', label: 'Registration'},
  {id: 'authentication', label: 'Authentication'},
  {id: 'security', label: 'Security analysis'},
  {id: 'performance', label: 'Performance'},
  {id: 'takeaways', label: 'Takeaways'},
];

const PROPERTIES = [
  <>
    <strong>Perfect forward secrecy.</strong> The session key depends on fresh
    random values under ECDH, so leaked long-term keys do not expose past
    sessions.
  </>,
  <>
    <strong>Mutual authentication.</strong> Every party checks the received
    authenticators before continuing.
  </>,
  <>
    <strong>Replay resistance.</strong> Timestamps are checked for freshness at
    every step.
  </>,
  <>
    <strong>Stolen-verifier resistance.</strong> Reading the RSU or vehicle
    memory does not let an attacker rebuild the session key.
  </>,
  <>
    <strong>Impersonation resistance.</strong> Strict mutual authentication
    drops the connection whenever a check fails.
  </>,
  <>
    <strong>Known-session temporary information.</strong> A long-term secret in
    the session key keeps it safe even if the random values leak.
  </>,
];

const COST = [
  ['Scheme [12]', '5TS + 6TH + 2TSE', '19.273'],
  ['Scheme [15]', '25TC + 29TE', '139.475'],
  ['SecVanet', '7TM + 9TH + 4TSE', '15.623'],
];

const TAKEAWAYS = [
  'SecVanet authenticates damaged vehicles, the RSU, and emergency vehicles before an emergency event is trusted, blocking fake accident reports.',
  'Scyther verifies every claim for all three roles with no attacks found.',
  'The protocol resists replay, stolen-verifier, impersonation, and known-session-specific temporary information attacks, and provides perfect forward secrecy.',
  'At 15.623 ms of computation, it is lighter than the compared schemes at 19.273 ms and 139.475 ms.',
];

const bibtex = bibtexData['10433027'].bibtex;

const SecVanet = () => (
  <ProjectPage
    title="SecVanet: Provably Secure Authentication Protocol for Sending Emergency Events in VANET"
    authors={AUTHORS}
    affiliation={AFFILIATIONS}
    venue="2023 14th International Conference on Information and Knowledge Technology (IKT), pp. 86–91"
    paper="https://doi.org/10.1109/IKT62039.2023.10433027"
    bibtex={bibtex}
    sections={SECTIONS}
  >
    <ProjectSection
      id="motivation"
      title="Trusted Emergency Alerts on the Road"
      lede="When an accident happens, vehicles warn the network and call emergency vehicles through roadside units. The channel is public, so an attacker could eavesdrop, tamper with messages, or fake an accident and send ambulances to the wrong place."
    >
      <ProjectFigure
        src={`${IMAGES}/architecture.jpg`}
        width={706}
        height={259}
        size="small"
        label="Figure 1."
        alt="Road with a damaged vehicle, ordinary vehicles, an emergency fire truck, and two roadside units covering the scene"
      >
        System architecture: damaged and ordinary vehicles, roadside units
        (RSUs), and an emergency vehicle (EV).
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection id="abstract" title="Abstract">
      <p className="project-abstract">
        Recently, the number of accidents resulting in irreparable damages like
        death has risen due to the increased number of vehicles worldwide.
        Vehicular ad hoc network (VANET) is a new technology for enhancing road
        safety, reducing traffic load, and providing emergency services.
        Vehicles can send warnings in a network to announce accidents and seek
        help from emergency vehicles. Security and privacy are now significant
        concerns in developing vehicular ad hoc networks despite the many
        advantages of VANET. The communication channel in this network is public
        and insecure, so there is concern about eavesdropping, message
        manipulation, and impersonation, which creates significant risks. For
        this reason, a safe and efficient protocol is proposed in this article
        to ensure data security in VANET. The security of the proposed protocol
        has been proven by the <strong>Scyther</strong> tool. The security
        analysis performed on the protocol also shows that the proposed protocol
        is resistant to many attacks and meets various security requirements. We
        also evaluated the performance of the proposed protocol in terms of
        computational complexity and showed that the proposed scheme has less
        computational complexity than similar schemes.
      </p>
    </ProjectSection>

    <ProjectSection
      id="registration"
      title="Registration"
      lede="Before any emergency, ordinary vehicles and emergency vehicles register with the RSU over a secure channel. The RSU stores their credentials, and each vehicle keeps its own in tamper-proof memory."
    >
      <ProjectFigure
        src={`${IMAGES}/vehicle-registration.jpg`}
        width={1429}
        height={506}
        size="medium"
        label="Figure 2."
        alt="Message flow for registering an ordinary or damaged vehicle with the RSU"
      >
        Ordinary / damaged vehicle registration phase.
      </ProjectFigure>
      <ProjectFigure
        src={`${IMAGES}/ev-registration.jpg`}
        width={1287}
        height={387}
        size="medium"
        label="Figure 3."
        alt="Message flow for registering an emergency vehicle with the RSU"
      >
        Emergency vehicle registration phase.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="authentication"
      title="Authentication and Key Agreement"
      lede="When the alarm fires, the damaged vehicle sends an encrypted, timestamped alert to the RSU. The RSU verifies it, finds an emergency vehicle in the same area, and forwards the event. The emergency vehicle and the damaged vehicle then authenticate each other and agree on a session key."
    >
      <ProjectFigure
        src={`${IMAGES}/authentication.jpg`}
        width={1263}
        height={1732}
        size="medium"
        label="Figure 4."
        alt="Authentication and key agreement message flow between the damaged vehicle, the RSU, and the emergency vehicle"
      >
        Authentication and key agreement phase between the damaged vehicle, the
        RSU, and the emergency vehicle.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="security"
      title="Security Analysis"
      lede="An informal analysis shows which attacks SecVanet resists, and the Scyther tool verifies its claims formally."
    >
      <ProjectList items={PROPERTIES} />
      <ProjectFigure
        src={`${IMAGES}/scyther.jpg`}
        width={1520}
        height={1580}
        size="medium"
        label="Figure 5."
        alt="Scyther verification results: every secrecy, aliveness, weak agreement, non-injective agreement, and synchronization claim for damaged vehicles, the RSU, and emergency vehicles is verified with no attacks"
      >
        Formal security analysis with Scyther: every claim for the damaged
        vehicle, RSU, and emergency vehicle roles is verified with no attacks.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="performance"
      title="Computation Cost"
      lede="Operation times come from Abbasinezhad-Mood et al.: ECC point multiplication (TM) 2.2265 ms, hash (TH) 0.0023 ms, symmetric encryption (TSE) 0.0046 ms, sign (TS) 3.85 ms, modular exponentiation (TE) 3.85 ms, and Chebyshev map (TC) 1.113 ms."
    >
      <ProjectTable
        compact
        label="Table 1."
        caption="Comparison of computation cost."
      >
        <TableHead labels={['Scheme', 'Total computation', 'Time (ms)']} />
        <TableRows
          rows={COST}
          ours={row => row === 2}
          best={(row, column) => row === 2 && column === 1}
        />
      </ProjectTable>
    </ProjectSection>

    <ProjectSection id="takeaways" title="Takeaways">
      <ProjectList items={TAKEAWAYS} />
    </ProjectSection>
  </ProjectPage>
);

export default SecVanet;
