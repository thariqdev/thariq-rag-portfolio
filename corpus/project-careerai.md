# Career AI — Job Search Assistant

## Overview
Career AI is a full stack web app built by Thariq.
It helps with job search: skills, job matching, interview prep and application tracking.
It includes a RAG assistant.
The code is public at github.com/thariqdev/career-ai.

## Tech stack
The frontend uses Next.js (App Router), TypeScript and Tailwind CSS.
The backend uses FastAPI, SQLAlchemy 2 and Alembic migrations.
The database is PostgreSQL.
Tests use pytest. CI runs on GitHub Actions.
It is hosted on Vercel, Render and Neon.

## Proof-based skills
Each skill has a status: VERIFIED, PARTIAL, PROVISIONAL or NOT_VERIFIED.
A skill is only verified when there is evidence for it.

## Job matching
Career AI compares a job description with the user's skills.
It lists the gaps between them.

## RAG assistant
Career AI has a RAG assistant.
It uses hybrid retrieval: BM25 keyword search plus embeddings.
It also has read-only SQL tools.

## AI models
Extraction can use a local Ollama model (llama3.2, nomic-embed-text) or Claude.
The AI models are optional.

## Other features
It has interview prep and application tracking.