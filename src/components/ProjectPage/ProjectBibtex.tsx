import {useState} from 'react';
import Icon from '../Icon/Icon';
import {faCheck, faCopy} from '@fortawesome/free-solid-svg-icons';
import ProjectSection from './ProjectSection';
import {copyBibtex} from './copyBibtex';

const ProjectBibtex = ({bibtex}: {bibtex: string}) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (await copyBibtex(bibtex)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ProjectSection id="bibtex" title="BibTeX">
      <div className="project-bibtex">
        <button
          type="button"
          className="project-copy"
          onClick={() => void copy()}
          aria-label={copied ? 'Copied' : 'Copy BibTeX'}
          title={copied ? 'Copied' : 'Copy BibTeX'}
        >
          <Icon icon={copied ? faCheck : faCopy} size="sm" />
        </button>
        <pre>
          <code>{bibtex}</code>
        </pre>
      </div>
    </ProjectSection>
  );
};

export default ProjectBibtex;
