import { getAllDocuments } from '@/lib/documents';
import { FolderPage } from '@/components/DocumentLayout';

export default function DocsIndexPage() {
  const documents = getAllDocuments().filter(doc => doc.folder === 'docs');

  return <FolderPage folder="docs" documents={documents} />;
}