import React from 'react';

export interface App {
  id: string;
  name: string;
  // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  // UPDATE: Changed from React.ReactElement to a component type for more robust rendering.
  icon: React.ComponentType<{ className?: string }>;
}

export interface Shelf {
  id: string;
  name: string;
  apps: App[];
}

export interface Theme {
  id:string;
  name: string;
  background: string;
  cursor: string;
  clickSound: string;
}

// File System Types
export type FSItemType = 'folder' | 'file';

// FIX: Refactored FSItem to be a discriminated union type.
// This correctly models that an item is either a Folder or a File,
// resolving errors with object literals in data/filesystem.ts.
export interface Folder {
    name: string;
    type: 'folder';
    id: string;
    children: FSItem[];
}

export interface File {
    name: string;
    type: 'file';
    id: string;
    content?: string; // e.g., for text files
}

export type FSItem = Folder | File;

export function isFolder(item: FSItem): item is Folder {
    return item.type === 'folder';
}

export interface OpenApp {
    id: string;
    component: React.ReactNode;
    title: string;
    minimized: boolean;
}

// Trash and Context Menu Types
export type TrashItem = 
    | { type: 'app'; item: App }
    | { type: 'file'; item: FSItem; originalPath: string[] };

export interface ContextMenuItem {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    separator?: boolean;
    disabled?: boolean;
}