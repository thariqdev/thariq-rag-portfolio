import { PROJECTS } from "./siteData";

// The five projects as numbered rows. On a mouse, a row opens when you hover it or tab into it. All rows start closed, so the rows never jump under the cursor.
// On phones and touch screens every row stays open. Client work has no public link, so it says so.
export default function Projects() {
  return (
    <section id="work" className="fs-section">
      <div className="fs-wrap">
        <div className="fs-head" data-reveal>
          <span className="fs-no">03 / HOLDINGS</span>
          <h2 className="fs-title">Projects</h2>
          <p>
            Five projects. Two are mine and public. Three come from client work at Evoqins, and two of those have live sites.
            <span className="fs-hover-hint"> Hover a row to open it.</span>
          </p>
        </div>
        <div className="fs-hold">
          {PROJECTS.map((p, i) => (
            <article id={`proj-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="fs-proj" key={p.name} tabIndex={0} data-reveal style={{ "--d": i } as React.CSSProperties}>
              <div className="fs-proj-top">
                <div className="fs-proj-n">{p.n}</div>
                <div className="fs-proj-name">
                  <h3>{p.name}</h3>
                  <p className="fs-sub">{p.sub}</p>
                </div>
                <div className="fs-links">
                  {p.links ? (
                    p.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                        <span>{l.label}</span>
                        <span className="fs-arrow" aria-hidden="true">↗</span>
                      </a>
                    ))
                  ) : (
                    <span className="fs-none">Client work at Evoqins. No public link.</span>
                  )}
                </div>
              </div>
              <div className="fs-proj-more">
                <div>
                  <div className="fs-more-grid">
                    <div>
                      <p className="fs-desc">{p.desc}</p>
                      {p.bullets && (
                        <ul className="fs-bullets">
                          {p.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="fs-tags">
                      {p.tags.map((t) => (
                        <span className="fs-tag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
