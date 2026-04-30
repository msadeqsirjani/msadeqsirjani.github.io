export interface EducationItem {
  degree: string;
  university: string;
  universityName?: string;
  duration: string;
  gpa: string;
  universityUrl?: string;
  /** Public URL path under /public, e.g. /assets/logos/ut-san-antonio.svg */
  logo?: string;
  current?: boolean;
}
