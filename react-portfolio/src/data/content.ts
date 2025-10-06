import type { Publication, EducationItem, ResearchItem, TeachingItem, NewsItem, AwardItem, ResearchInterest } from '../types';

export const publications: Publication[] = [
  {
    title: 'Q-Learning-Based Task Scheduling Scheme to Enhance Energy Consumption and QoS in IoT Environments',
    venue: 'Sustainable Computing: Informatics and Systems Journal',
    year: '2025',
    status: 'review'
  },
  {
    title: 'Controller placement in software-defined networks using reinforcement learning and metaheuristics',
    venue: 'Cluster Computing: The Journal of Networks, Software Tools and Applications',
    year: '2025',
    status: 'published',
    link: 'https://doi.org/10.1007/s10586-025-05331-y',
    pdfLink: 'assets/docs/publications/s10586-025-05331-y.pdf',
    bibtexId: 'Sirjani2025'
  },
  {
    title: 'Optimizing Task Scheduling in Fog Computing with Deadline Awareness',
    venue: 'arXiv preprint',
    year: '2024',
    status: 'accepted',
    link: 'https://doi.org/10.48550/arXiv.2509.07378',
    pdfLink: 'assets/docs/publications/2509.07378v1.pdf',
    bibtexId: 'arXiv2509.07378'
  },
  {
    title: 'Data mining and cloud computing for customer pattern analysis',
    venue: '10th International Conference on Artificial Intelligence and Robotics 2024',
    year: '2024',
    status: 'published',
    link: 'https://doi.org/10.1109/QICAR61538.2024.10496623',
    pdfLink: 'assets/docs/publications/QICAR61538.2024.10496623.pdf',
    bibtexId: '10496623'
  },
  {
    title: 'SecVanet: provably secure authentication protocol for sending emergency events in VANET',
    venue: '10th International Conference on Information and Knowledge Technology 2023',
    year: '2023',
    status: 'published',
    link: 'https://doi.org/10.1109/IKT62039.2023.10433027',
    pdfLink: 'assets/docs/publications/IKT62039.2023.10433027.pdf',
    bibtexId: '10433027'
  },
  {
    title: 'A Comparative Evaluation of Machine Learning Algorithms for IDS in IoT network',
    venue: '14th International Conference on Information and Knowledge Technology 2023',
    year: '2023',
    status: 'published',
    link: 'https://doi.org/10.1109/IKT62039.2023.10433047',
    pdfLink: 'assets/docs/publications/IKT62039.2023.10433047.pdf',
    bibtexId: '10433047'
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
    description: 'Optimizing Task Scheduling in Fog Computing with Deadline Awareness accepted at CSCloud 2025 Conference.'
  },
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
  { icon: 'fa-network-wired', name: 'Internet of Things' },
  { icon: 'fa-microchip', name: 'Tiny AI' },
  { icon: 'fa-server', name: 'Edge AI' },
  { icon: 'fa-cogs', name: 'Embedded Systems' },
  { icon: 'fa-bolt', name: 'Energy Harvesting' },
  { icon: 'fa-sync-alt', name: 'Intermittent<br>Computing' }
];
