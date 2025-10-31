import React, { useState, useMemo } from 'react';
import { fileSystem } from '../data/filesystem';
import { FSItem, Folder, isFolder } from '../types';
import { useClickSound } from '../hooks/useClickSound';

// --- ICONS ---

const FolderIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${className} text-blue-400`}>
    <path d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.25a3 3 0 0 1-2.65-1.5L9.75 1.5a3 3 0 0 0-2.65-1.5H4.5a3 3 0 0 0-3 3v15a3 3 0 0 0 3 3h15Z" />
  </svg>
);

const FileIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${className} text-gray-400`}>
    <path fillRule="evenodd" d="M5.625 1.5H9.375a3 3 0 0 1 2.121.879l5.25 5.25a3 3 0 0 1 .879 2.121v7.125a3 3 0 0 1-3 3H5.625a3 3 0 0 1-3-3V4.5a3 3 0 0 1 3-3Zm5.25 1.5c-.31 0-.613.128-.832.353l-2.5 2.5a1.125 1.125 0 0 1-1.59 0l-.125-.125a1.125 1.125 0 0 1 0-1.59l2.5-2.5a1.125 1.125 0 0 1 .832-.353Z" clipRule="evenodd" />
  </svg>
);

const ImageIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${className} text-green-400`}>
    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06l2.755-2.756a.75.75 0 0 1 .99.03l3.5 4.198a.75.75 0 0 0 1.144-.082l2.325-3.488a.75.75 0 0 1 1.259.132l3.055 4.414A.75.75 0 0 1 18.25 18H3.75a.75.75 0 0 1-.75-.75v-1.19Z" clipRule="evenodd" />
  </svg>
);

const VideoIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${className} text-purple-400`}>
    <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-15Zm-1.5 3a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-9Z" />
    <path d="M9 15.75a.75.75 0 0 0 1.21.623l4.5-3.75a.75.75 0 0 0 0-1.246l-4.5-3.75A.75.75 0 0 0 9 8.25v7.5Z" />
  </svg>
);

const AudioIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${className} text-pink-400`}>
    <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.6V11.25a.75.75 0 0 1-1.5 0V3.362l-10.5 3.182v11.155A3.375 3.375 0 0 1 4.875 21a3.375 3.375 0 0 1 0-6.75 3.313 3.313 0 0 1 1.76.49V9.818l10.5-3.182Z" clipRule="evenodd" />
  </svg>
);


const getFileIcon = (filename: string) => {
    if (/\.(jpg|jpeg|png|gif)$/i.test(filename)) return ImageIcon;
    if (/\.(mp4|mov|avi)$/i.test(filename)) return VideoIcon;
    if (/\.(mp3|wav|ogg)$/i.test(filename)) return AudioIcon;
    return FileIcon;
}

// --- COMPONENTS ---

const FileManager: React.FC = () => {
    const [path, setPath] = useState<string[]>([]); // e.g., ['docs', 'work']
    const playClickSound = useClickSound();
    
    const { currentFolder, breadcrumbs } = useMemo(() => {
        let current: Folder = fileSystem;
        const crumbs: { name: string, path: string[] }[] = [{ name: 'Home', path: [] }];

        for (const id of path) {
            const nextFolder = current.children.find(item => item.id === id && isFolder(item)) as Folder | undefined;
            if (nextFolder) {
                current = nextFolder;
                crumbs.push({ name: nextFolder.name, path: crumbs[crumbs.length - 1].path.concat(id) });
            } else {
                break; // Path is invalid, stop traversing
            }
        }
        return { currentFolder: current, breadcrumbs: crumbs };
    }, [path]);

    const handleItemDoubleClick = (item: FSItem) => {
        playClickSound();
        if (isFolder(item)) {
            setPath(prev => [...prev, item.id]);
        } else {
            console.log(`Opening file: ${item.name}`);
            // In a real app, you'd open a viewer or editor here.
        }
    };

    const navigateTo = (newPath: string[]) => {
        playClickSound();
        setPath(newPath);
    };

    const goBack = () => {
        if (path.length > 0) {
            navigateTo(path.slice(0, -1));
        }
    };

    const sortedChildren = useMemo(() => {
        return [...currentFolder.children].sort((a, b) => {
            if (a.type === b.type) return a.name.localeCompare(b.name); // Sort by name if types are same
            return a.type === 'folder' ? -1 : 1; // Folders first
        });
    }, [currentFolder]);

    return (
        <div className="h-full flex flex-col text-white">
            {/* Toolbar */}
            <div className="flex items-center space-x-2 p-2 bg-black/20 rounded-t-md">
                <button
                  onClick={goBack}
                  disabled={path.length === 0}
                  className="p-2 rounded-md hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Go back"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex items-center text-sm">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <button onClick={() => navigateTo(crumb.path)} className="px-2 py-1 rounded-md hover:bg-white/10">
                                {crumb.name}
                            </button>
                            {index < breadcrumbs.length - 1 && <span className="text-gray-500">/</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* File Grid */}
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-6">
                    {sortedChildren.map(item => {
                        const Icon = isFolder(item) ? FolderIcon : getFileIcon(item.name);
                        return (
                            <div
                              key={item.id}
                              className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-white/10 cursor-pointer"
                              onDoubleClick={() => handleItemDoubleClick(item)}
                              tabIndex={0}
                              onKeyPress={(e) => e.key === 'Enter' && handleItemDoubleClick(item)}
                            >
                                <Icon className="w-16 h-16" />
                                <span className="mt-2 text-xs font-medium break-all">{item.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FileManager;
