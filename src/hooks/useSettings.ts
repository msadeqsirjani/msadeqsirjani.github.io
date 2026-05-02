import settingsData from '../data/settings.json';

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

const settings = settingsData as Settings;

export const useSettings = () => {
  return { settings, loading: false };
};

export default useSettings;
