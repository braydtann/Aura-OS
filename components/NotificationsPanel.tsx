import React, { useState, useEffect, useRef } from 'react';
import { useClickSound } from '../hooks/useClickSound';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
}

const mockNotifications = [
    { id: 1, text: "Friend request from Astro_Gamer_92", time: "2m ago" },
    { id: 2, text: "System update installed successfully.", time: "1h ago" },
    { id: 3, text: "Trophy Unlocked: Galactic Conqueror", time: "3h ago" },
    { id: 4, text: "Low storage warning. Manage your captures.", time: "1d ago" },
];

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose, anchorRef }) => {
    const [notifications, setNotifications] = useState(mockNotifications);
    const playClickSound = useClickSound();
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                anchorRef.current &&
                !anchorRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, anchorRef]);

    const handleClearAll = () => {
        playClickSound();
        setNotifications([]);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div 
            ref={panelRef}
            className="fixed bottom-28 right-6 z-40 w-80 max-w-[90vw] bg-black/50 backdrop-blur-xl text-white rounded-lg border border-blue-500/30 shadow-2xl flex flex-col"
        >
            <div className="p-3 flex items-center justify-between border-b border-white/10">
                <h3 className="font-bold text-sm">Notifications</h3>
                <button onClick={handleClearAll} className="text-xs text-blue-400 hover:underline">Clear All</button>
            </div>
            <div className="flex-grow p-2 overflow-auto max-h-80 custom-scrollbar">
                {notifications.length > 0 ? (
                    <ul className="space-y-2">
                        {notifications.map(n => (
                            <li key={n.id} className="p-2 bg-white/5 rounded-md text-sm">
                                <p>{n.text}</p>
                                <p className="text-xs text-gray-400 text-right">{n.time}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 text-gray-400">No new notifications.</div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPanel;
