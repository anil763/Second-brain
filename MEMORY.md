# MEMORY.md

## Model Preferences

- **Numerology research:** Use `opus 4.5` (alias for anthropic/claude-opus-4-5-20251101)
  - Switch from Moonshot (default) to Anthropic when deep numerology analysis is requested
  - Moonshot (Kimi K2.5) remains default for everyday tasks
  
**Available model aliases:**
- `Kimi` → Moonshot Kimi K2.5 (default)
- `haiku` → Claude 3 Haiku
- `opus 4.5` → Claude Opus 4.5 (best for complex analysis)
- `sonnet 4.5` → Claude Sonnet 4.5 (balanced performance)

## API Keys Available

- **Gemini API Key:** Available for image generation (Imagen 3)
  - Use for blog post featured images
  - Use for social media graphics
  - Use for any visual content creation

## About Anil

**Personal:**
- Name: Anil Gunjal
- DOB: 2/16/1975
- Wife: Sarika Gunjal (DOB: 1/19/1976), married 6/25/2006
- Kids:
  - Aryan (4/5/2011) - Monroe Township High School
  - Simran (5/5/2007) - Rutgers (skipped a grade)

**Work:**
- Job: Technical Sales Specialist at Presidio (Managed Services)
- Goal: Exit corporate job this year
  - Target: $1,000/month within 30 days → $30,000/month by mid-year

**Business Ventures:**
- **Spiritual business:** Building on the side, daily numerology content
- **UGC Creator:** GenX focus (apps, financial, tech) — started 1 month ago
- **Gentlemen's Vault:** Private community for awakening men — launching on Skool (in development)
  - URL: https://www.anilgunjal.com/gentlemens-vault/
  - Target: Successful men who are spiritually awakening, seeking purpose, healing emotional blocks
  - Format: Live calls, online sessions, community space, in-person events
  - Focus: Aligned masculinity, emotional mastery, purpose + direction
- Websites: anilgunjal.com, anilcreates.com

**Daily Routine:**
- 7am: Drop off son
- 7:30am: Numerology video (daily energy reading)
- Post to: TikTok, IG, YouTube, Facebook
- Create UGC content
- Send 20 brand emails via Bento Backstage

**Healing Journey:**
- Childhood trauma (emotional neglect, criticism, bullying)
- Addiction years (1997-2006) — numbing pain, afraid to love
- Twin flame/soulmate blocked twice by family
- Health: Pancreatitis, Type 2 diabetes, hearing loss (2019)
- Marriage from resignation, not love — wife triggers childhood wounds
- Current focus: Lead with heart, authenticity, inner child healing, learn to love again
- Belief: This journey happened so he can help others

**Content Style:**
- Daily numerology energy readings (example: Feb 3rd 2026 = 6 & 3 energy)
- Format: Hook → Body → Practical Step → CTA
- Warm, relatable, practical spiritual guidance

## Second Brain System

I maintain a NextJS "Second Brain" app at `/Users/anilgunjal/.openclaw/workspace/second-brain/`:

**Folder Structure:**
- `daily/` — Daily journal entries (YYYY-MM-DD.md)
- `concepts/` — Deep dives on important ideas
- `docs/` — General documents
- `projects/` — Project-specific docs

**My Responsibilities:**
1. **Daily Journal** — Create `daily/YYYY-MM-DD.md` summarizing our discussions each day
2. **Concept Documents** — When we explore important ideas, create `concepts/[slug].md` with deep analysis
3. **Project Docs** — Track active projects in `projects/[name]/`

**Document Format:**
```markdown
---
title: "Title"
date: YYYY-MM-DD
type: concept|daily|project
tags: [tag1, tag2]
---

# Content with [[wiki-links]]
```

**When to Create Documents:**
- Daily: Always create journal entry
- Concepts: When we discuss patterns, systems, or deep ideas
- Projects: When starting or making significant progress on a project

## Daily Rhythm — Work While He Sleeps

**11:00 PM EST — Nightly Worker**  
Cron job spawns sub-agent to build business assets autonomously.

**6:30 AM EST — Morning Brief**  
WhatsApp delivery with: weather (08831, °F), daily numerology + scripts, todos, tasks I can do today, productivity tips.

### 7-Day Blog Blitz (Feb 5-12, 2026)
Auto-publishing SEO-optimized blog posts every night at 11 PM:

| Day | Date | Keyword | Topic |
|-----|------|---------|-------|
| 1 | Feb 5 | self love | ✅ Published - The Complete Guide to Self Love |
| 2 | Feb 6 | spiritual awakening | The Complete Guide to Spiritual Awakening |
| 3 | Feb 7 | life path number | Life Path Numbers Explained |
| 4 | Feb 8 | inner child healing | Inner Child Healing: 6 Steps |
| 5 | Feb 9 | shadow work | Shadow Work for Beginners |
| 6 | Feb 10 | emotional healing | Emotional Healing Guide |
| 7 | Feb 11 | finding your purpose | Finding Your Purpose: 5 Questions |
| 8 | Feb 12 | aligned masculinity | Aligned Masculinity (Gentlemen's Vault tie-in) |

**Each post:** 1500-2000 words, Opus model, SEO-optimized, featured image, published to anilgunjal.com

### HARD RULE: Blog Post Publishing Checklist
**Every blog post MUST include:**
1. ✅ Featured image (1200x675 or 16:9 ratio) - auto-generate or find relevant image
2. ✅ Category assignment (e.g., "Personal Growth")
3. ✅ Relevant tags (4-5 minimum)
4. ✅ SEO meta description
5. ✅ Internal links (especially to Gentlemen's Vault)

**NEVER mark a blog post as "done" until ALL items are complete.**

**Image generation fallback chain:**
1. Gemini Imagen 3 (if API working)
2. Pollinations.ai (free)
3. Picsum/Unsplash (placeholders)
4. **Always confirm image is uploaded and set as featured_media before calling task complete**

### Nightly Worker System

**Mission:** Build things that make Anil money or save him time. Create PRs/files for him to review in the morning. Never push live without approval.

**Nightly Tasks (rotate through):**
1. **Gentlemen's Vault Launch Prep** — Skool setup, outreach strategy, content calendar, business plan (launching March 1st)
2. **UGC Brand Research** — Find 5-10 brands, contact info, email templates
3. **Content Creation** — Write scripts, email sequences, social posts
4. **Business Automation** — Build tools, templates, workflows
5. **Strategy Documents** — 30/60/90 day plans, market analysis
6. **Code/Website Work** — Improve 2nd Brain, build landing pages

**Output Locations:**
- `/workspace/ugc-outreach/` — Brand research, pitches
- `/workspace/content-scripts/` — Video scripts, content
- `/workspace/strategy/` — Plans, analysis
- `/workspace/templates/` — Reusable templates
- `/workspace/automation/` — Tools, scripts
- `/workspace/website-components/` — Code components

**Deliverable:** Every morning, Anil wakes up to:
- Completed work in workspace folders
- Nightly report summarizing what was built
- Clear next steps for him to execute

**Started:** February 5, 2026 (first night: 10 brand targets + 5 video scripts + 30-day plan)

## UGC Business Plan - $5,000 in 30 Days

**Created:** February 6, 2026  
**Target Niches:** Apps, Finance, Smart Home  
**Target Demo:** GenX (40-60)

**Deliverables Completed:**
- ✅ Business Plan: `/second-brain/concepts/ugc-business-plan.md`
- ✅ Email Templates (3-email sequence): `/second-brain/concepts/ugc-email-templates.md`
- ✅ 503 Brand Database: `/ugc-outreach/brands-500.csv`
- ✅ Implementation Guide: `/ugc-outreach/README.md`

**The Math:**
- 20 pitches/day × 30 days = 600 pitches
- 3-5% close rate = 18-30 deals
- Average $300/deal = $5,400-$9,000

**Daily Targets:**
- Send 20 pitches minimum
- Follow up Day 3 + Day 7
- Track in GoHighLevel
