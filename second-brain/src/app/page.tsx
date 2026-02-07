'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Search } from '@/components/Search';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, Search as SearchIcon, Brain } from 'lucide-react';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <a href="/" className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-semibold text-lg hidden sm:inline">Second Brain</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors"
            >
              <SearchIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-background rounded border border-border">
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Welcome content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-2xl">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Welcome to Second Brain</h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Your personal knowledge management system. Capture, connect, and retrieve your ideas effortlessly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <QuickLinkCard
                href="/docs"
                title="Documents"
                description="Browse all your notes and articles"
                icon="📄"
              />
              <QuickLinkCard
                href="/daily"
                title="Daily Notes"
                description="Your daily journal entries"
                icon="📅"
              />
              <QuickLinkCard
                href="/concepts"
                title="Concepts"
                description="Deep dives on important topics"
                icon="💡"
              />
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Getting Started</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-medium">1.</span>
                  <span>Create markdown files in the <code className="bg-muted px-1.5 py-0.5 rounded text-sm">docs/</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-sm">daily/</code>, or <code className="bg-muted px-1.5 py-0.5 rounded text-sm">concepts/</code> folders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-medium">2.</span>
                  <span>Use <code className="bg-muted px-1.5 py-0.5 rounded text-sm">[[Wiki Links]]</code> to connect your notes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-medium">3.</span>
                  <span>Add tags in frontmatter: <code className="bg-muted px-1.5 py-0.5 rounded text-sm">tags: [idea, project]</code></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-medium">4.</span>
                  <span>Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-sm border border-border">⌘K</kbd> or <kbd className="px-1.5 py-0.5 bg-muted rounded text-sm border border-border">Ctrl+K</kbd> to search</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>

      {/* Search Dialog */}
      <Search open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

function QuickLinkCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      className="block p-6 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent transition-all group"
    >
      <span className="text-3xl mb-3 block">{icon}</span>
      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  );
}