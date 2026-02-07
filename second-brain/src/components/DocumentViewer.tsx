'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { Document } from '@/types';
import { Calendar, Hash, Clock } from 'lucide-react';

interface DocumentViewerProps {
  document: Document;
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Custom component for wiki links [[Like This]]
  const WikiLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    // Check if it's a wiki link
    if (href.startsWith('[') && href.endsWith(']')) {
      const linkText = href.slice(2, -2);
      // Try to find the document
      return (
        <a
          href={`/docs/${linkText.toLowerCase().replace(/\s+/g, '-')}`}
          className="wiki-link"
        >
          {children}
        </a>
      );
    }
    return <a href={href}>{children}</a>;
  };

  return (
    <article className="max-w-none">
      {/* Header */}
      <header className="mb-8 pb-8 border-b border-border">
        <h1 className="text-4xl font-bold mb-4">{document.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {document.frontmatter.date && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time>{formatDate(document.frontmatter.date)}</time>
            </div>
          )}
          
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{document.folder}</span>
          </div>
        </div>

        {document.frontmatter.tags && document.frontmatter.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Hash className="w-4 h-4 text-muted-foreground" />
            {document.frontmatter.tags.map((tag) => (
              <a
                key={tag}
                href={`/tags/${tag}`}
                className="text-sm px-2.5 py-1 bg-muted hover:bg-muted/80 rounded-full text-muted-foreground transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        )}

        {document.frontmatter.description && (
          <p className="mt-4 text-lg text-muted-foreground italic">
            {document.frontmatter.description}
          </p>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug]}
          components={{
            a: ({ href, children }) => {
              // Handle wiki links [[Page Name]]
              if (typeof href === 'string' && href.startsWith('[') && href.endsWith(']')) {
                const linkText = href.slice(2, -2);
                const slug = linkText.toLowerCase().replace(/\s+/g, '-');
                return (
                  <a href={`/docs/${slug}`} className="wiki-link">
                    {children}
                  </a>
                );
              }
              return (
                <a href={href} className="text-primary hover:underline">
                  {children}
                </a>
              );
            },
            code: ({ children, className }) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <code className={className}>{children}</code>
              ) : (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            },
          }}
        >
          {document.content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </article>
  );
}