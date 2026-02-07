import { getAllDocuments } from '@/lib/documents';
import { FolderPage } from '@/components/DocumentLayout';

export default function SpiritualJourneyIndexPage() {
  const documents = getAllDocuments().filter(doc => doc.folder === 'spiritual-journey');

  return <FolderPage folder="spiritual-journey" documents={documents} />;
}