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
  {name: 'Mostafa Sadeghi', marks: '2'},
  {name: 'Mohammad Sadegh Sirjani', marks: '1'},
];

const AFFILIATIONS = [
  'Department of Computer, Ferdowsi University of Mashhad, Mashhad, Iran',
  'Department of Computer, Islamic Azad University, Zavareh, Iran',
];

const IMAGES = '/assets/images/iot-ids';

const SECTIONS = [
  {id: 'motivation', label: 'Motivation'},
  {id: 'abstract', label: 'Abstract'},
  {id: 'method', label: 'Method'},
  {id: 'results', label: 'Results'},
  {id: 'takeaways', label: 'Takeaways'},
];

const CLASSIFIERS = [
  <>
    <strong>Logistic regression.</strong> A linear baseline that models the
    probability of an attack.
  </>,
  <>
    <strong>Random forest.</strong> An ensemble of decision trees that votes on
    each flow.
  </>,
  <>
    <strong>k-nearest neighbors.</strong> Labels a flow by its closest
    neighbors; robust on small or imbalanced data.
  </>,
  <>
    <strong>Support vector machine.</strong> Learns non-linear boundaries
    between normal and attack traffic.
  </>,
  <>
    <strong>XGBoost.</strong> Gradient-boosted decision trees.
  </>,
];

const LEADERS = [
  ['Accuracy', 'XGBoost · 87%', 'KNN, SVM · 84%'],
  ['Precision', 'Logistic regression · 90%', 'KNN, XGBoost, SVM · 79%–82%'],
  ['Recall', 'XGBoost · 90%', 'SVM, KNN · 85%–86%'],
  ['F1 score', 'KNN · 88%', 'XGBoost · 87%, SVM · 85%'],
];

const TAKEAWAYS = [
  'XGBoost gives the highest accuracy (87%) and recall (90%) on UNSW-NB15.',
  'Logistic regression has the best precision (90%), and KNN the best F1 score (88%).',
  'No single classifier wins on every metric, so dependable IoT intrusion detection calls for ensemble or combined approaches.',
  'Reducing both false positives and missed detections remains the key open problem.',
];

const bibtex = bibtexData['10433047'].bibtex;

const IotIds = () => (
  <ProjectPage
    title="A Comparative Evaluation of Machine Learning Algorithms for IDS in IoT Network"
    authors={AUTHORS}
    affiliation={AFFILIATIONS}
    venue="2023 14th International Conference on Information and Knowledge Technology (IKT), pp. 168–174"
    pdf="/assets/docs/publications/IKT62039.2023.10433047.pdf"
    link={{
      label: 'DOI',
      href: 'https://doi.org/10.1109/IKT62039.2023.10433047',
    }}
    bibtex={bibtex}
    sections={SECTIONS}
  >
    <ProjectSection
      id="motivation"
      title="Catching Attacks in IoT Traffic"
      lede="Intrusion detection systems are a second line of defense that watch network traffic for malicious activity. Traditional IDS raise too many false alarms and react slowly; machine learning promises higher detection rates with fewer false alarms."
    >
      <ProjectFigure
        src={`${IMAGES}/ids-activity.jpg`}
        width={797}
        height={640}
        size="small"
        label="Figure 1."
        alt="IDS activity diagram with monitoring, anomaly-based and signature-based checks, filter, analyzer, audit, intelligent, and update agents, ending in dropping packets, blocking the source, and raising an alarm"
      >
        Activity diagram of an intrusion detection system.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection id="abstract" title="Abstract">
      <p className="project-abstract">
        With the increasing Internet use, network security has become essential
        due to the rise in cyber-attacks on network services. To detect these
        attacks, a robust Intrusion Detection System (IDS) is required.
        Traditional IDS face challenges like high false alert rates and slow
        real-time attack detection. Machine learning (ML) can improve this
        situation, providing a low False Alarm Rate and high detection rates.
        This research used five ML methods (Logistic Regression, Random Forest,
        k-Nearest Neighbors, Support Vector Machine, and XGBoost) to classify
        the <strong>UNSW-NB15</strong> dataset. The goal is to evaluate the
        performance of various machine learning classifiers in detecting attacks
        for Internet of Things (IoT) network intrusion detection. The study
        highlighted the importance of further research to reduce false positives
        and negatives. To evaluate these classifiers, precision, accuracy,
        recall, and F1 score were used. The results show that XGBoost achieved
        the highest accuracy and recall. However, only some algorithms performed
        perfectly in all aspects, suggesting the need for diverse detection
        strategies. Future research should focus on developing comprehensive
        systems and ensemble approaches to minimize false alerts and missed
        detections.
      </p>
    </ProjectSection>

    <ProjectSection
      id="method"
      title="Method"
      lede="Five classic classifiers are trained on UNSW-NB15, a modern IDS benchmark with real normal traffic and current attack scenarios from the IXIA PerfectStorm tool, described by 49 features. Features are normalized to [0, 1], and the experiments run in Google Colab."
    >
      <ProjectList items={CLASSIFIERS} />
      <ProjectFigure
        src={`${IMAGES}/pipeline.jpg`}
        width={718}
        height={318}
        size="small"
        label="Figure 2."
        alt="Pipeline from dataset through window selection, feature extraction, feature selection, classification, and k-fold validation, repeating until accuracy is acceptable"
      >
        Evaluation pipeline: feature extraction and selection, classification,
        and k-fold validation until accuracy is acceptable.
      </ProjectFigure>
    </ProjectSection>

    <ProjectSection
      id="results"
      title="Results"
      lede="Each classifier leads on a different metric. Overall, XGBoost, KNN, and SVM are the top three across accuracy, precision, recall, and F1 score."
    >
      <ProjectFigure
        src={`${IMAGES}/comparison.jpg`}
        width={898}
        height={582}
        size="small"
        label="Figure 3."
        alt="Bar chart comparing accuracy, precision, recall, and F1 score of random forest, KNN, XGBoost, logistic regression, and SVM"
      >
        Comparison of the five algorithms on accuracy, precision, recall, and F1
        score.
      </ProjectFigure>
      <ProjectTable
        compact
        label="Table 1."
        caption="Best and runner-up classifiers per metric on UNSW-NB15."
      >
        <TableHead labels={['Metric', 'Best', 'Runner-up']} />
        <TableRows rows={LEADERS} best={(_, column) => column === 0} />
      </ProjectTable>
    </ProjectSection>

    <ProjectSection id="takeaways" title="Takeaways">
      <ProjectList items={TAKEAWAYS} />
    </ProjectSection>
  </ProjectPage>
);

export default IotIds;
