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

const emptyResults: SearchResults = {
  publications: [],
  education: [],
  research: [],
  teaching: [],
  news: [],
  awards: []
};

export const useGlobalSearch = (query: string) => {
  const [results, setResults] = useState<SearchResults>(emptyResults);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults(emptyResults);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      const searchTerm = query.toLowerCase().trim();

      const matchedPublications = publications.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm) ||
        pub.venue.toLowerCase().includes(searchTerm) ||
        pub.authors?.toLowerCase().includes(searchTerm) ||
        pub.abstract?.toLowerCase().includes(searchTerm) ||
        pub.year.toLowerCase().includes(searchTerm)
      );

      const matchedEducation = education.filter(edu =>
        edu.degree.toLowerCase().includes(searchTerm) ||
        edu.university.toLowerCase().includes(searchTerm) ||
        edu.duration.toLowerCase().includes(searchTerm)
      );

      const matchedResearch = researchExperience.filter(res =>
        res.position.toLowerCase().includes(searchTerm) ||
        res.lab.toLowerCase().includes(searchTerm) ||
        res.duration.toLowerCase().includes(searchTerm) ||
        res.description.some(desc => desc.toLowerCase().includes(searchTerm))
      );

      const matchedTeaching = teaching.filter(teach =>
        teach.course.toLowerCase().includes(searchTerm) ||
        teach.instructor.toLowerCase().includes(searchTerm) ||
        teach.university.toLowerCase().includes(searchTerm) ||
        teach.date.toLowerCase().includes(searchTerm)
      );

      const matchedNews = news.filter(newsItem =>
        newsItem.description.toLowerCase().includes(searchTerm) ||
        newsItem.date.toLowerCase().includes(searchTerm)
      );

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
