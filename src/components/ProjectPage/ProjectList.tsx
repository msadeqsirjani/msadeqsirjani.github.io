import type {ReactNode} from 'react';

const ProjectList = ({items}: {items: ReactNode[]}) => (
  <ul className="project-list">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

export default ProjectList;
