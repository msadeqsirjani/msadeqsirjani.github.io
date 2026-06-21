import type { CSSProperties } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const SIZE_EM: Record<string, string> = {
  xs: '0.75em',
  sm: '0.875em',
  lg: '1.33em',
  '2x': '2em',
  '3x': '3em',
};

interface IconProps {
  icon: IconDefinition;
  className?: string;
  size?: keyof typeof SIZE_EM;
  spin?: boolean;
  style?: CSSProperties;
  title?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * Lightweight renderer for FontAwesome icon data — same icons, no
 * @fortawesome/fontawesome-svg-core or react-fontawesome runtime.
 * An IconDefinition's `icon` field is [width, height, ligs, unicode, path].
 */
const Icon = ({ icon, className, size, spin, style, title, ...rest }: IconProps) => {
  const [width, height, , , path] = icon.icon;
  const d = Array.isArray(path) ? path[path.length - 1] : path;
  const labelled = Boolean(rest['aria-label']);

  const classes = ['icon-svg', spin ? 'icon-spin' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className={classes}
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      style={{
        width: `${(width / height).toFixed(3)}em`,
        height: '1em',
        ...(size ? { fontSize: SIZE_EM[size] } : null),
        ...style,
      }}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path fill="currentColor" d={d} />
    </svg>
  );
};

export default Icon;
