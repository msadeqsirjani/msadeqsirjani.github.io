import type {ReactNode} from 'react';

const Ext = ({href, children}: {href: string; children: ReactNode}) => (
  <a href={href} target="_blank" rel="noopener">
    {children}
  </a>
);

const Biography = () => {
  return (
    <section id="biography" className="section">
      <div className="container">
        <h2 className="section-title">Biography</h2>
        <div className="biography-content">
          <div className="bio-text">
            <p>
              <strong>Mohammad Sadegh Sirjani</strong> is a Ph.D. student in
              Computer Science at the{' '}
              <Ext href="https://www.utsa.edu/">
                University of Texas at San Antonio
              </Ext>
              . He is a <strong>Graduate Research Assistant</strong> in the{' '}
              <Ext href="https://caicc.utsa.edu/computer-science/research/facilities.html">
                ASIC Lab
              </Ext>
              , advised by{' '}
              <Ext href="https://caicc.utsa.edu/faculty/profiles/xie-mimi.html">
                Prof. Mimi Xie
              </Ext>
              , and a <strong>Teaching Assistant</strong> at UT San Antonio. He
              received his <strong>B.Sc. in Computer Engineering</strong> from{' '}
              <Ext href="https://en.um.ac.ir/">
                Ferdowsi University of Mashhad
              </Ext>{' '}
              and passed his qualifying examination in 2026.
            </p>

            <p>
              His research focuses on <strong>TinyML</strong>,{' '}
              <strong>edge AI</strong>, and{' '}
              <strong>intermittent computing</strong> for{' '}
              <strong>energy-harvesting</strong> and{' '}
              <strong>resource-constrained devices</strong>. He takes a
              cross-layer approach spanning machine learning and embedded
              systems to build intelligent devices that run reliably on
              batteryless hardware, with applications in{' '}
              <strong>wearable health sensing</strong> and{' '}
              <strong>sustainable IoT</strong>. His papers appear in{' '}
              <Ext href="https://gem-workshop.com/">GEM</Ext>,{' '}
              <Ext href="https://bhi.embs.org/2026/">IEEE EMBS BHI</Ext>,{' '}
              <Ext href="https://www.journals.elsevier.com/sustainable-computing-informatics-and-systems">
                Sustainable Computing
              </Ext>
              ,{' '}
              <Ext href="https://www.springer.com/journal/10586">
                Cluster Computing
              </Ext>
              , and <Ext href="https://www.satcconf.com/">IEEE SaTC</Ext>.
            </p>

            <p>
              He is a two-time{' '}
              <Ext href="https://dac.com/2026">DAC Young Fellow</Ext> and won
              the <strong>DAC 2-minute presentation award</strong> in both 2025
              and 2026. He received the <strong>Outstanding Paper Award</strong>{' '}
              at <strong>GEM 2026</strong> and the{' '}
              <strong>Fan Favorite Award</strong> at the{' '}
              <Ext href="https://caicc.utsa.edu/draper/">
                Draper Data Science Business Plan Competition
              </Ext>
              . He earned an{' '}
              <Ext href="https://learn.nvidia.com/certificates?id=n-giMj1ST7SpcoFfdlr8mQ">
                NVIDIA
              </Ext>{' '}
              certificate in <strong>building agentic AI applications</strong>{' '}
              and is a <strong>reviewer</strong> for{' '}
              <Ext href="https://www.glsvlsi.org/">GLSVLSI</Ext>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
