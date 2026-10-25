import { retrieve } from "../lib/retrieve";

const questions = [
  "What has Thariq built with FastAPI?",
  "Have you worked at Google?",
  "What is the capital of France?",
];

(async () => {
  for (const q of questions) {
    console.log("\nQ:", q);
    const results = await retrieve(q, 3);
    for (const r of results) {
      console.log(`  ${r.score.toFixed(3)}  ${r.source}  | ${r.text.slice(0, 60).replace(/\n/g, " ")}...`);
    }
  }
})();
