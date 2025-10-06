
const Biography = () => {
  return (
    <section id="biography" className="section">
      <div className="container">
        <h2 className="section-title">Biography</h2>
        <div className="biography-content">
          <div className="bio-text">
            <p>
              I am a Ph.D. student in Computer Science at the{' '}
              <a href="https://utsa.edu" target="_blank" rel="noopener">
                University of Texas at San Antonio
              </a>
              , working in the ASIC Laboratory under{' '}
              <a href="https://caicc.utsa.edu/faculty/profiles/xie-mimi.html" target="_blank" rel="noopener">
                Prof. Mimi Xie
              </a>
              . My research focuses on TinyAI and embedded systems, enabling efficient AI deployment on resource-constrained devices.
            </p>

            <p>
              I earned my B.Sc. in Computer Engineering from{' '}
              <a href="https://um.ac.ir" target="_blank" rel="noopener">
                Ferdowsi University of Mashhad
              </a>
              . My research on energy-efficient AI systems has been recognized through the{' '}
              <a href="https://www.dac.com/About/Young-Professionals-Program" target="_blank" rel="noopener">
                DAC Young Fellow
              </a>{' '}
              award and first place at the{' '}
              <a href="https://www.dac.com" target="_blank" rel="noopener">
                DAC 2025
              </a>{' '}
              Video Presentation Contest. Beyond research, I teach Operating Systems, Cloud Computing, and Compiler Design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
