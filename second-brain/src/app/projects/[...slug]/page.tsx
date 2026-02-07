import { getAllDocuments } from '@/lib/documents';
import { DocumentLayout } from '@/components/DocumentLayout';
import { DocumentViewer } from '@/components/DocumentViewer';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string[] };
}

export async function generateStaticParams() {
  const documents = getAllDocuments().filter(doc => doc.folder === 'projects');
  return documents.map((doc) => ({
    slug: doc.slug.split('/'),
  }));
}

export default function ProjectPage({ params }: PageProps) {
  const slug = params.slug.join('/');
  const document = getAllDocuments().find(
    doc => doc.folder === 'projects' && doc.slug === slug
  );

  if (!document) {
    notFound();
  }

  return (
    <DocumentLayout document={document} folder="projects">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <DocumentViewer document={document} />
      </div>
    </DocumentLayout>
  );
}