export interface Publication {
  title: string;
  venue: string;
  year: string;
  status: 'published' | 'accepted' | 'review';
  link?: string;
  pdfLink?: string;
  bibtexId?: string;
  abstract?: string;
  downloads?: number;
  citations?: number;
}

export interface EducationItem {
  degree: string;
  university: string;
  duration: string;
  gpa: string;
  current?: boolean;
}

export interface ResearchItem {
  position: string;
  lab: string;
  duration: string;
  description: string[];
  current?: boolean;
}

export interface TeachingItem {
  course: string;
  instructor: string;
  university: string;
  date: string;
}

export interface NewsItem {
  date: string;
  description: string;
}

export interface AwardItem {
  date: string;
  description: string;
}

export interface ResearchInterest {
  icon: string;
  name: string;
}
