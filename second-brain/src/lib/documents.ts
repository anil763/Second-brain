import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename, relative } from 'path';
import matter from 'gray-matter';
import { Document, FolderStructure } from '@/types';

const CONTENT_DIRS = {
  docs: join(process.cwd(), 'docs'),
  daily: join(process.cwd(), 'daily'),
  concepts: join(process.cwd(), 'concepts'),
  'spiritual-journey': join(process.cwd(), 'spiritual-journey'),
  projects: join(process.cwd(), 'projects'),
  assets: join(process.cwd(), 'assets'),
};

export function getAllDocuments(): Document[] {
  const documents: Document[] = [];

  for (const [folder, dirPath] of Object.entries(CONTENT_DIRS)) {
    try {
      const docs = getDocumentsFromDir(dirPath, folder as 'docs' | 'daily' | 'concepts' | 'spiritual-journey' | 'projects' | 'assets');
      documents.push(...docs);
    } catch (error) {
      // Directory might not exist yet
      console.warn(`Directory ${dirPath} not found`);
    }
  }

  return documents.sort((a, b) => {
    const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    return dateB - dateA;
  });
}

function getDocumentsFromDir(dir: string, folder: 'docs' | 'daily' | 'concepts' | 'spiritual-journey' | 'projects' | 'assets'): Document[] {
  const documents: Document[] = [];

  function traverse(currentDir: string) {
    const items = readdirSync(currentDir);

    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md')) {
        const content = readFileSync(fullPath, 'utf-8');
        const { data, content: markdownContent } = matter(content);
        const relativePath = relative(dir, fullPath);
        const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');

        documents.push({
          slug,
          title: data.title || slug.split('/').pop() || slug,
          content: markdownContent,
          frontmatter: data,
          folder,
          excerpt: generateExcerpt(markdownContent),
        });
      }
    }
  }

  traverse(dir);
  return documents;
}

function generateExcerpt(content: string, maxLength = 200): string {
  return content
    .replace(/#+ /g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\*\*|__/g, '')
    .slice(0, maxLength)
    .trim() + (content.length > maxLength ? '...' : '');
}

export function getDocumentBySlug(slug: string): Document | null {
  const allDocs = getAllDocuments();
  return allDocs.find(doc => doc.slug === slug) || null;
}

export function getFolderStructure(folder: 'docs' | 'daily' | 'concepts' | 'spiritual-journey' | 'projects' | 'assets'): FolderStructure {
  const dir = CONTENT_DIRS[folder];
  const name = folder.charAt(0).toUpperCase() + folder.slice(1);

  const root: FolderStructure = {
    name,
    path: folder,
    type: 'folder',
    children: [],
  };

  try {
    const documents = getDocumentsFromDir(dir, folder);
    
    for (const doc of documents) {
      const parts = doc.slug.split('/');
      let current = root;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLast = i === parts.length - 1;
        const currentPath = parts.slice(0, i + 1).join('/');
        
        if (isLast) {
          current.children = current.children || [];
          current.children.push({
            name: doc.title,
            path: `${folder}/${currentPath}`,
            type: 'file',
            document: doc,
          });
        } else {
          current.children = current.children || [];
          let folderChild = current.children.find(
            child => child.type === 'folder' && child.name === part
          );
          
          if (!folderChild) {
            folderChild = {
              name: part,
              path: `${folder}/${currentPath}`,
              type: 'folder',
              children: [],
            };
            current.children.push(folderChild);
          }
          
          current = folderChild;
        }
      }
    }
  } catch (error) {
    console.warn(`Error reading folder ${folder}:`, error);
  }

  return root;
}

export function searchDocuments(query: string): Document[] {
  const documents = getAllDocuments();
  const lowercaseQuery = query.toLowerCase();
  
  return documents
    .map(doc => {
      const titleMatch = doc.title.toLowerCase().includes(lowercaseQuery);
      const contentMatch = doc.content.toLowerCase().includes(lowercaseQuery);
      const tagMatch = doc.frontmatter.tags?.some(tag => 
        tag.toLowerCase().includes(lowercaseQuery)
      );
      
      let score = 0;
      if (titleMatch) score += 3;
      if (contentMatch) score += 1;
      if (tagMatch) score += 2;
      
      return { doc, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ doc }) => doc);
}

export function getAllTags(): { tag: string; count: number }[] {
  const documents = getAllDocuments();
  const tagCounts = new Map<string, number>();
  
  for (const doc of documents) {
    for (const tag of doc.frontmatter.tags || []) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }
  
  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getDocumentsByTag(tag: string): Document[] {
  const documents = getAllDocuments();
  return documents.filter(doc => 
    doc.frontmatter.tags?.includes(tag)
  );
}