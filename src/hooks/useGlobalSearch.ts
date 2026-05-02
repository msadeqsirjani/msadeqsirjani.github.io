import { useState, useEffect, useRef } from 'react';
import { fetchPublications, fetchEducation, fetchResearchExperience, fetchTeaching, fetchNews, fetchAwards } from '../data/content';
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

interface AllData {
  publications: Publication[];
  education: EducationItem[];
  researchExperience: ResearchItem[];
  teaching: TeachingItem[];
  news: NewsItem[];
  awards: AwardItem[];
}

export const useGlobalSearch = (query: string, enabled: boolean) => {
  const [results, setResults] = useState<SearchResults>(emptyResults);
  const [isSearching, setIsSearching] = useState(false);
  const [allData, setAllData] = useState<AllData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hydrateAttemptedRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (hydrateAttemptedRef.current) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const loadAllData = async () => {
      setIsLoading(true);
      try {
        const [pubs, edu, research, teach, newsItems, awardItems] = await Promise.all([
          fetchPublications(),
          fetchEducation(),
          fetchResearchExperience(),
          fetchTeaching(),
          fetchNews(),
          fetchAwards()
        ]);

        if (cancelled) return;

        hydrateAttemptedRef.current = true;
        setAllData({
          publications: pubs,
          education: edu,
          researchExperience: research,
          teaching: teach,
          news: newsItems,
          awards: awardItems
        });
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Failed to load data for global search:', error);
        }
        if (!cancelled) {
          hydrateAttemptedRef.current = true;
          setAllData({
            publications: [],
            education: [],
            researchExperience: [],
            teaching: [],
            news: [],
            awards: []
          });
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadAllData();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !allData || isLoading) {
      return;
    }

    if (!query.trim()) {
      setResults(emptyResults);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      const searchTerm = query.toLowerCase().trim();

      const matchedPublications = allData.publications.filter(pub =>
        pub.title.toLowerCase().includes(searchTerm) ||
        pub.venue.toLowerCase().includes(searchTerm) ||
        pub.authors?.toLowerCase().includes(searchTerm) ||
        pub.abstract?.toLowerCase().includes(searchTerm) ||
        pub.year.toLowerCase().includes(searchTerm)
      );

      const matchedEducation = allData.education.filter(edu =>
        edu.degree.toLowerCase().includes(searchTerm) ||
        edu.university.toLowerCase().includes(searchTerm) ||
        edu.duration.toLowerCase().includes(searchTerm)
      );

      const matchedResearch = allData.researchExperience.filter(res =>
        res.position.toLowerCase().includes(searchTerm) ||
        res.lab.toLowerCase().includes(searchTerm) ||
        res.duration.toLowerCase().includes(searchTerm) ||
        res.description.some(desc => desc.toLowerCase().includes(searchTerm))
      );

      const matchedTeaching = allData.teaching.filter(teach =>
        teach.course.toLowerCase().includes(searchTerm) ||
        teach.instructor.toLowerCase().includes(searchTerm) ||
        teach.university.toLowerCase().includes(searchTerm) ||
        teach.date.toLowerCase().includes(searchTerm)
      );

      const matchedNews = allData.news.filter(newsItem =>
        newsItem.description.toLowerCase().includes(searchTerm) ||
        newsItem.date.toLowerCase().includes(searchTerm)
      );

      const matchedAwards = allData.awards.filter(award =>
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
  }, [query, allData, isLoading, enabled]);

  const busy = enabled && isLoading;
  return { results, isSearching: isSearching || busy };
};
