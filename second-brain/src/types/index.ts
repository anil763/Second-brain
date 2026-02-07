export interface Document {
  slug: string;
  title: string;
  content: string;
  frontmatter: {
    title?: string;
    date?: string;
    tags?: string[];
    description?: string;
    [key: string]: unknown;
  };
  folder: 'docs' | 'daily' | 'concepts' | 'spiritual-journey' | 'projects' | 'assets';
  excerpt: string;
}

export interface FolderStructure {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children?: FolderStructure[];
  document?: Document;
}

export interface SearchResult {
  document: Document;
  score: number;
  matches: string[];
}