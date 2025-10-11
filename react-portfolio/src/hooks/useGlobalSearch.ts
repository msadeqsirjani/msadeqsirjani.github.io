import { useState, useEffect } from 'react';
import { publications, education, researchExperience, teaching, news, awards } from '../data/content';
import type { Publication, EducationItem, ResearchItem, TeachingItem, NewsItem, AwardItem } from '../types';

interface SearchResults {
  publications: Publication[];
  education: EducationItem[];
  research: ResearchItem[];
  teaching: TeachingItem[];
  news: NewsItem[];
  awards: AwardItem[];
}

export const useGlobalSearch = (query: string) => {
  const [results, setResults] = useState<SearchResults>({
    publications: [],
    education: [],
    research: [],
    teaching: [],
    news: [],
    awards: []
  });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults({
        publications: [],
        education: [],
        research: [],
        teaching: [],
        news: [],
        awards: []
      });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce search
    const timeoutId = setTimeout(() => {
      const searchTerm = query.toLowerCase().trim();

      // Search publications
      const matchedPublications = publications.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm) ||
        pub.venue.toLowerCase().includes(searchTerm) ||
        pub.authors?.toLowerCase().includes(searchTerm) ||
        pub.abstract?.toLowerCase().includes(searchTerm) ||
        pub.year.toLowerCase().includes(searchTerm)
      );

      // Search education
      const matchedEducation = education.filter(edu =>
        edu.degree.toLowerCase().includes(searchTerm) ||
        edu.university.toLowerCase().includes(searchTerm) ||
        edu.duration.toLowerCase().includes(searchTerm)
      );

      // Search research experience
      const matchedResearch = researchExperience.filter(res =>
        res.position.toLowerCase().includes(searchTerm) ||
        res.lab.toLowerCase().includes(searchTerm) ||
        res.duration.toLowerCase().includes(searchTerm) ||
        res.description.some(desc => desc.toLowerCase().includes(searchTerm))
      );

      // Search teaching
      const matchedTeaching = teaching.filter(teach =>
        teach.course.toLowerCase().includes(searchTerm) ||
        teach.instructor.toLowerCase().includes(searchTerm) ||
        teach.university.toLowerCase().includes(searchTerm) ||
        teach.date.toLowerCase().includes(searchTerm)
      );

      // Search news
      const matchedNews = news.filter(newsItem =>
        newsItem.description.toLowerCase().includes(searchTerm) ||
        newsItem.date.toLowerCase().includes(searchTerm)
      );

      // Search awards
      const matchedAwards = awards.filter(award =>
        award.description.toLowerCase().includes(searchTerm) ||
        award.date.toLowerCase().includes(searchTerm)
      );

      setResults({
        publications: matchedPublications,
        education: matchedEducation,
        research: matchedResearch,
        teaching: matchedTeaching,
        news: matchedNews,
        awards: matchedAwards
      });

      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { results, isSearching };
};
