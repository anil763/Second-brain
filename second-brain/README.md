# Second Brain 🧠

A personal knowledge management system built with Next.js. Inspired by Obsidian and Linear.

> **Auto-deployment active** - Connected to GitHub → Vercel pipeline 🚀

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- 📝 **Markdown-First** - All notes stored as plain markdown files
- 🔗 **Wiki Links** - Connect notes with `[[Wiki Links]]`
- 🔍 **Full-Text Search** - Press `⌘K` to search everything instantly
- 🏷️ **Tags** - Organize with frontmatter tags
- 🌓 **Dark/Light Mode** - System-aware theme switching
- 📱 **Mobile Responsive** - Works great on all devices
- ⚡ **Fast** - Static generation for instant page loads

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone or copy this project:

```bash
cd second-brain
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
second-brain/
├── docs/                  # General documents and notes
│   └── *.md
├── daily/                 # Daily journal entries
│   └── YYYY-MM-DD.md
├── concepts/              # Deep dives on topics
│   └── *.md
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and helpers
│   └── types/            # TypeScript types
├── package.json
└── README.md
```

## Creating Notes

### Frontmatter

Each note supports YAML frontmatter:

```yaml
---
title: My Note Title
date: 2024-01-15
tags: [idea, project, important]
description: A brief description
---

# My Note

Content goes here...
```

### Wiki Links

Connect notes using wiki-style links:

```markdown
Check out the [[Zettelkasten Method]] for more info.
```

### Daily Notes

Create daily notes in the `daily/` folder with the format `YYYY-MM-DD.md`:

```
daily/
├── 2024-01-14.md
├── 2024-01-15.md
└── 2024-01-16.md
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open search |
| `Escape` | Close search |

## Customization

### Themes

The app uses CSS custom properties for theming. Edit `src/app/globals.css` to customize colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

### Adding Folders

To add a new content folder:

1. Create the folder in the project root
2. Add it to `CONTENT_DIRS` in `src/lib/documents.ts`
3. Create corresponding pages in `src/app/`

## Tech Stack

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Frontmatter parsing
- **[react-markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[lucide-react](https://lucide.dev/)** - Beautiful icons
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

## Building for Production

```bash
npm run build
npm start
```

## License

MIT - Do whatever you want with it!

---

Made with ❤️ and lots of ☕