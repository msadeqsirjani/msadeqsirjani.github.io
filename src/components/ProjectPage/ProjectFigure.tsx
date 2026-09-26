import type {ReactNode} from 'react';

interface ProjectFigureProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  size: 'small' | 'medium' | 'wide';
  children: ReactNode;
}

const FIGURE_CLASS = {
  small: 'project-figure is-small',
  medium: 'project-figure is-medium',
  wide: 'project-figure is-wide',
};

const ProjectFigure = ({
  src,
  width,
  height,
  alt,
  label,
  size,
  children,
}: ProjectFigureProps) => (
  <figure className={FIGURE_CLASS[size]}>
    <img src={src} width={width} height={height} loading="lazy" alt={alt} />
    <figcaption className="project-caption">
      <span>{label}</span> {children}
    </figcaption>
  </figure>
);

export default ProjectFigure;
