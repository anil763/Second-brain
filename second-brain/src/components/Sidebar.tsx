'use client';

import { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  FileText,
  Folder,
  FolderOpen,
  Hash,
  Home,
  BookOpen,
  Calendar,
  Lightbulb,
  Heart,
} from 'lucide-react';

interface FolderItem {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children?: FolderItem[];
}

interface Tag {
  tag: string;
  count: number;
}

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['docs', 'daily', 'concepts']));
  const [structure, setStructure] = useState<{ docs: FolderItem[]; daily: FolderItem[]; concepts: FolderItem[]; 'spiritual-journey': FolderItem[]; projects: FolderItem[]; assets: FolderItem[] }>({
    docs: [],
    daily: [],
    concepts: [],
    'spiritual-journey': [],
    projects: [],
    assets: [],
  });
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetch('/api/structure')
      .then(res => res.json())
      .then(data => {
        setStructure(data.structure || { docs: [], daily: [], concepts: [] });
        setTags(data.tags || []);
      })
      .catch(console.error);
  }, []);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderTree = (nodes: FolderItem[], level = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedFolders.has(node.path);
      const hasChildren = node.children && node.children.length > 0;
      const isFolder = node.type === 'folder';

      return (
        <div key={node.path}>
          <div
            className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted cursor-pointer group"
            style={{ paddingLeft: `${12 + level * 12}px` }}
            onClick={() => {
              if (isFolder) {
                toggleFolder(node.path);
              } else {
                window.location.href = `/${node.path}`;
                onClose?.();
              }
            }}
          >
            {isFolder && (
              <span className="text-muted-foreground">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </span>
            )}
            {!isFolder && <span className="w-4" />}
            
            <span className="text-muted-foreground group-hover:text-foreground">
              {isFolder ? (
                isExpanded ? (
                  <FolderOpen className="w-4 h-4" />
                ) : (
                  <Folder className="w-4 h-4" />
                )
              ) : (
                <FileText className="w-4 h-4" />
              )}
            </span>
            
            <span className="truncate">{node.name}</span>
          </div>

          {isFolder && isExpanded && hasChildren && (
            <div>
              {renderTree(node.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Sidebar header */}
      <div className="p-4 border-b border-sidebar-border">
        <a href="/" className="flex items-center gap-2 text-sidebar-foreground">
          <Home className="w-5 h-5" />
          <span className="font-semibold">Second Brain</span>
        </a>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-2">
        {/* Main folders */}
        <div className="px-3 py-2">
          <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Folders
          </p>
          
          <a
            href="/docs"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-border/50 rounded-md"
          >
            <BookOpen className="w-4 h-4" />
            <span>Documents</span>
          </a>
          
          <a
            href="/daily"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-border/50 rounded-md"
          >
            <Calendar className="w-4 h-4" />
            <span>Daily Notes</span>
          </a>
          
          <a
            href="/concepts"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-border/50 rounded-md"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Concepts</span>
          </a>
          
          <a
            href="/spiritual-journey"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-border/50 rounded-md"
          >
            <Heart className="w-4 h-4" />
            <span>Spiritual Journey</span>
          </a>

          <a
            href="/projects"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-border/50 rounded-md"
          >
            <Folder className="w-4 h-4" />
            <span>Projects</span>
          </a>

          <a
            href="/assets"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-border/50 rounded-md"
          >
            <Folder className="w-4 h-4" />
            <span>Assets</span>
          </a>
        </div>

        {/* Folder trees */}
        {structure.docs.length > 0 && (
          <div className="mt-4">
            <p className="px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Docs
            </p>
            {renderTree(structure.docs)}
          </div>
        )}

        {structure.daily.length > 0 && (
          <div className="mt-4">
            <p className="px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Daily
            </p>
            {renderTree(structure.daily)}
          </div>
        )}

        {structure.concepts.length > 0 && (
          <div className="mt-4">
            <p className="px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Concepts
            </p>
            {renderTree(structure.concepts)}
          </div>
        )}

        {structure['spiritual-journey'].length > 0 && (
          <div className="mt-4">
            <p className="px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Spiritual Journey
            </p>
            {renderTree(structure['spiritual-journey'])}
          </div>
        )}

        {structure.projects.length > 0 && (
          <div className="mt-4">
            <p className="px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Projects
            </p>
            {renderTree(structure.projects)}
          </div>
        )}

        {structure.assets.length > 0 && (
          <div className="mt-4">
            <p className="px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              Assets
            </p>
            {renderTree(structure.assets)}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-6 px-3">
            <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Tags
            </p>
            <div className="space-y-1">
              {tags.slice(0, 10).map(({ tag, count }) => (
                <a
                  key={tag}
                  href={`/tags/${tag}`}
                  className="flex items-center justify-between px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-border/50 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{tag}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{count}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}