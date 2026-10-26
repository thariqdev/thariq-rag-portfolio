# Talk to Thariq

A one-page portfolio with a chat assistant called "Talk to Thariq".
The assistant uses RAG. It answers only from my own documents in `/corpus`.
If the answer is not there, it says "I don't know."
I built it for the HireStella AI Developer assessment. It uses free tiers only.

**Live:** https://thariq-rag-portfolio.vercel.app/

## How to run

1. Install: `npm install` (Node 20.9 or newer).
2. Copy `.env.example` to `.env.local` and add two keys:
   - `GEMINI_API_KEY` (free: https://aistudio.google.com/apikey)
   - `GROQ_API_KEY` (free: https://console.groq.com/keys)
3. Build the index: `npm run ingest`. Run it again after every corpus edit.
4. Start the site: `npm run dev`, then open http://localhost:3000.
5. Run the eval: `npm run eval`.

`.env.local` is ignored by git. Keys stay on the server and never reach the browser.

## How it works

**Ingest** (`npm run ingest`):
1. Read each markdown file in `/corpus`.
2. Split it into chunks.
3. Embed each chunk with Gemini.
4. Save the text and vectors to `data/vectors.json` (40 chunks today).

**Chat** (`/api/chat`):
1. Embed the question.
2. Compare it with every chunk by cosine similarity.
3. Keep the top 6 chunks.
4. Put only those chunks in the prompt. The LLM never sees the whole CV.
5. Return the answer. The widget shows which files it came from.

**Follow-ups:** the widget sends the last 2 turns. The server adds my previous question to the search text. The earlier messages go into the prompt as `<history>`, only to explain words like "it" and "he". Facts must still come from the retrieved chunks.

## Choices

- **Chunking:** split by markdown `##` headings. Long sections are split at about 500 characters with 80 overlap. Each chunk starts with "File title — Heading".
- **Embedding model:** Gemini `gemini-embedding-2`. It is free, and I already use one Gemini key.
- **Answer model:** Groq `openai/gpt-oss-20b` first, because it is fast. Gemini `gemini-3.8-flash` is the fallback if Groq fails or times out. Temperature is 0.
- **Vector store:** one JSON file, searched in memory with cosine similarity. The corpus is tiny (40 chunks), so a database would add work and no benefit.

## Grounded refusal

Two things work together:
1. **A minimum similarity score.** If the best chunk scores below 0.5, the model is not called.
2. **A strict prompt.** The model must use only the retrieved chunks. If the answer is not there, it must reply "I don't know."

The score alone is not a reliable signal. A short real question ("Rudo?") scored 0.56, and an off-topic question scored 0.59. So the score is set low, and the prompt does most of the work. There are also a few extra checks: a regex for known attack phrases, a check that blocks replies leaking the prompt, and a check that blocks numbers not found in the retrieved chunks. These are layers, not a full defence.

## Eval

Run `npm run eval`. It asks 11 questions in `eval/questions.json` and prints a score.
My latest runs scored **11/11** (three runs in a row).

This is a small test:
- Only 11 questions.
- It checks keywords, not meaning.
- It is not proof that the assistant is always right.

I once got 9/11. The FundsApp and Career AI answers were true but missed the words "KYC" and "RAG". I fixed that by adding true lines from my CV to the corpus. I did not change the tests.

## Broken or unfinished

- **Eval is tiny.** 11 questions, keyword matching. A pass does not mean a correct answer.
- **Wording varies between runs.** The same question can come back in different words. A keyword test can pass one run and fail the next.
- **Small wording slips.** The model sometimes says "built and maintained" where my documents say "built and worked with".
- **No streaming.** The answer appears all at once.
- **No automated tests** beyond the eval. I tested the rest by hand.
- **Free-tier limits.** Gemini embeddings allow about 30,000 tokens per minute. Heavy use can show a "busy, try again" message. There is no retry.
- **Chunking is heading-based and not tuned.** I did not compare other chunk sizes.
- **Memory is short.** Only the last 2 turns are kept, and a page reload clears them.
- **Rate limit is per server instance.** On Vercel each instance counts separately, so it is a soft limit.
- **Some questions can still get "I don't know"** when the right chunk is not retrieved.
- **Icons load from Google's CDN.** If it is blocked, icons will not show.
- **Prompt-injection defence is not complete.** It held up in my tests, but I cannot promise it is safe.

## What I left out, and what I would do next

Left out on purpose: a database, login, streaming, a retry for rate limits, and long-term chat memory.

Next, I would:
1. Add a bigger eval set that checks meaning, not only keywords.
2. Add automated tests for the API.
3. Tune chunk size and compare retrieval quality.
4. Stream the answers.
5. Add retry and backoff for rate limits.
6. Add a shared rate limit that works across Vercel instances.

## About how I built it

I used Claude (an AI tool) to help build this project. I can walk through any file and explain it.
