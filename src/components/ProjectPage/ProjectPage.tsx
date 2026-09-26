import {useMemo} from 'react';
import type {ReactNode} from 'react';
import ProjectHero from './ProjectHero';
import type {ProjectMeta} from './ProjectHero';
import ProjectBibtex from './ProjectBibtex';
import {useActiveSection} from './useActiveSection';
import './ProjectPage.css';

interface ProjectPageProps extends ProjectMeta {
  sections: {id: string; label: string}[];
  children: ReactNode;
}

const ProjectPage = ({sections, children, ...meta}: ProjectPageProps) => {
  const nav = useMemo(
    () => [
      {id: 'top', label: 'Top'},
      ...sections,
      {id: 'bibtex', label: 'BibTeX'},
    ],
    [sections],
  );
  const ids = useMemo(() => nav.map(section => section.id), [nav]);
  const active = useActiveSection(ids);

  return (
    <article className="project-page">
      <nav className="project-dots" aria-label="Page sections">
        {nav.map(({id, label}) => (
          <a
            key={id}
            href={`#${id}`}
            title={label}
            aria-label={label}
            aria-current={active === id ? 'location' : undefined}
            className={active === id ? 'is-active' : undefined}
          />
        ))}
      </nav>
      <ProjectHero {...meta} />
      {children}
      <ProjectBibtex bibtex={meta.bibtex} />
    </article>
  );
};

export default ProjectPage;
