export default function Education() {
  return (
    <section id="education" className="fs-section">
      <div className="fs-wrap">
        <div className="fs-head" data-reveal>
          <span className="fs-no">06 / STUDY</span>
          <h2 className="fs-title">Education and training</h2>
        </div>
        <div className="fs-edu-grid">
          <div className="fs-edu" data-reveal>
            <span className="fs-label">2024 to 2026 · expected</span>
            <h3>Master of Computer Applications</h3>
            <p>SRM Institute of Science and Technology, online</p>
          </div>
          <div className="fs-edu" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            <span className="fs-label">2020 to 2023</span>
            <h3>Bachelor of Computer Applications</h3>
            <p>Chinmaya College of Arts, Science and Commerce</p>
          </div>
          <div className="fs-edu" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
            <span className="fs-label">Training and internship</span>
            <h3>MERN Stack Development</h3>
            <p>Luminar Technolab. IT internship at Eastern Condiments Pvt. Ltd.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
