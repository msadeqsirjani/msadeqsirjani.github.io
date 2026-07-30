import './Service.css';

const Service = () => (
  <section id="service" className="section service-section">
    <div className="container">
      <h1 className="section-title">Service</h1>
      <p className="service-intro">
        I contribute to the research community through conference peer-review
        activities.
      </p>

      <section className="service-group" aria-labelledby="conference-reviewing">
        <h2 id="conference-reviewing" className="service-group-title">
          Conference Reviewing
        </h2>
        <ul className="service-list">
          <li className="service-row">
            <div className="service-row-main">
              <a
                className="service-venue"
                href="https://www.glsvlsi.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                36th Great Lakes Symposium on VLSI (GLSVLSI)
              </a>
              <span className="service-meta">Sponsored by ACM SIGDA</span>
            </div>
            <div className="service-row-side">
              <span className="service-role">Reviewer</span>
              <time className="service-year" dateTime="2026">
                2026
              </time>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </section>
);

export default Service;
