import { getAllDocuments } from '@/lib/documents';
import { FolderPage } from '@/components/DocumentLayout';

export default function AssetsPage() {
  const documents = getAllDocuments().filter(d => d.folder === 'assets');
  return <FolderPage folder="assets" documents={documents} />;
}