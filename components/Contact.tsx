import CopyButton from "./CopyButton";
import HireMeButton from "./HireMeButton";
import { EMAIL, PHONE, GITHUB_URL, LINKEDIN_URL } from "./siteData";

// Last section. Email and phone have a copy button. The "Hire me" popup form is the same one the hero uses.
export default function Contact() {
  return (
    <section id="contact" className="fs-section fs-contact">
      <div className="fs-wrap">
        <div className="fs-head" data-reveal>
          <span className="fs-no">07 / APPLY</span>
          <h2 className="fs-title">Start a conversation</h2>
          <p>I am in Dubai and can start immediately. The fastest reply is by email.</p>
        </div>
        <p className="fs-contact-big" data-reveal>
          Need a full stack engineer<span>?</span>
        </p>
        <div className="fs-channels" data-reveal>
          <div className="fs-ch">
            <div>
              <span className="fs-label">Email</span>
              <span className="fs-ch-v">{EMAIL}</span>
            </div>
            <CopyButton value={EMAIL} label="email address" />
          </div>
          <div className="fs-ch">
            <div>
              <span className="fs-label">Phone</span>
              <span className="fs-ch-v">{PHONE}</span>
            </div>
            <CopyButton value={PHONE} label="phone number" />
          </div>
          <a className="fs-ch" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            <div>
              <span className="fs-label">LinkedIn</span>
              <span className="fs-ch-v">b-mohammed-thariq</span>
            </div>
            <span className="fs-ch-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="fs-ch" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <div>
              <span className="fs-label">GitHub</span>
              <span className="fs-ch-v">github.com/thariqdev</span>
            </div>
            <span className="fs-ch-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="fs-cta">
          <HireMeButton icon="mail" iconClassName="" className="fs-btn" />
        </div>
      </div>
    </section>
  );
}
