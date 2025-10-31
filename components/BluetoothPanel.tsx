import React, { useEffect, useRef } from 'react';

interface BluetoothPanelProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
}

const connectedDevices = [
    { id: 1, name: "Wireless Controller", battery: 85 },
    { id: 2, name: "Pulse 3D Headset", battery: 60 },
];

const BluetoothPanel: React.FC<BluetoothPanelProps> = ({ isOpen, onClose, anchorRef }) => {
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
    
    if (!isOpen) return null;

    return (
        <div 
            ref={panelRef}
            className="fixed bottom-28 right-6 z-40 w-72 max-w-[90vw] bg-black/50 backdrop-blur-xl text-white rounded-lg border border-blue-500/30 shadow-2xl flex flex-col"
        >
            <div className="p-3 border-b border-white/10">
                <h3 className="font-bold text-sm">Connected Devices</h3>
            </div>
            <div className="flex-grow p-2 overflow-auto max-h-80 custom-scrollbar">
                {connectedDevices.length > 0 ? (
                    <ul className="space-y-2">
                        {connectedDevices.map(d => (
                            <li key={d.id} className="p-2 bg-white/5 rounded-md text-sm">
                                <div className="flex justify-between items-center">
                                    <span>{d.name}</span>
                                    <span className="text-xs text-green-400">{d.battery}%</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 text-gray-400">No devices connected.</div>
                )}
            </div>
        </div>
    );
};

export default BluetoothPanel;
