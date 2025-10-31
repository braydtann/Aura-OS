import React, { useState } from 'react';

const VolumeSlider: React.FC<{ label: string; value: number; onChange: (value: number) => void; muted?: boolean }> = ({ label, value, onChange, muted = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <div className="flex items-center space-x-4">
      <input
        type="range"
        min="0"
        max="100"
        value={muted ? 0 : value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-blue-500"
        disabled={muted}
      />
      <span className={`font-bold w-10 text-center ${muted ? 'text-gray-500' : ''}`}>{muted ? '0' : value}%</span>
    </div>
  </div>
);

const MuteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6-4.72-4.72a.75.75 0 0 0-1.06 1.06L8.175 9.75l-4.72-4.72a.75.75 0 0 0-1.06 1.06L6.938 12l-5.116 5.116a.75.75 0 0 0 1.06 1.06l4.72-4.72 4.72 4.72a.75.75 0 0 0 1.06-1.06L12.825 15l4.72 4.72a.75.75 0 0 0 1.06-1.06L14.062 12l5.116-5.116a.75.75 0 0 0-1.06-1.06l-4.72 4.72-4.72-4.72a.75.75 0 0 0-1.06 1.06L9.825 9.75l-4.72-4.72Z" />
    </svg>
);

const VolumeUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
);

const VolumeSettings = () => {
  const [systemVolume, setSystemVolume] = useState(80);
  const [appVolume, setAppVolume] = useState(100);
  const [notificationVolume, setNotificationVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div className="text-white p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Master Volume</h3>
        <button
          onClick={handleMuteToggle}
          className={`p-2 rounded-full transition-colors ${isMuted ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'}`}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MuteIcon className="w-6 h-6" /> : <VolumeUpIcon className="w-6 h-6" />}
        </button>
      </div>

      <div className="space-y-4 p-4 bg-black/20 rounded-lg">
        <VolumeSlider label="System Volume" value={systemVolume} onChange={setSystemVolume} muted={isMuted} />
        <VolumeSlider label="Applications" value={appVolume} onChange={setAppVolume} muted={isMuted} />
        <VolumeSlider label="Notifications" value={notificationVolume} onChange={setNotificationVolume} muted={isMuted} />
      </div>
    </div>
  );
};

export default VolumeSettings;