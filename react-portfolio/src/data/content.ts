import type { Publication, EducationItem, ResearchItem, TeachingItem, NewsItem, AwardItem, ResearchInterest } from '../types';
import { faNetworkWired, faMicrochip, faServer, faGears, faBolt, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const iconMap: Record<string, IconDefinition> = {
  faNetworkWired,
  faMicrochip,
  faServer,
  faGears,
  faBolt,
  faArrowsRotate
};

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.json();
};

export const fetchPublications = () => fetchData<Publication[]>('/assets/data/publications.json');
export const fetchEducation = () => fetchData<EducationItem[]>('/assets/data/education.json');
export const fetchResearchExperience = () => fetchData<ResearchItem[]>('/assets/data/research.json');
export const fetchTeaching = () => fetchData<TeachingItem[]>('/assets/data/teaching.json');
export const fetchNews = () => fetchData<NewsItem[]>('/assets/data/news.json');
export const fetchAwards = () => fetchData<AwardItem[]>('/assets/data/awards.json');

export const fetchResearchInterests = async (): Promise<ResearchInterest[]> => {
  const data = await fetchData<any[]>('/assets/data/research-interests.json');
  return data.map((item: any) => ({
    ...item,
    icon: iconMap[item.icon]
  }));
};

export const publications: Publication[] = [];
export const education: EducationItem[] = [];
export const researchExperience: ResearchItem[] = [];
export const teaching: TeachingItem[] = [];
export const news: NewsItem[] = [];
export const awards: AwardItem[] = [];
export const researchInterests: ResearchInterest[] = [];
