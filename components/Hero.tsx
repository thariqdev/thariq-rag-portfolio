import OpenChatButton from "./OpenChatButton";
import HireMeButton from "./HireMeButton";
import NameWave from "./NameWave";
import { GITHUB_URL } from "./siteData";

// Points on a circle, for the gauge arcs.
function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}
function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

// Five risk bands, green to red. The needle rests on the first one.
const BANDS = ["#1f9d6b", "#8cbf3f", "#f2b705", "#ff7a1f", "#d7263d"];

function Gauge() {
  return (
    <svg viewBox="0 0 160 96" role="img" aria-label="Hiring risk gauge pointing at Low">
      {BANDS.map((color, i) => (
        <path key={color} d={arc(80, 82, 62, 180 - i * 36 - 1.5, 180 - (i + 1) * 36 + 1.5)} fill="none" stroke={color} strokeWidth={15} />
      ))}
      <g className="fs-needle">
        <path d="M80 82 L77 82 L80 28 L83 82 Z" fill="#0a0f2c" />
      </g>
      <circle cx={80} cy={82} r={7} fill="#0a0f2c" />
      <text x={14} y={94} fontSize={9} fontFamily="var(--fs-mono)" fill="#46506f">LOW</text>
      <text x={146} y={94} fontSize={9} textAnchor="end" fontFamily="var(--fs-mono)" fill="#46506f">HIGH</text>
    </svg>
  );
}

// First screen: the name, what I do, three buttons, and the "key facts" card.
export default function Hero() {
  return (
    <div className="fs-hero">
      <div className="fs-wrap">
        <div className="fs-kicker fs-label">
          <span>Factsheet · Nov 2026</span>
          <span>Dubai, United Arab Emirates</span>
          <span>Fintech and wealth platforms</span>
        </div>
        <div className="fs-hero-grid">
          <div>
            <h1 className="fs-h1">
              <span className="pre">B Mohammed</span>
              <NameWave text="Thariq" />
            </h1>
            <p className="fs-hint fs-label" aria-hidden="true">↑ Move your cursor over the name</p>
            <p className="fs-role">Full stack software engineer. React and Next.js up front, Python and FastAPI behind.</p>
            <p className="fs-lede">
              I build dashboards, investment workflows and AI features for fintech and wealth management products. My recent work includes a RAG
              assistant built from scratch and checked against its sources.
            </p>
            <div className="fs-cta">
              <HireMeButton icon="mail" iconClassName="" className="fs-btn fs-btn-solid" />
              <OpenChatButton icon="forum" iconClassName="" className="fs-btn" />
              <a className="fs-btn" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>

          <aside className="fs-facts" aria-label="Key facts">
            <h2 className="fs-facts-title">Key facts</h2>
            <dl>
              <div className="fs-row" style={{ "--i": 0 } as React.CSSProperties}><dt>Category</dt><dd>Full stack software engineer</dd></div>
              <div className="fs-row" style={{ "--i": 1 } as React.CSSProperties}><dt>Track record</dt><dd>3+ years, since Sept 2023</dd></div>
              <div className="fs-row" style={{ "--i": 2 } as React.CSSProperties}><dt>Last role</dt><dd>Evoqins Pvt Ltd, Sept 2024 to Aug 2026</dd></div>
              <div className="fs-row" style={{ "--i": 3 } as React.CSSProperties}><dt>Base</dt><dd>Dubai, UAE</dd></div>
              <div className="fs-row" style={{ "--i": 4 } as React.CSSProperties}><dt>Availability</dt><dd>Immediate</dd></div>
            </dl>
            <div className="fs-risk">
              <Gauge />
              <p>
                <b>Hiring risk: low</b>Ships to production, writes tests, and can start straight away.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
