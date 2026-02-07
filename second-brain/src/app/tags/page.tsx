import { getAllTags } from '@/lib/documents';
import { Hash } from 'lucide-react';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Tags</h1>
        <p className="text-muted-foreground">
          Browse all {tags.length} tags used across your documents.
        </p>
      </div>

      {tags.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground">No tags yet.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add tags to your documents using frontmatter.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <a
              key={tag}
              href={`/tags/${tag}`}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent transition-all"
            >
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{tag}</span>
              <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full text-muted-foreground">
                {count}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}