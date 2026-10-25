import { readFileSync } from "node:fs";
import path from "node:path";
import { embedTexts } from "./embed";

type Chunk = { id: string; source: string; chunkIndex: number; text: string; embedding: number[] };
export type Result = { score: number; source: string; text: string };

// Load vectors.json once, then keep it in memory.
let cache: Chunk[] | null = null;
function loadChunks(): Chunk[] {
  // process.cwd() is the project root locally and on Vercel.
  if (!cache) cache = JSON.parse(readFileSync(path.join(process.cwd(), "data", "vectors.json"), "utf8"));
  return cache!;
}

// Cosine similarity: 1 = same meaning, near 0 = unrelated.
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Embed the question, score every chunk, return the best topK.
export async function retrieve(question: string, topK = 4): Promise<Result[]> {
  const embedStart = Date.now();
  const [questionVector] = await embedTexts([question]);
  console.log(`[timing] embed: ${Date.now() - embedStart}ms`);

  const scoreStart = Date.now();
  const results = loadChunks()
    .map((c) => ({ score: cosineSimilarity(questionVector, c.embedding), source: c.source, text: c.text }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
  console.log(`[timing] score chunks: ${Date.now() - scoreStart}ms`);
  return results;
}
