import React from 'react';

interface AccessibilitySettingsProps {
    textSize: number;
    setTextSize: (size: number) => void;
    highContrast: boolean;
    setHighContrast: (enabled: boolean) => void;
}

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

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({ textSize, setTextSize, highContrast, setHighContrast }) => {
    // Mock state for screen reader as its implementation is beyond this scope
    const [screenReader, setScreenReader] = React.useState(false);

    return (
        <div className="text-white p-4 space-y-8">
            {/* Text Size Setting */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Text Size</h3>
                <p className="text-sm text-gray-400 mb-3">Increase the size of text across the OS.</p>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400">Smaller</span>
                    <input
                        type="range"
                        min="0.8"
                        max="1.5"
                        step="0.1"
                        value={textSize}
                        onChange={(e) => setTextSize(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-blue-500"
                    />
                    <span className="text-gray-400">Larger</span>
                    <span className="font-bold w-12 text-center">{(textSize * 100).toFixed(0)}%</span>
                </div>
            </div>

            {/* High Contrast Setting */}
            <div>
                <h3 className="text-lg font-semibold mb-2">High Contrast</h3>
                <p className="text-sm text-gray-400 mb-3">Improves visibility by using a higher contrast color scheme.</p>
                <ToggleSwitch checked={highContrast} onChange={setHighContrast} label={highContrast ? 'On' : 'Off'} />
            </div>
            
            {/* Screen Reader Setting */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Screen Reader</h3>
                <p className="text-sm text-gray-400 mb-3">Narrates on-screen elements for visually impaired users.</p>
                <ToggleSwitch checked={screenReader} onChange={setScreenReader} label={screenReader ? 'On' : 'Off'} />
            </div>
        </div>
    );
};

export default AccessibilitySettings;
