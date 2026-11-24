import Counter from "./Counter";
import { BEFORE_AFTER } from "./siteData";

// Big numbers, then before/after bars. Each row is scaled to its own "before" value.
export default function Proof() {
  return (
    <section id="proof" className="fs-section">
      <div className="fs-wrap">
        <div className="fs-head" data-reveal>
          <span className="fs-no">04 / PERFORMANCE</span>
          <h2 className="fs-title">Numbers from my projects</h2>
          <p>Measured on Career AI&apos;s own test set and database, plus FundsApp.</p>
        </div>

        <div className="fs-tiles" data-reveal>
          <div className="fs-tile"><b><Counter parts={[900]} suffix="+" /></b><span>automated tests on Career AI</span></div>
          <div className="fs-tile"><b><Counter parts={[15]} suffix="+" /></b><span>REST APIs on FundsApp</span></div>
          <div className="fs-tile"><b><Counter parts={[27, 27]} /></b><span>cross-account read attempts refused</span></div>
          <div className="fs-tile"><b><Counter parts={[0, 32]} /></b><span>injection attempts that got through, down from 21</span></div>
        </div>

        <div className="fs-ba">
          {BEFORE_AFTER.map((d) => {
            const afterPct = (d.after / d.before) * 100;
            return (
              <div className="fs-ba-row" key={d.title} data-reveal>
                <h3>
                  {d.title}
                  <small>{d.sub}</small>
                </h3>
                <div className="fs-bars">
                  <div className="fs-bar fs-bar-before">
                    <span>Before</span>
                    <div className="fs-bar-track">
                      <div className="fs-bar-fill" style={{ width: "100%" }}>{d.beforeLabel}</div>
                    </div>
                  </div>
                  <div className="fs-bar fs-bar-after">
                    <span>After</span>
                    <div className="fs-bar-track">
                      <div className="fs-bar-fill" style={{ width: `${afterPct}%` }} />
                      <span className="fs-bar-out" style={{ left: `calc(${afterPct}% + 8px)` }}>{d.afterLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
