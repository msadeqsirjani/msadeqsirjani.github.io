import type { Publication, EducationItem, ResearchItem, TeachingItem, NewsItem, AwardItem, ResearchInterest } from '../types';
import { faNetworkWired, faMicrochip, faServer, faGears, faBolt, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

export const publications: Publication[] = [
  {
    title: 'Q-Learning-Based Task Scheduling Scheme to Enhance Energy Consumption and QoS in IoT Environments',
    venue: 'Sustainable Computing: Informatics and Systems Journal',
    year: '2025',
    status: 'review',
    authors: 'Mohammad Sadegh Sirjani, Somayeh Sobati-Moghadam'
  },
  {
    title: 'Controller placement in software-defined networks using reinforcement learning and metaheuristics',
    venue: 'Cluster Computing: The Journal of Networks, Software Tools and Applications',
    year: '2025',
    status: 'published',
    authors: 'Mohammad Sadegh Sirjani, Ali Maleki, Amir Pakmehr, Maedeh Abedini Bagha, Ali Ghaffari, Ali Asghar Pour Haji Kazem',
    link: 'https://doi.org/10.1007/s10586-025-05331-y',
    pdfLink: 'assets/docs/publications/s10586-025-05331-y.pdf',
    bibtexId: 'Sirjani2025',
    abstract: 'Software-Defined Networking (SDN) separates the control and data layers, offering scalable and flexible network management. A key challenge is the optimal placement of SDN controllers, which has been shown to be an NP-hard problem. Existing methods often struggle to balance multiple performance objectives effectively. This paper presents a novel two-step approach for SDN controller placement. First, Deep Q-Learning (DQL) is employed to find an initial solution by learning from the network environment. Then, the Bedbug-GLA metaheuristic algorithm refines this solution. We evaluate our method using four real-world network topologies and compare it with eight state-of-the-art algorithms. Experimental results demonstrate that our approach achieves an 18% improvement in controller load, a 69% reduction in congested overload, and a 20% decrease in energy consumption.',
    citations: 0,
    downloads: 145
  },
  {
    title: 'Optimizing Task Scheduling in Fog Computing with Deadline Awareness',
    venue: 'arXiv preprint',
    year: '2025',
    status: 'arxiv',
    authors: 'Mohammad Sadegh Sirjani, Somayeh Sobati-Moghadam',
    link: 'https://doi.org/10.48550/arXiv.2509.07378',
    pdfLink: 'assets/docs/publications/2509.07378v2.pdf',
    bibtexId: 'arXiv2509.07378',
    abstract: 'The Internet of Things (IoT) has become a fundamental component of modern smart applications, particularly in time-sensitive scenarios such as healthcare monitoring and autonomous systems. Many IoT applications require guaranteed response times to meet stringent deadlines, making efficient task scheduling a critical challenge. Fog computing addresses these needs by positioning computational resources closer to end users. However, existing task scheduling approaches often fail to fully consider deadline awareness, which can lead to performance degradation in time-critical environments. In this paper, we propose a novel Reinforcement Learning-based Improved GEO (RIGEO) algorithm that combines improved Geometric Optimization (IGEO) with Reinforcement Learning (RL) to enhance task scheduling performance in fog computing environments. The key innovation is the integration of deadline awareness into the optimization framework, which significantly reduces task failures in delay-sensitive applications. Through comprehensive simulation experiments using iFogSim, we evaluate RIGEO against several state-of-the-art algorithms, including ACO-IWD, SB-PSO, EEMR, and NSGA-III. Our results demonstrate substantial performance improvements, with RIGEO achieving a 29% reduction in energy consumption, an 86% improvement in average response time, and a 19% reduction in deadline violations.',
    citations: 0,
    downloads: 187
  },
  {
    title: 'Data mining and cloud computing for customer pattern analysis',
    venue: '10th International Conference on Artificial Intelligence and Robotics 2024',
    year: '2024',
    status: 'published',
    authors: 'Mohammad Sadegh Sirjani, Seyed Amir Mousavi, Mostafa Sadeghi',
    link: 'https://doi.org/10.1109/QICAR61538.2024.10496623',
    pdfLink: 'assets/docs/publications/QICAR61538.2024.10496623.pdf',
    bibtexId: '10496623',
    abstract: 'In today\'s competitive business landscape, understanding customer behavior is crucial for organizational success. This paper explores the integration of cloud computing infrastructure, software engineering methodologies, and data mining techniques to analyze customer patterns and optimize the customer lifecycle. We present a comprehensive framework that leverages cloud-based resources to process large-scale customer data efficiently. Our approach combines various data mining algorithms to extract meaningful insights about customer preferences, purchasing patterns, and engagement behaviors. The proposed system demonstrates how organizations can utilize these technologies to enhance customer relationship management, improve service delivery, and make data-driven decisions.',
    citations: 2,
    downloads: 156
  },
  {
    title: 'SecVanet: provably secure authentication protocol for sending emergency events in VANET',
    venue: '10th International Conference on Information and Knowledge Technology 2023',
    year: '2023',
    status: 'published',
    authors: 'Seyed Amir Mousavi, Mohammad Sadegh Sirjani, Seyyed Javad Bozorg Zadeh Razavi, Morteza Nikooghadam',
    link: 'https://doi.org/10.1109/IKT62039.2023.10433027',
    pdfLink: 'assets/docs/publications/IKT62039.2023.10433027.pdf',
    bibtexId: '10433027',
    abstract: 'Vehicular Ad Hoc Networks (VANETs) play a vital role in intelligent transportation systems by enabling vehicle-to-vehicle and vehicle-to-infrastructure communications. However, the transmission of emergency messages in VANETs faces significant security challenges, including authentication, privacy preservation, and resistance to various attacks. This paper presents SecVanet, a provably secure authentication protocol specifically designed for emergency event communication in VANET environments. Our protocol ensures secure message transmission while maintaining vehicle privacy and preventing unauthorized access. We formally verify the security properties of SecVanet using the Scyther verification tool, demonstrating its resistance to common attacks such as replay attacks, man-in-the-middle attacks, and impersonation attacks. Performance analysis shows that SecVanet achieves lower computational complexity compared to existing protocols while maintaining robust security guarantees.',
    citations: 10,
    downloads: 98
  },
  {
    title: 'A Comparative Evaluation of Machine Learning Algorithms for IDS in IoT network',
    venue: '14th International Conference on Information and Knowledge Technology 2023',
    year: '2023',
    status: 'published',
    authors: 'Seyed Amir Mousavi, Mostafa Sadeghi, Mohammad Sadegh Sirjani',
    link: 'https://doi.org/10.1109/IKT62039.2023.10433047',
    pdfLink: 'assets/docs/publications/IKT62039.2023.10433047.pdf',
    bibtexId: '10433047',
    abstract: 'The rapid proliferation of Internet of Things (IoT) devices has introduced significant security challenges, making Intrusion Detection Systems (IDS) essential for protecting IoT networks from cyber threats. Machine learning algorithms have emerged as promising solutions for developing effective IDS. However, selecting the most appropriate algorithm remains a challenge due to varying performance characteristics across different attack scenarios. This paper presents a comprehensive comparative evaluation of five popular machine learning algorithms: Logistic Regression (LR), Random Forest (RF), K-Nearest Neighbors (KNN), Support Vector Machine (SVM), and XGBoost for IoT intrusion detection. We conduct extensive experiments using the UNSW-NB15 dataset, which contains diverse network attack patterns. Our evaluation considers multiple performance metrics including accuracy, precision, recall, and F1-score. The experimental results demonstrate that XGBoost achieves the highest overall accuracy and recall rates, making it particularly suitable for IoT-based intrusion detection systems.',
    citations: 1,
    downloads: 124
  }
];

export const education: EducationItem[] = [
  {
    degree: 'Ph.D., Computer Science',
    university: 'University of Texas at San Antonio, USA',
    duration: 'Jan. 2025 - Present',
    gpa: 'GPA: 4.0 / 4.0',
    current: true
  },
  {
    degree: 'B.Sc., Computer Engineering',
    university: 'Ferdowsi University of Mashhad, Iran',
    duration: 'Sep. 2018 - Feb. 2024',
    gpa: 'GPA: 3.02 / 4.0 (16.52 / 20)'
  }
];

export const researchExperience: ResearchItem[] = [
  {
    position: 'Research Assistant',
    lab: 'ASIC Laboratory, USA',
    duration: 'Jan. 2025 - Present',
    description: [
      'Developing energy-efficient neural network accelerators for edge AI applications on IoT devices.',
      'Investigating ultra-low-power ML inference using hardware-software co-design approaches.'
    ],
    current: true
  },
  {
    position: 'Research Assistant',
    lab: 'Software Quality Laboratory, Iran',
    duration: 'Aug. 2022 - Jan. 2024',
    description: [
      'Analyzed Java application execution traces using XRebel and JRebel for software enhancement.',
      'Developed code analysis techniques to identify class, interface, and enum connections.',
      'Built tool for recommending microservice migration strategies from monolithic codebases.'
    ]
  },
  {
    position: 'Research Assistant',
    lab: 'Web Technology Laboratory, Iran',
    duration: 'Dec. 2023 - Aug. 2024',
    description: [
      'Designed database structure and web-based API for psychological survey data collection.',
      'Integrated LLMs to generate enhanced client assessment reports from survey data.',
      'Successfully deployed production application through iterative prompt engineering refinements.'
    ]
  }
];

export const teaching: TeachingItem[] = [
  {
    course: 'Fundamentals of Operating Systems',
    instructor: 'Instructor: Dr. Sam Silvestro',
    university: 'University of Texas at San Antonio',
    date: 'Fall 2025'
  },
  {
    course: 'Data Science',
    instructor: 'Instructor: Dr. Amin Sahba',
    university: 'University of Texas at San Antonio',
    date: 'Summer 2025'
  },
  {
    course: 'Computer Organization',
    instructor: 'Instructor: Dr. Subhasish Das',
    university: 'University of Texas at San Antonio',
    date: 'Summer 2025'
  },
  {
    course: 'Fundamentals of Operating Systems',
    instructor: 'Instructor: Dr. Mimi Xie',
    university: 'University of Texas at San Antonio',
    date: 'Spring 2025'
  },
  {
    course: 'Fundamentals of Cloud Computing',
    instructor: 'Instructor: Dr. Somayeh Sobati-Moghadam',
    university: 'Ferdowsi University of Mashhad',
    date: 'Spring 2024'
  },
  {
    course: 'Principles of Compiler Design',
    instructor: 'Instructor: Dr. Haleh Amintoosi',
    university: 'Ferdowsi University of Mashhad',
    date: 'Fall 2023'
  },
  {
    course: 'Fundamentals of Data Mining',
    instructor: 'Instructor: Dr. Behshid Behkamal',
    university: 'Ferdowsi University of Mashhad',
    date: 'Fall 2023'
  }
];

export const news: NewsItem[] = [
  {
    date: 'Sep. 2025',
    description: 'SDN controller placement paper published in Cluster Computing Journal.'
  },
  {
    date: 'Jun. 2025',
    description: 'Won first place at DAC 2025 for energy-efficient AI healthcare research presentation.'
  },
  {
    date: 'Jun. 2025',
    description: 'Presented Tiny AI research at DAC 2025 and networked with industry leaders.'
  },
  {
    date: 'May 2025',
    description: 'Research on reinforcement learning for SDN accepted at Cluster Computing Journal.'
  },
  {
    date: 'Jan. 2025',
    description: 'Began Ph.D. in Computer Science at University of Texas at San Antonio, focusing on IoT and Edge AI systems.'
  }
];

export const awards: AwardItem[] = [
  {
    date: 'Jun. 2025',
    description: 'First place winner at DAC 2025 Video Presentation Contest for energy-efficient AI research.'
  },
  {
    date: 'Jun. 2025',
    description: 'Selected as DAC Young Fellow for outstanding contributions to design automation.'
  }
];

export const researchInterests: ResearchInterest[] = [
  { icon: faNetworkWired, name: 'Internet of Things' },
  { icon: faMicrochip, name: 'Tiny AI' },
  { icon: faServer, name: 'Edge AI' },
  { icon: faGears, name: 'Embedded Systems' },
  { icon: faBolt, name: 'Energy Harvesting' },
  { icon: faArrowsRotate, name: 'Intermittent<br>Computing' }
];
