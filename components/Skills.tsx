import { SKILL_GROUPS } from "./siteData";

const TOTAL = SKILL_GROUPS.reduce((sum, g) => sum + g.items.length, 0);

// Donut: one arc per skill group, sized by how many skills the CV lists in that group.
function Donut() {
  // Each arc starts where the one before it ended. Start angles are worked out first, so nothing is reassigned.
  const sweeps = SKILL_GROUPS.map((g) => (g.items.length / TOTAL) * 360);
  const starts = sweeps.map((_, i) => 90 - sweeps.slice(0, i).reduce((a, b) => a + b, 0));
  const point = (deg: number) => [110 + 80 * Math.cos((deg * Math.PI) / 180), 110 - 80 * Math.sin((deg * Math.PI) / 180)];
  const arcs = SKILL_GROUPS.map((g, i) => {
    const a0 = starts[i];
    const a1 = a0 - sweeps[i] + 1.2; // small gap between arcs
    const [x0, y0] = point(a0);
    const [x1, y1] = point(a1);
    const large = a0 - a1 > 180 ? 1 : 0;
    return { name: g.name, color: g.color, d: `M${x0.toFixed(2)} ${y0.toFixed(2)} A80 80 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}` };
  });
  return (
    <svg viewBox="0 0 220 220" role="img" aria-label={`Skills by group: ${SKILL_GROUPS.map((g) => `${g.name} ${g.items.length}`).join(", ")}`}>
      {arcs.map((a, i) => (
        <path key={a.name} d={a.d} pathLength={100} className="fs-arc" style={{ "--i": i } as React.CSSProperties} fill="none" stroke={a.color} strokeWidth={34} />
      ))}
      <text x={110} y={118} textAnchor="middle" fontSize={44} fontWeight={800}>{TOTAL}</text>
      <text x={110} y={140} textAnchor="middle" fontSize={11} fontFamily="var(--fs-mono)">SKILLS</text>
    </svg>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="fs-section">
      <div className="fs-wrap">
        <div className="fs-head" data-reveal>
          <span className="fs-no">05 / ALLOCATION</span>
          <h2 className="fs-title">Where the skills sit</h2>
          <p>The donut counts the skills listed in each group of my CV.</p>
        </div>
        <div className="fs-alloc">
          <div className="fs-donut" data-reveal>
            <Donut />
            <span className="fs-label">{TOTAL} skills in {SKILL_GROUPS.length} groups</span>
          </div>
          <div className="fs-skills">
            {SKILL_GROUPS.map((g) => (
              <div className="fs-skill-row" key={g.name} data-reveal>
                <h3>
                  <i style={{ background: g.color }} />
                  {g.name} · {g.items.length}
                </h3>
                <div className="fs-tags">
                  {g.items.map((s, t) => (
                    <span className="fs-tag" key={s} style={{ "--t": t } as React.CSSProperties}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
