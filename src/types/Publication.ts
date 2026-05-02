export interface Publication {
  title: string;
  venue: string;
  year: string;
  status: 'published' | 'accepted' | 'review' | 'arxiv';
  authors?: string;
  link?: string;
  pdfLink?: string;
  bibtexId?: string;
  abstract?: string;
  downloads?: number;
  citations?: number;
  keywords?: string[];
}
