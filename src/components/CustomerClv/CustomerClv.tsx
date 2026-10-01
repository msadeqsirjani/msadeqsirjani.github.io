import ProjectPage from '../ProjectPage/ProjectPage';
import ProjectSection from '../ProjectPage/ProjectSection';
import ProjectFigure from '../ProjectPage/ProjectFigure';
import ProjectTable from '../ProjectPage/ProjectTable';
import ProjectList from '../ProjectPage/ProjectList';
import TableHead from '../ProjectPage/TableHead';
import TableRows from '../ProjectPage/TableRows';
import bibtexData from '../../data/bibtex.json';

const AUTHORS = [
  {name: 'Mohammad Sadegh Sirjani', marks: '1'},
  {name: 'Seyed Amir Mousavi', marks: '1'},
  {name: 'Mostafa Sadeghi', marks: '2'},
];

const AFFILIATIONS = [
  'Department of Computer, Ferdowsi University of Mashhad, Mashhad, Iran',
  'Faculty of Computer Engineering, Najafabad Branch, Islamic Azad University, Najafabad, Iran',
];

const IMAGES = '/assets/images/customer-clv';

const SECTIONS = [
  {id: 'motivation', label: 'Motivation'},
  {id: 'abstract', label: 'Abstract'},
  {id: 'cloud', label: 'Cloud layers'},
  {id: 'method', label: 'Churn and CLV'},
  {id: 'results', label: 'Results'},
  {id: 'takeaways', label: 'Takeaways'},
];

const STAGES = [
  <>
    <strong>Churn prediction.</strong> Data mining estimates each
    customer&apos;s probability of leaving in the next period.
  </>,
  <>
    <strong>Customer lifetime value.</strong> A linear regression on each
    customer&apos;s revenue over time projects future value (mean r² = 0.75).
  </>,
  <>
    <strong>Retention optimization.</strong> A two-objective model maximizes
    lifetime value under a retention program while minimizing its contact and
    offer costs, solved with the LP-metric method in GAMS.
  </>,
];

const CLASSIFIERS = [
  ['CHAID decision tree', '2.9', '83.95%'],
  ['Perceptron neural network', '1.6', '70.79%'],
  ['k-nearest neighbor (k = 1)', '2.5', '97.33%'],
];

const SEGMENTS = [
  ['CLV < 3,000,000', '40%'],
  ['3,000,000 – 6,000,000', '45%'],
  ['6,000,000 – 12,000,000', '10%'],
  ['CLV > 12,000,000', '5%'],
];

const TAKEAWAYS = [
  'Cloud infrastructure provides the scale to mine large customer datasets quickly and in parallel.',
  'Oversampling the rare churn class to a 1:2 ratio gives classifiers a usable signal on imbalanced data.',
  'k-nearest neighbor (k = 1) reaches 97.33% accuracy with a lift above 2.5, making it the most reliable churn predictor tested.',
  'Combining churn probability with lifetime value lets a business target retention spending at the customers worth keeping.',
];

const bibtex = bibtexData['10496623'].bibtex;

const CustomerClv = () => (
  <ProjectPage
    title="Data Mining and Cloud Computing for Customer Pattern Analysis and Value Maximization"
    authors={AUTHORS}
    affiliation={AFFILIATIONS}
    venue="2024 10th International Conference on Artificial Intelligence and Robotics (QICAR), pp. 339–344"
    paper="https://doi.org/10.1109/QICAR61538.2024.10496623"
    bibtex={bibtex}
    sections={SECTIONS}
  >
    <ProjectSection
      id="motivation"
      title="Keeping the Customers Who Matter"
      lede="Companies hold large volumes of customer data but struggle to turn it into decisions about who to acquire, retain, and upsell. Pairing cloud computing with data mining makes it practical to find those patterns at scale."
    />

    <ProjectSection id="abstract" title="Abstract">
      <p className="project-abstract">
        In the contemporary business landscape, companies are seeking efficient
        methods to analyze customer behavior and extract actionable insights to
        foster customer relationships and drive business growth. This paper
        presents a novel approach that combines the strengths of cloud
        computing, software engineering, and data mining techniques to analyze
        customer patterns and optimize the value of the customer life cycle. By
        employing data mining techniques, including clustering, classification,
        association analysis, and predictive modeling, businesses can identify
        customer patterns and behaviors. Through the extensive analysis of
        customer data, organizations can uncover concealed patterns,
        preferences, and trends, which facilitate informed decisions regarding
        customer acquisition, retention, upselling, and personalized marketing
        strategies, ultimately maximizing the value of the customer life cycle.
        The integration of cloud computing, software engineering, and data
        mining enables businesses to leverage advanced analytics and extract
        valuable insights from customer data. This approach enables
        organizations to gain a comprehensive understanding of customer patterns
        and behaviors, thereby facilitating targeted marketing campaigns,
        personalized customer experiences, and improved customer satisfaction.
      </p>
    </ProjectSection>

    <ProjectSection
      id="cloud"
      title="Cloud Computing Layers"
      lede="Infrastructure, platform, and application clouds supply the storage, compute, and services that let data mining algorithms run on large customer datasets."
    >
      <ProjectFigure
        src={`${IMAGES}/cloud-layers.jpg`}
        width={770}
        height={422}
        size="small"
        label="Figure 1."
        alt="Stacked cloud computing layers: infrastructure cloud with storage, compute, and network; platform cloud with components and services; application cloud with machine and user"
      >
        Cloud computing layers.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="method"
      title="From Churn to Lifetime Value"
      lede="The analysis runs in three stages on real customer data from an insurance organization. Churners are rare, so the churn class is oversampled to a 1:2 ratio, giving 5,711 samples of which 1,924 are churners."
    >
      <ProjectList items={STAGES} />
      <ProjectFigure
        src={`${IMAGES}/mining-stream.jpg`}
        width={732}
        height={496}
        size="small"
        label="Figure 2."
        alt="Data mining stream that balances and partitions the data, then trains decision tree, neural network, and k-nearest neighbor models to predict churn"
      >
        The data mining process in the software environment: balancing,
        partitioning, and training the three churn classifiers.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="results"
      title="Results"
      lede="Three classifiers predict churn. k-nearest neighbor gives the best overall accuracy, and its lift in the top 10% of customers stays above 2.5, well past the acceptance threshold of 2."
    >
      <ProjectTable
        compact
        label="Table 1."
        caption="Comparison of the classification methods."
      >
        <TableHead labels={['Method', 'Lift (top 20%)', 'Accuracy']} />
        <TableRows
          rows={CLASSIFIERS}
          best={(row, column) => row === 2 && column === 1}
        />
      </ProjectTable>
      <ProjectFigure
        src={`${IMAGES}/lift.jpg`}
        width={770}
        height={395}
        size="small"
        label="Figure 3."
        alt="Lift curve of the k-nearest neighbor churn model, starting near 3 and falling to 1 as the percentile grows"
      >
        Lift diagram of the k-nearest neighbor method.
      </ProjectFigure>
      <ProjectTable
        compact
        label="Table 2."
        caption="Customer lifetime value segments and the share of customers in each."
      >
        <TableHead labels={['CLV segment', 'Customers']} />
        <TableRows rows={SEGMENTS} />
      </ProjectTable>
      <ProjectFigure
        src={`${IMAGES}/clv-segments.jpg`}
        width={770}
        height={399}
        size="small"
        label="Figure 4."
        alt="Pie chart of customer lifetime value segments: 40%, 45%, 10%, and 5%"
      >
        Lifetime value of customers by segment.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection id="takeaways" title="Takeaways">
      <ProjectList items={TAKEAWAYS} />
    </ProjectSection>
  </ProjectPage>
);

export default CustomerClv;
