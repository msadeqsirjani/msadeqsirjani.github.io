import type { EducationItem } from '../../types';

type EducationLogoProps = {
  item: EducationItem;
};

const EducationLogo = ({ item }: EducationLogoProps) => {
  if (!item.logo) return null;

  const uniName = item.universityName ?? item.university;
  const logoAlt = `${uniName} logo — ${item.degree}`;
  const img = (
    <img
      src={item.logo}
      alt={logoAlt}
      className="education-logo education-logo--circle"
      width={48}
      height={48}
      decoding="async"
    />
  );

  return (
    <div className="education-main__logo">
      {item.universityUrl ? (
        <a
          href={item.universityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="education-logo-link education-logo-link--row"
          data-tooltip={uniName}
        >
          {img}
        </a>
      ) : (
        <div className="education-logo-link--row" aria-hidden>
          {img}
        </div>
      )}
    </div>
  );
};

export default EducationLogo;
