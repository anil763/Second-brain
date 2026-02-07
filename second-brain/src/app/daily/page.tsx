import { getAllDocuments } from '@/lib/documents';
import { FolderPage } from '@/components/DocumentLayout';

export default function DailyIndexPage() {
  const documents = getAllDocuments().filter(doc => doc.folder === 'daily');

  return <FolderPage folder="daily" documents={documents} />;
}