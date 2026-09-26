import type {ReactNode} from 'react';

interface ProjectTableProps {
  label: string;
  caption: string;
  compact?: boolean;
  children: ReactNode;
}

const ProjectTable = ({
  label,
  caption,
  compact,
  children,
}: ProjectTableProps) => (
  <figure className={`project-table-figure${compact ? ' is-compact' : ''}`}>
    <div className="project-table-scroll" tabIndex={0}>
      <table className="project-table">{children}</table>
    </div>
    <figcaption className="project-caption">
      <span>{label}</span> {caption}
    </figcaption>
  </figure>
);

export default ProjectTable;
