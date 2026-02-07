import { getAllDocuments } from '@/lib/documents';
import { FolderPage } from '@/components/DocumentLayout';

export default function ProjectsPage() {
  const documents = getAllDocuments().filter(d => d.folder === 'projects');
  return <FolderPage folder="projects" documents={documents} />;
}