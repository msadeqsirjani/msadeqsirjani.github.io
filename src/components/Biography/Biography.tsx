const Biography = () => {
  return (
    <section id="biography" className="section">
      <div className="container">
        <h2 className="section-title">Biography</h2>
        <div className="biography-content">
          <div className="bio-text">
            <p>
              Mohammad Sadegh Sirjani is a Ph.D. student in Computer Science at
              the{' '}
              <a href="https://www.utsa.edu/" target="_blank" rel="noopener">
                University of Texas at San Antonio
              </a>
              . He is a research assistant in the{' '}
              <a
                href="https://caicc.utsa.edu/computer-science/research/facilities.html"
                target="_blank"
                rel="noopener"
              >
                ASIC Lab
              </a>
              , advised by{' '}
              <a
                href="https://caicc.utsa.edu/faculty/profiles/xie-mimi.html"
                target="_blank"
                rel="noopener"
              >
                Prof. Mimi Xie
              </a>
              . His research asks how machine learning can run on tiny embedded
              devices that have little energy, little memory, and sometimes no
              battery at all, including nodes that harvest energy from the
              environment.
            </p>

            <p>
              He works on TinyML, edge AI, and intermittent computing: inference
              that must stay correct when power arrives in bursts rather than
              from a stable supply. Current projects include adaptive compressed
              sensing for wearable electrocardiogram monitoring under energy
              harvesting, and in-memory computing on domain-wall memory so that
              arithmetic happens where data already reside. Across these
              projects he aims for on-device intelligence that does not depend
              on the cloud or on a full battery.
            </p>

            <p>
              He received his B.Sc. in Computer Engineering from{' '}
              <a href="https://en.um.ac.ir/" target="_blank" rel="noopener">
                Ferdowsi University of Mashhad
              </a>
              . There he worked on software quality and web systems, then on
              energy-aware scheduling and controller placement in IoT and
              software-defined networks. That line of work drew him toward the
              hardware and systems questions that now shape his Ph.D. He passed
              his qualifying examination in 2026.
            </p>

            <p>
              His papers appear in{' '}
              <a
                href="https://www.springer.com/journal/10586"
                target="_blank"
                rel="noopener"
              >
                Cluster Computing
              </a>
              ,{' '}
              <a
                href="https://www.journals.elsevier.com/sustainable-computing-informatics-and-systems"
                target="_blank"
                rel="noopener"
              >
                Sustainable Computing
              </a>
              ,{' '}
              <a
                href="https://www.satcconf.com/"
                target="_blank"
                rel="noopener"
              >
                SATC
              </a>
              , and the{' '}
              <a
                href="https://gem-workshop.com/"
                target="_blank"
                rel="noopener"
              >
                GEM Workshop
              </a>{' '}
              at ACL. He is a two-time{' '}
              <a href="https://dac.com/2026" target="_blank" rel="noopener">
                DAC
              </a>{' '}
              Young Fellow and won the conference's two-minute presentation
              competition in 2025 and 2026. He has served as a reviewer for{' '}
              <a href="https://www.glsvlsi.org/" target="_blank" rel="noopener">
                GLSVLSI 2026
              </a>{' '}
              and as a teaching assistant at UTSA for operating systems,
              computer organization, and data science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
