# Talk to Thariq

A one-page portfolio site with a chat assistant. The assistant answers questions about Thariq using RAG over the markdown files in `/corpus`. If the answer is not in those files, it says "I don't know."

Built for the HireStella AI Developer assessment. Free tiers only.

## How to run

1. Install: `npm install` (Node 20.9 or newer).
2. Copy `.env.example` to `.env.local` and add your own keys:
   - `GEMINI_API_KEY` (https://aistudio.google.com/apikey)
   - `GROQ_API_KEY` (https://console.groq.com/keys)
3. Start: `npm run dev`, then open http://localhost:3000.

Other commands:

- `npm run ingest` rebuilds `data/vectors.json` from `/corpus`. Run it after every corpus edit.
- `npm run eval` asks 11 test questions and prints a score.
- `npm run build` then `npm start` runs the production build.

Deploy: push to GitHub, import in Vercel, add the two env vars. `data/vectors.json` is committed, so no build step is needed for the index.

## How it works

1. `npm run ingest` splits each corpus file into chunks and embeds them. The vectors are saved in `data/vectors.json`.
2. A question is embedded and compared with every chunk by cosine similarity. The top 6 chunks are kept.
3. If the best score is too low, the assistant says it doesn't know without calling the LLM.
4. Otherwise only those chunks go into the prompt, inside `<context>` tags. The model is told to use nothing else.

Safety checks in `lib/answer.ts`: the question is treated as untrusted text, known attack phrases are refused, the reply is blocked if it leaks the rules, and numbers that are not in the retrieved chunks are blocked. `/api/chat` also caps message size and rate-limits each visitor.

## Choices

- **Chunking:** Split by `##` heading, long sections split at 500 characters with 80 overlap, and every chunk starts with "File title — Heading".
- **Embeddings:** Gemini `gemini-embedding-2`, because it is free and I already use one key for it.
- **Chat model (main):** Groq `openai/gpt-oss-20b`, because it answers in about one second.
- **Chat model (backup):** Gemini `gemini-3.8-flash`, used when Groq fails or is busy.
- **Vector store:** one JSON file, searched in memory. The corpus is small (39 chunks), so a database is not needed.

## Broken or unfinished

- **Eval is 9/11, not 11/11.** The two misses are `FundsApp` and `Career AI`. The answers are correct and grounded, but the test looks for the exact words "KYC" and "RAG" and the model used other words. I did not change the tests to hide this.
- **Some natural questions get "I don't know."** Example: "Does Thariq have 10 years of experience?" The CV says "3+ years", but that chunk is not retrieved for this wording. A FAQ entry in the corpus would fix it.
- **No chat memory.** Each question is answered alone, so follow-ups like "tell me more" do not work.
- **The rate limit is per server instance.** On Vercel, each instance counts separately, so it is a soft limit.
- **Free-tier limits.** Gemini embeddings allow about 30,000 tokens per minute. Heavy use can give a "busy, try again" message. There is no retry.
- **Answers are not streamed.** The reply appears all at once.
- **Icons come from Google's CDN** (Material Symbols). If it is blocked, icons will not show.
- **The refusal check is partly rule-based.** The attack-phrase list is a regex. It was tested on about 30 normal questions with no false positives, but it is not a complete defence.
