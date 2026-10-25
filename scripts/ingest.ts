import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { chunkMarkdown } from "./chunk";
import { embedTexts } from "../lib/embed";

const BATCH_SIZE = 10; // small batches keep us under the free rate limit
const OUT_FILE = "data/vectors.json";

// Embed one batch. If Google says 429 (too many requests), wait and try once more.
async function embedWithRetry(texts: string[]): Promise<number[][]> {
  try {
    return await embedTexts(texts);
  } catch (err) {
    if (!String(err).includes("429")) throw err;
    console.log("Got 429. Waiting 20 seconds, then retrying once...");
    await new Promise((resolve) => setTimeout(resolve, 20000));
    return await embedTexts(texts);
  }
}

async function main() {
  const files = readdirSync("corpus").filter((f) => f.endsWith(".md"));

  // Step 1: read every file and cut it into chunks.
  const items: { id: string; source: string; chunkIndex: number; text: string }[] = [];
  for (const file of files) {
    const chunks = chunkMarkdown(readFileSync(`corpus/${file}`, "utf8"));
    chunks.forEach((text, i) => items.push({ id: `${file}-${i}`, source: file, chunkIndex: i, text }));
  }

  // Step 2: embed the chunks in small batches.
  const embeddings: number[][] = [];
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE).map((item) => item.text);
    embeddings.push(...(await embedWithRetry(batch)));
  }

  // Step 3: save everything. writeFileSync overwrites, so every run starts fresh.
  const records = items.map((item, i) => ({ ...item, embedding: embeddings[i] }));
  mkdirSync("data", { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(records));

  console.log("Files read:", files.length);
  console.log("Total chunks:", records.length);
  console.log("Saved to:", OUT_FILE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
