import type {ReactNode} from 'react';

interface ProjectSectionProps {
  id: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}

const ProjectSection = ({id, title, lede, children}: ProjectSectionProps) => (
  <section id={id} className="project-band" aria-labelledby={`${id}-title`}>
    <div className="project-inner">
      <h2 className="section-title" id={`${id}-title`}>
        {title}
      </h2>
      {lede && <p className="project-lede">{lede}</p>}
      {children}
    </div>
  </section>
);

export default ProjectSection;
