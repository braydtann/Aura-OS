import React from 'react';

interface SearchSettingsProps {
    searchFiles: boolean;
    setSearchFiles: (enabled: boolean) => void;
    searchApps: boolean;
    setSearchApps: (enabled: boolean) => void;
    searchInternet: boolean;
    setSearchInternet: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; label: string; description: string }> = ({ checked, onChange, label, description }) => (
  <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
    <div>
        <h4 className="font-semibold">{label}</h4>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={`block w-14 h-8 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${checked ? 'transform translate-x-6' : ''}`}></div>
      </div>
    </label>
  </div>
);

const SearchSettings: React.FC<SearchSettingsProps> = ({
    searchFiles,
    setSearchFiles,
    searchApps,
    setSearchApps,
    searchInternet,
    setSearchInternet
}) => {
    return (
        <div className="text-white p-4 space-y-4">
            <ToggleSwitch
                label="Search Files"
                description="Include local files and folders in search results."
                checked={searchFiles}
                onChange={setSearchFiles}
            />
            <ToggleSwitch
                label="Search Apps"
                description="Find installed applications from the search bar."
                checked={searchApps}
                onChange={setSearchApps}
            />
            <ToggleSwitch
                label="Search Internet"
                description="Show an option to search the web."
                checked={searchInternet}
                onChange={setSearchInternet}
            />
        </div>
    );
};

export default SearchSettings;
