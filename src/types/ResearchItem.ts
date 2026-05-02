export interface ResearchItem {
  position: string;
  lab: string;
  university?: string;
  labUrl?: string;
  logo?: string;
  duration: string;
  description: string[];
  current?: boolean;
}
