import React, { useState } from 'react';
import { App } from '../types';
import { useClickSound } from '../hooks/useClickSound';

interface RenameAppModalProps {
    app: App;
    onRename: (app: App, newName: string) => void;
    onClose: () => void;
}

const RenameAppModal: React.FC<RenameAppModalProps> = ({ app, onRename, onClose }) => {
    const [newName, setNewName] = useState(app.name);
    const playClickSound = useClickSound();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newName.trim()) {
            playClickSound();
            onRename(app, newName.trim());
        }
    };
    
    const handleClose = () => {
        playClickSound();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center" onClick={handleClose}>
            <div
                className="w-full max-w-sm bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-6"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Rename "{app.name}"</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        autoFocus
                    />
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-white/10 font-semibold rounded-lg hover:bg-white/20 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 font-bold rounded-lg hover:bg-blue-500 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RenameAppModal;