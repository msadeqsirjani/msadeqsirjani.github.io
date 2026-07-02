export interface ResearchItem {
  position: string;
  lab: string;
  university?: string;
  labUrl?: string;
  logo?: string;
  advisor?: string;
  advisorUrl?: string;
  duration: string;
  description: string[];
  current?: boolean;
}
