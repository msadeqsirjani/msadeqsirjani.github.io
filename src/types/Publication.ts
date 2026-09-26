export interface Publication {
  title: string;
  venue: string;
  award?: string;
  year: string;
  status: 'published' | 'accepted' | 'review' | 'arxiv';
  visible: boolean;
  authors?: string;
  link?: string;
  pdfLink?: string;
  projectPage?: string;
  github?: string;
  bibtexId?: string;
  abstract?: string;
  downloads?: number;
  citations?: number;
  keywords?: string[];
}
