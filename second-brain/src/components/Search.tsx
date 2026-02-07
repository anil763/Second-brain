'use client';

import { useEffect, useState, useCallback } from 'react';
import { FileText, Calendar, Hash, X, Search as SearchIcon } from 'lucide-react';

interface SearchResult {
  slug: string;
  title: string;
  folder: 'docs' | 'daily' | 'concepts';
  excerpt: string;
  tags?: string[];
  date?: string;
}

interface SearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Search({ open, onOpenChange }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const searchDocuments = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data.results);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchDocuments(query);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, searchDocuments]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(true);
      }
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  if (!open) return null;

  const folderLabels = {
    docs: 'Document',
    daily: 'Daily Note',
    concepts: 'Concept',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative w-full max-w-2xl mx-4 bg-card rounded-lg shadow-2xl border border-border overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <SearchIcon className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs bg-muted rounded border border-border">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-auto">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              {query ? (
                <>
                  <p>No results found for &quot;{query}&quot;</p>
                  <p className="text-sm mt-1">Try searching for something else</p>
                </>
              ) : (
                <>
                  <p>Start typing to search...</p>
                  <p className="text-sm mt-1">Search by title, content, or tags</p>
                </>
              )}
            </div>
          ) : (
            <div className="py-2">
              {results.map((doc) => (
                <a
                  key={`${doc.folder}/${doc.slug}`}
                  href={`/${doc.folder}/${doc.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-muted transition-colors"
                >
                  <FileText className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium truncate">{doc.title}</span>
                      <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground shrink-0">
                        {folderLabels[doc.folder]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {doc.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      {doc.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(doc.date).toLocaleDateString()}
                        </span>
                      )}
                      {doc.tags && doc.tags.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Hash className="w-3 h-3" />
                          {doc.tags.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border text-xs text-muted-foreground bg-muted/50">
          <div className="flex gap-4">
            <span>
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↑↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↵</kbd> to select
            </span>
          </div>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}