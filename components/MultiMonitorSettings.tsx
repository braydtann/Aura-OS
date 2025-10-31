import React, { useState, useMemo } from 'react';

interface Display {
    id: number;
    name: string;
    resolution: string;
    orientation: 'landscape' | 'portrait' | 'landscape-flipped' | 'portrait-flipped';
    isPrimary: boolean;
}

const mockDisplays: Display[] = [
    { id: 1, name: 'AOC 24G2', resolution: '1920x1080', orientation: 'landscape', isPrimary: true },
    { id: 2, name: 'DELL U2721DE', resolution: '2560x1440', orientation: 'landscape', isPrimary: false },
];

const resolutionOptions = ['1280x720', '1920x1080', '2560x1440', '3840x2160'];
const orientationOptions: Display['orientation'][] = ['landscape', 'portrait', 'landscape-flipped', 'portrait-flipped'];

const MultiMonitorSettings = () => {
    const [displays, setDisplays] = useState<Display[]>(mockDisplays);
    const [selectedDisplayId, setSelectedDisplayId] = useState<number>(1);

    const selectedDisplay = useMemo(() => displays.find(d => d.id === selectedDisplayId), [displays, selectedDisplayId]);

    const handleDisplayUpdate = (key: keyof Omit<Display, 'id' | 'name'>, value: any) => {
        if (!selectedDisplay) return;
        setDisplays(prev => prev.map(d => d.id === selectedDisplayId ? { ...d, [key]: value } : d));
    };

    const setPrimary = () => {
        if (!selectedDisplay || selectedDisplay.isPrimary) return;
        setDisplays(prev => prev.map(d => ({ ...d, isPrimary: d.id === selectedDisplayId })));
    };

    return (
        <div className="text-white p-4 space-y-8">
            {/* Display Arrangement Area */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Arrange your displays</h3>
                <p className="text-sm text-gray-400 mb-3">Select a display below to change its settings.</p>
                <div className="relative h-48 bg-black/20 rounded-lg flex items-center justify-center space-x-4 p-4 border border-white/10">
                    {displays.map(display => (
                        <div
                            key={display.id}
                            onClick={() => setSelectedDisplayId(display.id)}
                            className={`w-32 h-20 rounded-md cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${selectedDisplayId === display.id ? 'bg-blue-600/50 border-2 border-blue-400' : 'bg-gray-700/50 border-2 border-gray-500 hover:border-gray-400'}`}
                            style={{ transform: display.isPrimary ? 'scale(1.05)' : 'scale(1)'}}
                        >
                            <span className="text-3xl font-bold">{display.id}</span>
                            {display.isPrimary && <span className="text-xs absolute bottom-1">Primary</span>}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                    <button className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md">Identify</button>
                    <button className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md">Detect</button>
                </div>
            </div>

            {/* Selected Display Settings */}
            {selectedDisplay && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Settings for <span className="text-blue-300">{selectedDisplay.name}</span></h3>
                    <div className="space-y-4 p-4 bg-black/20 rounded-lg">
                        {/* Resolution */}
                        <div>
                            <label htmlFor="resolution-select" className="block text-sm font-medium text-gray-300 mb-1">Resolution</label>
                            <select
                                id="resolution-select"
                                value={selectedDisplay.resolution}
                                onChange={(e) => handleDisplayUpdate('resolution', e.target.value)}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {resolutionOptions.map(res => <option key={res}>{res}</option>)}
                            </select>
                        </div>

                        {/* Orientation */}
                        <div>
                            <label htmlFor="orientation-select" className="block text-sm font-medium text-gray-300 mb-1">Orientation</label>
                            <select
                                id="orientation-select"
                                value={selectedDisplay.orientation}
                                onChange={(e) => handleDisplayUpdate('orientation', e.target.value as Display['orientation'])}
                                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {orientationOptions.map(ori => <option key={ori} value={ori}>{ori.charAt(0).toUpperCase() + ori.slice(1).replace(/-/g, ' ')}</option>)}
                            </select>
                        </div>

                        {/* Make Primary */}
                        <div className="flex items-center pt-2">
                            <input
                                type="checkbox"
                                id="primary-display-checkbox"
                                checked={selectedDisplay.isPrimary}
                                onChange={setPrimary}
                                disabled={selectedDisplay.isPrimary}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="primary-display-checkbox" className={`ml-2 text-sm font-medium ${selectedDisplay.isPrimary ? 'text-gray-400' : ''}`}>Make this my main display</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiMonitorSettings;
