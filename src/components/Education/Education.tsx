import {education, fetchEducation} from '../../data/content';
import type {EducationItem} from '../../types';
import useContentData from '../../hooks/useContentData';
import ContentState from '../ContentState/ContentState';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';

const Education = () => {
  const {
    data: educationItems,
    loading,
    error,
    retry,
  } = useContentData(fetchEducation, education, {
    logLabel: 'education data',
  });

  return (
    <section id="education" className="section">
      <div className="container">
        <h1 className="section-title page-title">Education</h1>
        {loading ? (
          <SkeletonLoader
            type="record"
            count={2}
            label="Loading education records"
          />
        ) : error ? (
          <ContentState
            variant="error"
            title="Education records unavailable"
            message={error}
            actionLabel="Try again"
            onAction={retry}
          />
        ) : educationItems.length === 0 ? (
          <ContentState
            variant="empty"
            title="No education records yet"
            message="Education entries will appear here when they are available."
          />
        ) : (
          <ul className="education-list">
            {educationItems.map((item: EducationItem, index) => {
              const uniName = item.universityName ?? item.university;
              return (
                <li
                  key={`${item.degree}-${item.university}-${index}`}
                  className="education-row"
                >
                  <span
                    className={`education-logo ${
                      item.logo ? 'education-logo--img' : 'education-logo--ph'
                    }`}
                  >
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={`${uniName} logo`}
                        width={44}
                        height={44}
                        decoding="async"
                      />
                    ) : (
                      <span className="education-logo--placeholder">
                        {uniName.charAt(0)}
                      </span>
                    )}
                  </span>
                  <div className="education-headtext">
                    <span className="education-degree">{item.degree}</span>
                    {item.universityUrl ? (
                      <a
                        href={item.universityUrl}
                        className="education-university"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.university}
                      </a>
                    ) : (
                      <span className="education-university">
                        {item.university}
                      </span>
                    )}
                    {item.gpa && (
                      <span className="education-gpa">{item.gpa}</span>
                    )}
                  </div>
                  <div className="education-row-side">
                    <span className="education-term">{item.duration}</span>
                    {item.current && (
                      <span className="education-current">Current</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Education;
