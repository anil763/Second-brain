'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Search } from '@/components/Search';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DocumentViewer } from '@/components/DocumentViewer';
import { Menu, Search as SearchIcon, Brain } from 'lucide-react';
import { Document } from '@/types';

interface DocumentLayoutProps {
  children: React.ReactNode;
  document?: Document;
  folder: string;
}

export function DocumentLayout({ children, document, folder }: DocumentLayoutProps) {
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

        {/* Document content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Search Dialog */}
      <Search open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

interface FolderPageProps {
  folder: 'docs' | 'daily' | 'concepts' | 'spiritual-journey' | 'projects' | 'assets';
  documents: Document[];
}

export function FolderPage({ folder, documents }: FolderPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const folderTitles: Record<string, string> = {
    docs: 'Documents',
    daily: 'Daily Notes',
    concepts: 'Concepts',
    'spiritual-journey': 'Spiritual Journey',
    projects: 'Projects',
    assets: 'Assets',
  };

  const folderDescriptions: Record<string, string> = {
    docs: 'All your notes, articles, and reference materials.',
    daily: 'Daily journal entries and fleeting notes.',
    concepts: 'Deep dives on important topics and ideas.',
    'spiritual-journey': 'Personal stories of healing, awakening, and transformation.',
    projects: 'Active projects, landing pages, and business initiatives.',
    assets: 'Email sequences, templates, and reusable business assets.',
  };

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

        {/* Folder content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{folderTitles[folder]}</h1>
              <p className="text-muted-foreground">{folderDescriptions[folder]}</p>
            </div>

            {documents.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground">No documents yet.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Create a markdown file in the <code className="bg-muted px-1.5 py-0.5 rounded">{folder}/</code> folder to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <a
                    key={doc.slug}
                    href={`/${folder}/${doc.slug}`}
                    className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {doc.excerpt}
                        </p>
                      </div>
                      {doc.frontmatter.date && (
                        <time className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(doc.frontmatter.date).toLocaleDateString()}
                        </time>
                      )}
                    </div>
                    {doc.frontmatter.tags && doc.frontmatter.tags.length > 0 && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {doc.frontmatter.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Search Dialog */}
      <Search open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}