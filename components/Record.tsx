import { JOBS, TIMELINE } from "./siteData";

// Timeline chart. It is drawn straight from the dates in siteData.ts, so it never goes out of date by itself.
const W = 960;
const H = 300;
const LEFT = 190;
const RIGHT = 24;
const TOP = 34;
const BOTTOM = 30;
const Y0 = 2020;
const Y1 = 2027;
const NOW = 2026.9; // Nov 2026
const x = (year: number) => LEFT + ((year - Y0) / (Y1 - Y0)) * (W - LEFT - RIGHT);
const YEARS = Array.from({ length: Y1 - Y0 + 1 }, (_, i) => Y0 + i);
const ROW_H = (H - TOP - BOTTOM) / TIMELINE.length;

export default function Record() {
  return (
    <section id="record" className="fs-section">
      <div className="fs-wrap">
        <div className="fs-head" data-reveal>
          <span className="fs-no">02 / TRACK RECORD</span>
          <h2 className="fs-title">Work and study, 2020 to now</h2>
          <p>Solid bars are jobs. Dashed bars are degrees. The orange line is today.</p>
        </div>

        <div className="fs-chart" data-reveal>
          <svg className="fs-track" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Timeline of degrees and jobs from 2020 to 2026">
            {YEARS.map((y) => (
              <g key={y}>
                <line x1={x(y)} x2={x(y)} y1={TOP - 8} y2={H - BOTTOM} className="grid" />
                <text x={x(y)} y={H - 10} textAnchor="middle">{y}</text>
              </g>
            ))}
            {TIMELINE.map((row, i) => {
              const cy = TOP + i * ROW_H + ROW_H / 2;
              return (
                <g key={row.name}>
                  <text x={0} y={cy - 2} className="lab">{row.name}</text>
                  <text x={0} y={cy + 13}>{row.sub}</text>
                  <rect x={x(row.from)} y={cy - 15} width={x(row.to) - x(row.from)} height={30} className={row.kind} style={{ "--i": i } as React.CSSProperties} />
                </g>
              );
            })}
            <line x1={x(NOW)} x2={x(NOW)} y1={TOP - 14} y2={H - BOTTOM} className="now" />
            <text x={x(NOW) - 6} y={TOP - 18} textAnchor="end" className="nowt">NOV 2026</text>
          </svg>
        </div>
        <div className="fs-legend fs-label">
          <span><i className="w" />Job</span>
          <span><i className="e" />Degree</span>
        </div>

        <div className="fs-jobs">
          {JOBS.map((job) => (
            <article className="fs-job" key={job.title} data-reveal>
              <span className="fs-label">{job.when}</span>
              <h3>{job.title}</h3>
              <p className="fs-where">{job.where}</p>
              <ul className="fs-bullets">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
