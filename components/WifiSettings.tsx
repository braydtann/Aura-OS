import React, { useState, useMemo } from 'react';
import { useClickSound } from '../hooks/useClickSound';

const SignalIcon: React.FC<{ strength: number, className?: string }> = ({ strength, className = "w-6 h-6" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0" opacity={strength >= 3 ? 1 : 0.2} />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 12.386a9 9 0 0 1 12.728 0" opacity={strength >= 2 ? 1 : 0.2} />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a.375.375 0 1 0 0-.75.375.375 0 0 0 0 .75Z" opacity={strength >= 1 ? 1 : 0.2}/>
        </svg>
    );
};

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; label: string }> = ({ checked, onChange, label }) => (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={`block w-14 h-8 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
      <div className="ml-3 text-white font-medium">{label}</div>
    </label>
);


const WifiSettings = () => {
    const [isWifiOn, setIsWifiOn] = useState(true);
    const [connectedNetwork, setConnectedNetwork] = useState('HomeNet-5G');
    const playClickSound = useClickSound();

    const availableNetworks = useMemo(() => [
        { ssid: 'HomeNet-5G', strength: 3 },
        { ssid: 'CoffeeShop-Guest', strength: 2 },
        { ssid: 'xfinitywifi', strength: 2 },
        { ssid: 'NeighborNet', strength: 1 },
        { ssid: 'Library_Free_WiFi', strength: 3 },
    ], []);

    const handleConnect = (ssid: string) => {
        playClickSound();
        setConnectedNetwork(ssid);
    };

    return (
        <div className="text-white p-4 space-y-6">
             <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="text-lg font-semibold">Wi-Fi</h3>
                <ToggleSwitch checked={isWifiOn} onChange={setIsWifiOn} label={isWifiOn ? 'On' : 'Off'} />
            </div>

            {isWifiOn && (
                <div>
                    <h4 className="font-semibold mb-3 text-gray-300">Available Networks</h4>
                    <div className="space-y-2">
                        {availableNetworks.map(net => (
                            <div key={net.ssid} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <SignalIcon strength={net.strength} />
                                    <span>{net.ssid}</span>
                                </div>
                                {connectedNetwork === net.ssid ? (
                                    <span className="text-blue-400 font-semibold">Connected</span>
                                ) : (
                                    <button onClick={() => handleConnect(net.ssid)} className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded-md">
                                        Connect
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WifiSettings;
