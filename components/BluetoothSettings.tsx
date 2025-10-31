import React, { useState, useEffect } from 'react';
import { useClickSound } from '../hooks/useClickSound';

interface Device {
  id: string;
  name: string;
  type: 'controller' | 'headset' | 'keyboard' | 'phone';
  status: 'paired' | 'connected' | 'available';
}

const initialDevices: Device[] = [
  { id: '1', name: 'Wireless Controller', type: 'controller', status: 'connected' },
  { id: '2', name: 'Pulse 3D Headset', type: 'headset', status: 'paired' },
  { id: '3', name: 'Magic Keyboard', type: 'keyboard', status: 'available' },
];

const newDevices: Device[] = [
    { id: '4', name: 'Pixel 8 Pro', type: 'phone', status: 'available' },
    { id: '5', name: 'WH-1000XM5', type: 'headset', status: 'available' },
];

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

const BluetoothSettings: React.FC = () => {
    const [isBluetoothOn, setIsBluetoothOn] = useState(true);
    const [devices, setDevices] = useState<Device[]>(initialDevices);
    const [isScanning, setIsScanning] = useState(false);
    const playClickSound = useClickSound();

    const handleToggleBluetooth = (isOn: boolean) => {
        playClickSound();
        setIsBluetoothOn(isOn);
        if (!isOn) {
            setDevices(devices.map(d => ({ ...d, status: d.status === 'connected' ? 'paired' : d.status })));
        }
    };

    const handleScan = () => {
        playClickSound();
        setIsScanning(true);
        setTimeout(() => {
            setDevices(prev => {
                const existingIds = new Set(prev.map(d => d.id));
                const newlyFound = newDevices.filter(d => !existingIds.has(d.id));
                return [...prev, ...newlyFound];
            });
            setIsScanning(false);
        }, 3000);
    };

    const handleConnect = (deviceId: string) => {
        playClickSound();
        setDevices(devices.map(d => {
            if (d.id === deviceId) return { ...d, status: 'connected' };
            if (d.type === 'controller' || d.type === 'headset') { // Disconnect other similar devices
                if(d.status === 'connected') return { ...d, status: 'paired' };
            }
            return d;
        }));
    };

    const handleDisconnect = (deviceId: string) => {
        playClickSound();
        setDevices(devices.map(d => d.id === deviceId ? { ...d, status: 'paired' } : d));
    };

    return (
        <div className="text-white p-4 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="text-lg font-semibold">Bluetooth</h3>
                <ToggleSwitch checked={isBluetoothOn} onChange={handleToggleBluetooth} label={isBluetoothOn ? 'On' : 'Off'} />
            </div>

            {isBluetoothOn && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-300">My Devices</h4>
                        <button onClick={handleScan} disabled={isScanning} className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded-md disabled:bg-gray-500 disabled:cursor-wait">
                            {isScanning ? 'Scanning...' : 'Scan'}
                        </button>
                    </div>
                    <div className="space-y-2">
                        {devices.map(device => (
                            <div key={device.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                                <div className="flex flex-col">
                                    <span className="font-semibold">{device.name}</span>
                                    <span className={`text-sm ${device.status === 'connected' ? 'text-blue-400' : 'text-gray-400'}`}>{device.status.charAt(0).toUpperCase() + device.status.slice(1)}</span>
                                </div>
                                {device.status === 'connected' ? (
                                    <button onClick={() => handleDisconnect(device.id)} className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 rounded-md">Disconnect</button>
                                ) : (
                                    <button onClick={() => handleConnect(device.id)} className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded-md">Connect</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BluetoothSettings;
