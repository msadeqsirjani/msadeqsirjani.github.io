import type {ReactNode} from 'react';

interface ProjectTableProps {
  label: string;
  caption: string;
  compact?: boolean;
  text?: boolean;
  children: ReactNode;
}

const ProjectTable = ({
  label,
  caption,
  compact,
  text,
  children,
}: ProjectTableProps) => (
  <figure
    className={`project-table-figure${compact ? ' is-compact' : ''}${
      text ? ' is-text' : ''
    }`}
  >
    <div className="project-table-scroll" tabIndex={0}>
      <table className="project-table">{children}</table>
    </div>
    <figcaption className="project-caption">
      <span>{label}</span> {caption}
    </figcaption>
  </figure>
);

export default ProjectTable;
