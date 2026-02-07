import { getAllDocuments } from '@/lib/documents';
import { FolderPage } from '@/components/DocumentLayout';

export default function ConceptsIndexPage() {
  const documents = getAllDocuments().filter(doc => doc.folder === 'concepts');

  return <FolderPage folder="concepts" documents={documents} />;
}