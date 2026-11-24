// The one-sentence summary, set large.
export default function About() {
  return (
    <section id="about" className="fs-section" style={{ paddingTop: 64 }}>
      <div className="fs-wrap">
        <div className="fs-head" data-reveal>
          <span className="fs-no">01 / OBJECTIVE</span>
          <h2 className="fs-title">What the fund does</h2>
        </div>
        <p className="fs-objective" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          Over three years I built <mark>admin dashboards, management interfaces and responsive web apps</mark> with React.js, Next.js and
          TypeScript for fintech and wealth platforms. I then moved into the backend on FundsApp, with{" "}
          <mark>Python, FastAPI, SQLAlchemy and PostgreSQL</mark>. I want to keep working across the whole stack.
        </p>
      </div>
    </section>
  );
}
