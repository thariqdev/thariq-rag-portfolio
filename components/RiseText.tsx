// Headline text where every letter rises in one after another when the page loads. Pure CSS, no JavaScript.
// Words are kept together, so a line never breaks in the middle of a word. Screen readers get the plain text.
export default function RiseText({ text, step = 45 }: { text: string; step?: number }) {
  let n = 0;
  return (
    <span aria-label={text}>
      {text.split(" ").map((word, w, all) => (
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {word.split("").map((ch, i) => (
            <span key={i} className="fs-letter" style={{ "--i": n++, "--step": `${step}ms` } as React.CSSProperties}>
              {ch}
            </span>
          ))}
          {w < all.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
