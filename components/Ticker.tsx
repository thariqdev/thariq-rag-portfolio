// A looping strip under the hero, like a stock ticker. It is pure CSS. The second copy is hidden from screen readers.
const ITEMS = ["Open to work", "Full stack", "React.js", "Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "RAG", "Fintech", "Dubai"];

function Run({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <li key={item}>
          {item}
          <i aria-hidden="true">▲</i>
        </li>
      ))}
    </ul>
  );
}

export default function Ticker() {
  return (
    <div className="fs-ticker" role="region" aria-label="Skills ticker">
      <div className="fs-ticker-track">
        <Run />
        <Run hidden />
      </div>
    </div>
  );
}
