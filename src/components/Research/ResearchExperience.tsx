import {fetchResearchExperience, researchExperience} from '../../data/content';
import type {ResearchItem} from '../../types';
import useContentData from '../../hooks/useContentData';

const getLabInitials = (lab: string) =>
  lab
    .split(' ')
    .filter(w => w.length > 2)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');

const ResearchExperience = () => {
  const {data: researchItems} = useContentData(
    fetchResearchExperience,
    researchExperience,
    {
      logLabel: 'research experience data',
    },
  );

  return (
    <section id="research" className="section">
      <div className="container">
        <h2 className="section-title">Research Experience</h2>
        <ul className="research-list">
          {researchItems.map((item: ResearchItem, index) => (
            <li
              key={`${item.position}-${item.lab}-${index}`}
              className="research-row"
            >
              <div className="research-row-side">
                <span className="research-term">{item.duration}</span>
                {item.current && (
                  <span className="research-current">Current</span>
                )}
              </div>
              <div className="research-row-main">
                <div className="research-head">
                  <span
                    className={`research-logo ${
                      item.logo ? 'research-logo--img' : 'research-logo--ph'
                    }`}
                  >
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={`${item.lab} logo`}
                        width={40}
                        height={40}
                        decoding="async"
                      />
                    ) : (
                      <span className="research-logo--placeholder">
                        {getLabInitials(item.lab)}
                      </span>
                    )}
                  </span>
                  <div className="research-headtext">
                    <span className="research-position">{item.position}</span>
                    <span className="research-affil">
                      {item.labUrl ? (
                        <a
                          href={item.labUrl}
                          className="research-lab"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.lab}
                        </a>
                      ) : (
                        <span className="research-lab">{item.lab}</span>
                      )}
                      {item.university && (
                        <>
                          <span className="research-sep"> · </span>
                          {item.university}
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <ul className="research-points">
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ResearchExperience;
