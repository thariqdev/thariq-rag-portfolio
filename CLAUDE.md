# talk-rag-portfolio

## Goal
A one-page personal site with a chat assistant, "Talk to Thariq".
It answers questions from my own documents using RAG.
It must say "I don't know" when the answer is not in the documents.
Built for the HireStella AI Developer assessment. Deadline: [ADD DATE/TIME].

## Stack
- Next.js App Router, TypeScript, Tailwind
- Hosting: Vercel Hobby (free)
- LLM: Groq gpt-oss-20b first (it is fast), Gemini Flash as the fallback (both free)
- Embeddings: Gemini embeddings
- Vector store: JSON file (`data/vectors.json`), cosine similarity in memory
- Zero budget. Free tiers only.

## Hard rules
- API keys only on the server, in env vars.
- Never commit `.env.local`. Keep it in `.gitignore`.
- No API key in client code.
- No private data in the corpus: no ID numbers, home address or phone number.
- The LLM must receive retrieved chunks in the prompt. No whole-CV prompt.
- Do not fake retrieval with keyword matching.
- If the answer is not in the retrieved chunks, the assistant says it doesn't know.

## Structure
- `/corpus`: markdown source documents
- `/scripts/ingest.ts`: rebuilds the index
- `/data/vectors.json`: generated index
- `/app/api/chat/route.ts`: chat endpoint
- `/components`: widget and page sections

## Working style
- Do one step at a time.
- Explain each file in 2 short sentences.
- Keep the code simple. I must be able to explain every file.
- Use short comments for the key decisions.
- Tell me before adding any new dependency.
- Do not add features I did not ask for.

## Build order
1. Corpus files
2. Ingest script
3. Chat API with retrieval
4. Grounded refusal
5. Widget
6. One-page site
7. Deploy and README

## README must include
- How to run
- Chunking choice (one line)
- Model choices (one line each)
- What is broken or unfinished (be honest)