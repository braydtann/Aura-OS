import React from 'react';
import { useTrash } from '../contexts/TrashContext';
import { isFolder, TrashItem } from '../types';
import { APPS, TrashIcon as BigTrashIcon } from '../constants';
import { useClickSound } from '../hooks/useClickSound';

const FolderIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${className} text-blue-400`}>
    <path d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.25a3 3 0 0 1-2.65-1.5L9.75 1.5a3 3 0 0 0-2.65-1.5H4.5a3 3 0 0 0-3 3v15a3 3 0 0 0 3 3h15Z" />
  </svg>
);

const FileIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${className} text-gray-400`}>
    <path fillRule="evenodd" d="M5.625 1.5H9.375a3 3 0 0 1 2.121.879l5.25 5.25a3 3 0 0 1 .879 2.121v7.125a3 3 0 0 1-3 3H5.625a3 3 0 0 1-3-3V4.5a3 3 0 0 1 3-3Zm5.25 1.5c-.31 0-.613.128-.832.353l-2.5 2.5a1.125 1.125 0 0 1-1.59 0l-.125-.125a1.125 1.125 0 0 1 0-1.59l2.5-2.5a1.125 1.125 0 0 1 .832-.353Z" clipRule="evenodd" />
  </svg>
);


const TrashWindow: React.FC = () => {
    const { trashedItems, restoreItem, permanentlyDeleteItem, emptyTrash } = useTrash();
    const playClickSound = useClickSound();

    const handleEmptyTrash = () => {
        playClickSound();
        if (window.confirm("Are you sure you want to permanently empty the trash? This action cannot be undone.")) {
            emptyTrash();
        }
    };
    
    const handleRestore = (item: TrashItem) => {
        playClickSound();
        restoreItem(item);
    }
    
    const handleDelete = (item: TrashItem) => {
        playClickSound();
        permanentlyDeleteItem(item);
    }

    return (
        <div className="h-full flex flex-col text-white">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 bg-black/20 rounded-t-md">
                <h3 className="font-bold">Trash</h3>
                <button
                    onClick={handleEmptyTrash}
                    disabled={trashedItems.length === 0}
                    className="px-3 py-1 text-sm bg-red-600 hover:bg-red-500 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    Empty Trash
                </button>
            </div>

            {/* Item List */}
            <div className="flex-grow p-2 overflow-y-auto">
                {trashedItems.length > 0 ? (
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10">
                            <tr>
                                <th className="p-2">Name</th>
                                <th className="p-2">Type</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* FIX: Refactored logic to correctly narrow types for trashed items. */}
                            {trashedItems.map((trashItem, index) => {
                                let Icon;
                                let type: string;

                                if (trashItem.type === 'app') {
                                    Icon = trashItem.item.icon;
                                    type = 'Application';
                                } else {
                                    // Here, trashItem.item is correctly inferred as FSItem
                                    Icon = isFolder(trashItem.item) ? FolderIcon : FileIcon;
                                    type = isFolder(trashItem.item) ? 'Folder' : 'File';
                                }

                                return (
                                    <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="p-2 flex items-center space-x-2">
                                            <Icon className="w-6 h-6" />
                                            <span>{trashItem.item.name}</span>
                                        </td>
                                        <td className="p-2 text-gray-400">{type}</td>
                                        <td className="p-2 space-x-2">
                                            <button onClick={() => handleRestore(trashItem)} className="text-blue-400 hover:underline">Restore</button>
                                            <button onClick={() => handleDelete(trashItem)} className="text-red-400 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <BigTrashIcon className="w-24 h-24" />
                        <p className="mt-4 text-lg">The trash is empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrashWindow;