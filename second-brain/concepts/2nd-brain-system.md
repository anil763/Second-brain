---
title: "2nd Brain System"
date: 2026-02-05
type: concept
tags: [meta, system, knowledge-management]
---

# 2nd Brain System

## What Is This?

A NextJS app that serves as a living knowledge base — capturing our work, ideas, and progress over time. Think of it as a hybrid between Obsidian (markdown-based, wiki-linked) and Linear (clean, fast, minimal).

## Why It Matters

**Without a second brain:**
- Ideas get lost in chat history
- Insights from yesterday disappear
- Patterns remain invisible
- Progress feels scattered

**With a second brain:**
- Every discussion leaves a trace
- Concepts get refined over time
- Connections become visible
- Growth becomes tangible

## Structure

```
second-brain/
├── daily/          # Journal entries — one per day
├── concepts/       # Deep dives — one per big idea
├── docs/           # General notes
└── projects/       # Project workspaces
```

## How It Works

### Daily Journals
Every day gets an entry. Not a transcript — a synthesis. What did we discuss? What decisions were made? What insights emerged?

### Concept Documents
When we explore something important — a pattern, a system, a belief — it gets its own page. These grow and link together over time.

### Project Spaces
Active work gets dedicated space. UGC strategy, spiritual business growth, healing journey — each can have its own folder.

## Writing Style

- **Concise** — Capture essence, not every word
- **Linked** — Use [[wiki-links]] to connect ideas
- **Tagged** — Frontmatter tags for discoverability
- **Dated** — Everything has a timestamp

## Usage

Run locally:
```bash
cd second-brain
npm install
npm run dev
```

Or deploy to Vercel/Netlify for web access.

## Future Enhancements

- [ ] Graph view (like Obsidian)
- [ ] Backlinks panel
- [ ] Daily note templates
- [ ] Mobile app
- [ ] AI-powered connections

## Related
- [[Knowledge Management]]
- [[Daily Journaling Practice]]
