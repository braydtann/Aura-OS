import React, { useState } from 'react';
import { useClickSound } from '../hooks/useClickSound';

type UpdateStatus = 'idle' | 'checking' | 'up-to-date' | 'available' | 'error';

const UpdateSettings: React.FC = () => {
    const [status, setStatus] = useState<UpdateStatus>('idle');
    const playClickSound = useClickSound();
    const currentVersion = "PS-OS v1.2.5";

    const handleCheckForUpdate = () => {
        playClickSound();
        setStatus('checking');
        setTimeout(() => {
            // Simulate a 50/50 chance of finding an update
            if (Math.random() > 0.5) {
                setStatus('up-to-date');
            } else {
                setStatus('available');
            }
        }, 2500);
    };

    const renderStatus = () => {
        switch (status) {
            case 'checking':
                return <p className="text-yellow-400">Checking for updates...</p>;
            case 'up-to-date':
                return <p className="text-green-400">Your system is up to date.</p>;
            case 'available':
                return <p className="text-blue-400">A new update is available! (Simulation)</p>;
            case 'error':
                return <p className="text-red-500">Could not check for updates. Please try again later.</p>;
            case 'idle':
            default:
                return <p className="text-gray-400">Last checked: Never</p>;
        }
    };

    return (
        <div className="text-white p-4 space-y-6">
            <div className="p-6 bg-black/20 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-2">System Software Update</h3>
                <p className="text-gray-300 mb-4">Current Version: {currentVersion}</p>
                <button 
                    onClick={handleCheckForUpdate}
                    disabled={status === 'checking'}
                    className="px-6 py-3 font-semibold bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-wait"
                >
                    {status === 'checking' ? 'Checking...' : 'Check for Update'}
                </button>
            </div>
            <div className="p-4 bg-black/20 rounded-lg h-24 flex items-center justify-center">
                {renderStatus()}
            </div>
        </div>
    );
};

export default UpdateSettings;
