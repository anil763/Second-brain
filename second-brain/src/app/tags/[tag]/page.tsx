import { getAllTags, getDocumentsByTag, getAllDocuments } from '@/lib/documents';
import { FolderPage } from '@/components/DocumentLayout';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { tag: string };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag,
  }));
}

export default function TagPage({ params }: PageProps) {
  const documents = getDocumentsByTag(params.tag);

  if (documents.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">#</span>
          <h1 className="text-3xl font-bold">{params.tag}</h1>
        </div>
        <p className="text-muted-foreground">
          {documents.length} document{documents.length !== 1 ? 's' : ''} tagged with &quot;{params.tag}&quot;
        </p>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <a
            key={`${doc.folder}/${doc.slug}`}
            href={`/${doc.folder}/${doc.slug}`}
            className="block p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{doc.title}</h3>
                  <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                    {doc.folder}
                  </span>
                </div>
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
          </a>
        ))}
      </div>
    </div>
  );
}