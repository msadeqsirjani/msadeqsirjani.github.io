import type { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedSection = ({ children, delay = 0 }: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
