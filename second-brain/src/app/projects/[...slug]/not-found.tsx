import { DocumentLayout } from '@/components/DocumentLayout';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <DocumentLayout folder="projects">
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-muted rounded-2xl">
          <FileQuestion className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The project you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          View All Projects
        </a>
      </div>
    </DocumentLayout>
  );
}