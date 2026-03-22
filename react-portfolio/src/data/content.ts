import type { Publication, EducationItem, ResearchItem, TeachingItem, NewsItem, AwardItem, ResearchInterest } from '../types';
import { faNetworkWired, faMicrochip, faServer, faGears, faBolt, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import publicationsData from './publications.json';
import educationData from './education.json';
import researchData from './research.json';
import teachingData from './teaching.json';
import newsData from './news.json';
import awardsData from './awards.json';
import researchInterestsData from './research-interests.json';

const iconMap: Record<string, IconDefinition> = {
  faNetworkWired,
  faMicrochip,
  faServer,
  faGears,
  faBolt,
  faArrowsRotate
};

export const fetchPublications = (): Promise<Publication[]> =>
  Promise.resolve(publicationsData as Publication[]);

export const fetchEducation = (): Promise<EducationItem[]> =>
  Promise.resolve(educationData as EducationItem[]);

export const fetchResearchExperience = (): Promise<ResearchItem[]> =>
  Promise.resolve(researchData as ResearchItem[]);

export const fetchTeaching = (): Promise<TeachingItem[]> =>
  Promise.resolve(teachingData as TeachingItem[]);

export const fetchNews = (): Promise<NewsItem[]> =>
  Promise.resolve(newsData as NewsItem[]);

export const fetchAwards = (): Promise<AwardItem[]> =>
  Promise.resolve(awardsData as AwardItem[]);

export const fetchResearchInterests = (): Promise<ResearchInterest[]> => {
  const data = (researchInterestsData as any[]).map((item: any) => ({
    ...item,
    icon: iconMap[item.icon]
  }));
  return Promise.resolve(data);
};

export const publications = publicationsData as Publication[];
export const education = educationData as EducationItem[];
export const researchExperience = researchData as ResearchItem[];
export const teaching = teachingData as TeachingItem[];
export const news = newsData as NewsItem[];
export const awards = awardsData as AwardItem[];
export const researchInterests = (researchInterestsData as any[]).map((item: any) => ({
  ...item,
  icon: iconMap[item.icon]
})) as ResearchInterest[];
