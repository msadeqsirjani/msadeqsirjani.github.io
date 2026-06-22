import {fetchTeaching, teaching} from '../../data/content';
import type {TeachingItem} from '../../types';
import useContentData from '../../hooks/useContentData';

const universityUrl = (university: string) => {
  if (university === 'University of Texas at San Antonio') {
    return 'https://www.utsa.edu/';
  }
  if (university === 'Ferdowsi University of Mashhad') {
    return 'https://en.um.ac.ir/';
  }
  return undefined;
};

const Teaching = () => {
  const {data: teachingItems} = useContentData(fetchTeaching, teaching, {
    logLabel: 'teaching data',
  });

  return (
    <section id="teaching" className="section">
      <div className="container">
        <h2 className="section-title">Teaching Experience</h2>
        <ul className="teaching-list">
          {teachingItems.map((item: TeachingItem, index) => {
            const instructor = item.instructor.replace(/^Instructor:\s*/, '');
            const uniUrl = universityUrl(item.university);
            return (
              <li
                key={`${item.course}-${item.date}-${index}`}
                className="teaching-row"
              >
                <div className="teaching-row-main">
                  <span className="teaching-course">{item.course}</span>
                  <span className="teaching-meta">
                    {item.instructorUrl ? (
                      <a
                        href={item.instructorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {instructor}
                      </a>
                    ) : (
                      instructor
                    )}
                    <span className="teaching-sep"> · </span>
                    {uniUrl ? (
                      <a href={uniUrl} target="_blank" rel="noopener noreferrer">
                        {item.university}
                      </a>
                    ) : (
                      item.university
                    )}
                  </span>
                </div>
                <div className="teaching-row-side">
                  <span className="teaching-role">{item.role}</span>
                  <span className="teaching-term">{item.date}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Teaching;
