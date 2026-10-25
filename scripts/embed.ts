import { readFileSync } from "node:fs";
import { chunkText } from "./chunk";
import { embedTexts } from "../lib/embed";

// Small test: embeds the first 2 chunks of faq.md.
// (embedTexts itself now lives in lib/embed.ts.)
// Wrapped in a function because this project is CommonJS (no top-level await).
(async () => {
  const chunks = chunkText(readFileSync("corpus/faq.md", "utf8")).slice(0, 2);
  const vectors = await embedTexts(chunks);
  console.log("Vectors:", vectors.length);
  console.log("Length of first vector:", vectors[0].length);
})();
