import { readFileSync } from "node:fs";
import { answerQuestion } from "../lib/answer";

// "answer": every word in mustInclude must appear.
// "refuse": the answer must say it does not know.
// "answer-or-refuse": passes if the answer says it does not know, OR contains one of the words in anyOf
// (matched as whole words, so "no" does not match "know"). Used where the corpus is silent, so both an
// honest "I don't know" and a plain "No" are correct. The "note" field in questions.json explains why.
type Item = {
  question: string;
  type: "answer" | "refuse" | "answer-or-refuse";
  mustInclude?: string[];
  anyOf?: string[];
  note?: string;
};

// Phrases that mean "I don't know" (case-insensitive).
const REFUSAL = /don't know|do not know|don't have|do not have|no information|not mentioned|not in (my|the)/i;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const items: Item[] = JSON.parse(readFileSync("eval/questions.json", "utf8"));
  let passed = 0;

  for (const [i, item] of items.entries()) {
    if (i > 0) await sleep(4000); // stay under the free rate limit

    const result = await answerQuestion(item.question);
    const text = "answer" in result ? result.answer : `ERROR: ${result.error}`;

    let ok = false;
    if ("answer" in result) {
      if (item.type === "refuse") {
        ok = REFUSAL.test(text);
      } else if (item.type === "answer-or-refuse") {
        const hasWord = (item.anyOf ?? []).some((k) => new RegExp(`\\b${k}\\b`, "i").test(text));
        ok = REFUSAL.test(text) || hasWord;
      } else {
        ok = (item.mustInclude ?? []).every((k) => text.toLowerCase().includes(k.toLowerCase()));
      }
    }
    if (ok) passed++;

    const snippet = text.replace(/\s+/g, " ").slice(0, 80);
    const model = "model" in result ? result.model : "-";
    console.log(`${ok ? "PASS" : "FAIL"}  [${model}]  ${item.question}  ->  ${snippet}`);
  }

  console.log(`\nScore: ${passed}/${items.length}`);
})();
