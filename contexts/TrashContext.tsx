import { createContext, useContext } from 'react';
import { TrashItem } from '../types';

interface TrashContextType {
    trashedItems: TrashItem[];
    addToTrash: (item: TrashItem) => void;
    restoreItem: (item: TrashItem) => void;
    permanentlyDeleteItem: (item: TrashItem) => void;
    emptyTrash: () => void;
}

const TrashContext = createContext<TrashContextType | undefined>(undefined);

export const TrashProvider = TrashContext.Provider;

export const useTrash = (): TrashContextType => {
    const context = useContext(TrashContext);
    if (!context) {
        throw new Error('useTrash must be used within a TrashProvider');
    }
    return context;
};