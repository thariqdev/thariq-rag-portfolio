import { readFileSync } from "node:fs";

// Split text into pieces of `size` characters.
// Each piece repeats the last `overlap` characters of the one before it,
// so a sentence cut at the edge still appears whole in one chunk.
export function chunkText(text: string, size = 500, overlap = 80): string[] {
  if (overlap >= size) throw new Error("overlap must be smaller than size");

  const chunks: string[] = [];
  const step = size - overlap; // how far we move forward each time

  for (let start = 0; start < text.length; start += step) {
    const piece = text.slice(start, start + size).trim();
    if (piece) chunks.push(piece);
    if (start + size >= text.length) break; // reached the end
  }
  return chunks;
}

// Split a markdown file on "## " headings. One section = one chunk.
// Every chunk starts with "File title — Heading", so it makes sense on its own.
export function chunkMarkdown(markdown: string, maxSection = 600): string[] {
  const title = markdown.match(/^# (.+)$/m)?.[1].trim() ?? "";
  const sections = markdown.split(/^## /m); // [text before first heading, "Heading\nbody", ...]
  const chunks: string[] = [];

  sections.forEach((section, i) => {
    let heading = title;
    let body = section;
    if (i === 0) {
      body = section.replace(/^# .+$/m, ""); // drop the title line, it is in the prefix
    } else {
      const [first, ...rest] = section.split("\n");
      heading = `${title} — ${first.trim()}`;
      body = rest.join("\n");
    }
    body = body.trim();
    if (!body) return;

    // Long section: split it further, and keep the heading on every piece.
    const pieces = body.length > maxSection ? chunkText(body) : [body];
    pieces.forEach((piece) => chunks.push(`${heading}\n${piece}`));
  });
  return chunks;
}

// Small test: runs only when this file is run directly, not when imported.
if (process.argv[1]?.endsWith("chunk.ts")) {
  const text = readFileSync("corpus/faq.md", "utf8");
  const chunks = chunkText(text);
  console.log("Chunk count:", chunks.length);
  console.log("First chunk:\n" + (chunks[0] ?? "(faq.md is empty)"));
}
