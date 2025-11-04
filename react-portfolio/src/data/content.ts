import type { Publication, EducationItem, ResearchItem, TeachingItem, NewsItem, AwardItem, ResearchInterest } from '../types';
import { faNetworkWired, faMicrochip, faServer, faGears, faBolt, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

// Icon mapping for research interests
const iconMap: { [key: string]: any } = {
  faNetworkWired,
  faMicrochip,
  faServer,
  faGears,
  faBolt,
  faArrowsRotate
};

// Fetch data from JSON files
export const fetchPublications = async (): Promise<Publication[]> => {
  const response = await fetch('/assets/data/publications.json');
  return response.json();
};

export const fetchEducation = async (): Promise<EducationItem[]> => {
  const response = await fetch('/assets/data/education.json');
  return response.json();
};

export const fetchResearchExperience = async (): Promise<ResearchItem[]> => {
  const response = await fetch('/assets/data/research.json');
  return response.json();
};

export const fetchTeaching = async (): Promise<TeachingItem[]> => {
  const response = await fetch('/assets/data/teaching.json');
  return response.json();
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  const response = await fetch('/assets/data/news.json');
  return response.json();
};

export const fetchAwards = async (): Promise<AwardItem[]> => {
  const response = await fetch('/assets/data/awards.json');
  return response.json();
};

export const fetchResearchInterests = async (): Promise<ResearchInterest[]> => {
  const response = await fetch('/assets/data/research-interests.json');
  const data = await response.json();
  return data.map((item: any) => ({
    ...item,
    icon: iconMap[item.icon]
  }));
};

// Default exports for initial render (empty arrays)
export const publications: Publication[] = [];
export const education: EducationItem[] = [];
export const researchExperience: ResearchItem[] = [];
export const teaching: TeachingItem[] = [];
export const news: NewsItem[] = [];
export const awards: AwardItem[] = [];
export const researchInterests: ResearchInterest[] = [];
