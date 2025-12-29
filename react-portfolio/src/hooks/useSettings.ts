import { useState, useEffect } from 'react';

interface DisplayLimitConfig {
  initial: number;
  showMoreEnabled: boolean;
}

interface Settings {
  displayLimits: {
    publications: DisplayLimitConfig;
    news: DisplayLimitConfig;
    teaching: DisplayLimitConfig;
    research: DisplayLimitConfig;
    awards: DisplayLimitConfig;
  };
}

const defaultSettings: Settings = {
  displayLimits: {
    publications: { initial: 5, showMoreEnabled: true },
    news: { initial: 5, showMoreEnabled: true },
    teaching: { initial: 5, showMoreEnabled: false },
    research: { initial: 5, showMoreEnabled: false },
    awards: { initial: 5, showMoreEnabled: false },
  },
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/data/settings.json')
      .then((res) => res.json())
      .then((data: Settings) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load settings:', error);
        setSettings(defaultSettings);
        setLoading(false);
      });
  }, []);

  return { settings, loading };
};

export default useSettings;
