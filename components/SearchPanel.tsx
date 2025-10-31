import React, { useState, useEffect, useMemo, useRef } from 'react';
import { App, FSItem, isFolder } from '../types';
import { APPS, BrowserIcon, SearchIcon } from '../constants';
import { fileSystem } from '../data/filesystem';
import { useClickSound } from '../hooks/useClickSound';

type Result =
  | { type: 'app'; item: App }
  | { type: 'file'; item: FSItem; path: string }
  | { type: 'web'; query: string };

interface SearchPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onAppClick: (app: App) => void;
    searchFiles: boolean;
    searchApps: boolean;
    searchInternet: boolean;
}

const searchFileSystem = (node: FSItem, query: string, currentPath: string[] = []): { item: FSItem; path: string }[] => {
    let results: { item: FSItem; path: string }[] = [];
    const newPath = [...currentPath, node.name];

    if (node.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({ item: node, path: newPath.join(' / ') });
    }

    if (isFolder(node)) {
        for (const child of node.children) {
            results = results.concat(searchFileSystem(child, query, newPath));
        }
    }
    return results;
};

const SearchPanel: React.FC<SearchPanelProps> = ({
    isOpen,
    onClose,
    onAppClick,
    searchFiles,
    searchApps,
    searchInternet,
}) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const playClickSound = useClickSound();
    
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        } else {
            setQuery(''); // Reset query when closed
        }
    }, [isOpen]);

    const results: Result[] = useMemo(() => {
        if (!query) return [];

        const lowerCaseQuery = query.toLowerCase();
        let allResults: Result[] = [];

        if (searchApps) {
            const appResults: Result[] = Object.values(APPS)
                .filter(app => app.name.toLowerCase().includes(lowerCaseQuery))
                .map(app => ({ type: 'app', item: app }));
            allResults = allResults.concat(appResults);
        }

        if (searchFiles) {
            const fileResults: Result[] = searchFileSystem(fileSystem, query)
                .map(res => ({ type: 'file', item: res.item, path: res.path }));
            allResults = allResults.concat(fileResults);
        }

        if (searchInternet) {
            allResults.push({ type: 'web', query });
        }

        return allResults;
    }, [query, searchApps, searchFiles, searchInternet]);

    const handleResultClick = (result: Result) => {
        playClickSound();
        if (result.type === 'app') {
            onAppClick(result.item);
        } else if (result.type === 'file') {
            console.log(`Opening file: ${result.path}`);
        } else if (result.type === 'web') {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(result.query)}`, '_blank');
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center pt-24" onClick={onClose}>
            <div
                className="w-full max-w-2xl h-fit max-h-[70vh] bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center p-4 border-b border-white/10">
                    <SearchIcon className="w-6 h-6 text-gray-400 mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search PS-OS..."
                        className="w-full bg-transparent text-xl text-white placeholder-gray-400 focus:outline-none"
                    />
                </div>
                <div className="flex-grow overflow-y-auto custom-scrollbar p-2">
                    {results.length > 0 ? (
                         <ul className="space-y-1">
                            {results.map((result, index) => {
                                let Icon, title, subtitle;
                                if(result.type === 'app') {
                                    Icon = result.item.icon;
                                    title = result.item.name;
                                    subtitle = "Application";
                                } else if(result.type === 'file') {
                                    Icon = isFolder(result.item) ? APPS.fileExplorer.icon : APPS.netSurfer.icon; // Placeholder
                                    title = result.item.name;
                                    subtitle = result.path;
                                } else {
                                    Icon = BrowserIcon;
                                    title = `Search the web for "${result.query}"`;
                                    subtitle = "Internet Search";
                                }
                                return (
                                <li key={index}>
                                    <button onClick={() => handleResultClick(result)} className="w-full flex items-center space-x-4 p-3 text-left rounded-lg hover:bg-blue-500/50 transition-colors">
                                        <div className="p-2 bg-white/10 rounded-md">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{title}</p>
                                            <p className="text-xs text-gray-400">{subtitle}</p>
                                        </div>
                                    </button>
                                </li>
                                )
                            })}
                         </ul>
                    ) : (
                        query && <p className="text-center p-8 text-gray-400">No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPanel;
