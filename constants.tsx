import React from 'react';
import { App, Shelf, Theme } from './types';

// Define a common interface for icon components
interface IconProps {
  className?: string;
}

// App Icons
const GameIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
    </svg>
);

// FIX: Export `BrowserIcon` so it can be imported and used in other components like `SearchPanel`.
export const BrowserIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c1.356 0 2.648-.217 3.86-1.318M12 21c-1.356 0-2.648-.217-3.86-1.318m0 0a9.007 9.007 0 0 1-2.909-6.425m2.909 6.425a9.007 9.007 0 0 0 2.909-6.425m0 0a8.966 8.966 0 0 1-1.612-5.823M15.18 4.872a8.966 8.966 0 0 1 1.612 5.823m0 0a8.966 8.966 0 0 1-5.823 1.612m5.823-1.612a8.966 8.966 0 0 0 5.823-1.612M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z" />
    </svg>
);

const MediaIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
    </svg>
);

const SettingsIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a6.759 6.759 0 0 1 0 1.25c.008.379.138.752.43.992l1.003.827c.424.35.534.955.26 1.431l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.941l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-1.25c-.007-.379-.137-.752-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.431l1.296-2.247a1.125 1.125 0 0 1 1.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const StoreIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
    </svg>
);

const MusicIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m-8.5 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V3l10.5 3M9 9l10.5-3m-8.5 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
    </svg>
);

const TrophyIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 0 1 9 0Zm0 0c0 .348-.02.69-.058 1.03-1.185.89-2.54.43-3.442-1.03m9.44 2.06a19.452 19.452 0 0 1-16.898 0m16.898 0c.234-1.72.76-3.354 1.492-4.885M3.058 17.885c.732 1.53 1.258 3.164 1.492 4.885m11.458-9.77a8.903 8.903 0 0 1-11.458 0M12 21a8.903 8.903 0 0 1 0-18 8.903 8.903 0 0 1 0 18Z" />
    </svg>
);

const FriendsIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.742-.588M18 18.72a9.094 9.094 0 0 1-3.742-.588m3.742.588c.394-.149.78-.323 1.155-.515M18 18.72c-.394-.149-.78-.323-1.155-.515m-5.69 2.135a9.094 9.094 0 0 0 3.742-.588m-3.742.588a9.094 9.094 0 0 1-3.742-.588m3.742.588c.394-.149.78-.323 1.155-.515m-1.155.515c-.394-.149-.78-.323-1.155-.515m6.845-6.845a9.06 9.06 0 0 0-12.728 0m12.728 0c.394-.149.78-.323 1.155-.515m-1.155.515c-.394-.149-.78-.323-1.155-.515M6 18.72a9.094 9.094 0 0 1 3.742-.588m-3.742.588a9.094 9.094 0 0 0 3.742-.588m-3.742.588c-.394-.149-.78-.323-1.155-.515m1.155.515c.394-.149.78-.323 1.155-.515m-5.69 2.135a9.094 9.094 0 0 1 3.742-.588M12 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const CaptureGalleryIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
  </svg>
);

const ProfileIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const MessagesIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.53-.372A.75.75 0 0 1 9 19.125l-2.25-2.25a.75.75 0 0 0-1.06-1.061l-2.25 2.25a.75.75 0 0 1-1.139-.283c-.254-.622-.396-1.294-.396-2.003 0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
  </svg>
);

const PartyChatIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m12 0v-1.5a6 6 0 0 0-6-6v0a6 6 0 0 0-6 6v1.5m6 10.5a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 10.5v-1.5m6-9v-1.5a6 6 0 0 0-6-6v0a6 6 0 0 0-6 6v1.5m0 0v-1.5a6 6 0 0 0 6-6v0a6 6 0 0 0 6 6v1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12a4.5 4.5 0 0 1 9 0v.75" />
  </svg>
);

const FileExplorerIcon: React.FC<IconProps> = ({ className = "w-12 h-12" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 0A2.25 2.25 0 0 1 5.25 7.5h13.5a2.25 2.25 0 0 1 2.25 2.25m-18 0v6.75a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25V9.75" />
  </svg>
);

// Settings Panel Icons
export const DisplayIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
    </svg>
);

export const SoundIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
);

export const WifiIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.636 12.386a9 9 0 0 1 12.728 0M12 18.75a.375.375 0 1 0 0-.75.375.375 0 0 0 0 .75Z" />
    </svg>
);

export const PersonalizationIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.475 2.118A5.25 5.25 0 0 0 7.5 21a5.25 5.25 0 0 0 5.25-5.25c0-1.55-.83-2.943-2.122-3.78ZM15.281 12.12a5.25 5.25 0 0 1-5.454 2.872.45.45 0 0 0-.46.303l-.436 1.043a3.75 3.75 0 0 0 1.954 4.363 4.5 4.5 0 0 1-2.96 2.84c-1.64.44-3.37.21-4.82-.697a4.5 4.5 0 0 1-2.22-3.528 4.5 4.5 0 0 1 .472-2.674l.436-1.043a.45.45 0 0 0-.303-.46 5.25 5.25 0 0 1-2.872-5.454c.38-1.78 1.96-3.22 3.86-3.53a5.25 5.25 0 0 1 5.82 1.899 5.25 5.25 0 0 1 1.9-5.82c2.31-.96 4.98.24 6.13 2.53.97 1.93 1.09 4.24.46 6.32a5.25 5.25 0 0 1-2.82 3.68Z" />
    </svg>
);

export const BluetoothIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 4.5-7.5 7.5 7.5 7.5" />
  </svg>
);

export const AccessibilityIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739a6.037 6.037 0 0 1-5.63 6.494m5.63-6.494a6.037 6.037 0 0 0-5.63-6.494m5.63 6.494L12 12.739m9 3.408a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const UpdateIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const NotificationIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
);

export const MinimizeIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);



// App Data
export const APPS: { [key: string]: App } = {
  astroChase: { id: 'astro-chase', name: 'Astro Chase', icon: GameIcon },
  galaxyQuest: { id: 'galaxy-quest', name: 'Galaxy Quest', icon: GameIcon },
  netSurfer: { id: 'net-surfer', name: 'NetSurfer', icon: BrowserIcon },
  mediaStream: { id: 'media-stream', name: 'MediaStream', icon: MediaIcon },
  settings: { id: 'settings', name: 'Settings', icon: SettingsIcon },
  videoPlayer: { id: 'video-player', name: 'Video Player', icon: MediaIcon },
  photoViewer: { id: 'photo-viewer', name: 'Photo Viewer', icon: MediaIcon },
  spaceRacer: { id: 'space-racer', name: 'Space Racer', icon: GameIcon },
  starfall: { id: 'starfall', name: 'Starfall', icon: GameIcon },
  psStore: { id: 'ps-store', name: 'PS Store', icon: StoreIcon },
  musicPlayer: { id: 'music-player', name: 'Music Player', icon: MusicIcon },
  trophies: { id: 'trophies', name: 'Trophies', icon: TrophyIcon },
  friends: { id: 'friends', name: 'Friends', icon: FriendsIcon },
  liveEvents: { id: 'live-events', name: 'Live Events', icon: MediaIcon },
  cloudSaves: { id: 'cloud-saves', name: 'Cloud Saves', icon: BrowserIcon },
  captureGallery: { id: 'capture-gallery', name: 'Capture Gallery', icon: CaptureGalleryIcon },
  userProfile: { id: 'user-profile', name: 'Profile', icon: ProfileIcon },
  messages: { id: 'messages', name: 'Messages', icon: MessagesIcon },
  partyChat: { id: 'party-chat', name: 'Party', icon: PartyChatIcon },
  vrWorld: { id: 'vr-world', name: 'VR World', icon: GameIcon },
  codeBreaker: { id: 'code-breaker', name: 'CodeBreaker', icon: GameIcon },
  moviePlex: { id: 'movie-plex', name: 'MoviePlex', icon: MediaIcon },
  newsFeed: { id: 'news-feed', name: 'News', icon: BrowserIcon },
  fileExplorer: { id: 'file-explorer', name: 'File Explorer', icon: FileExplorerIcon },
  trash: { id: 'trash', name: 'Trash', icon: TrashIcon },
};

// Shelf Data
export const SHELVES: Shelf[] = [
  {
    id: 'games',
    name: 'Games',
    apps: [APPS.astroChase, APPS.galaxyQuest, APPS.spaceRacer, APPS.starfall, APPS.psStore, APPS.vrWorld, APPS.codeBreaker],
  },
  {
    id: 'media',
    name: 'Media',
    apps: [APPS.mediaStream, APPS.videoPlayer, APPS.photoViewer, APPS.musicPlayer, APPS.liveEvents, APPS.captureGallery, APPS.moviePlex],
  },
  {
    id: 'social-and-utilities',
    name: 'Social & Utilities',
    apps: [APPS.friends, APPS.netSurfer, APPS.settings, APPS.trophies, APPS.cloudSaves, APPS.userProfile, APPS.messages, APPS.partyChat, APPS.newsFeed, APPS.fileExplorer, APPS.trash],
  },
];

// Theme Data
export const THEMES: Theme[] = [
    {
        id: 'default',
        name: 'PlayStation Blue',
        background: 'bg-gradient-to-br from-[#020D23] via-[#04193E] to-[#020D23]',
        cursor: 'cursor-light',
        clickSound: 'https://sfxr.me/static/sounds/select-2.wav'
    },
    {
        id: 'dark',
        name: 'Deep Space',
        background: 'bg-gray-900',
        cursor: 'cursor-dark',
        clickSound: 'https://sfxr.me/static/sounds/select-3.wav'
    },
    {
        id: 'cyber',
        name: 'Cyber Grid',
        background: 'bg-gradient-to-bl from-gray-900 via-gray-900 to-cyan-800',
        cursor: 'cursor-tech',
        clickSound: 'https://sfxr.me/static/sounds/hit-3.wav'
    }
];

// User Data
export const USER = {
    name: 'PS-OS User',
    avatar: 'https://storage.googleapis.com/gemini-web-us-assets/2024/05/20/5e8e4c70-e62a-4171-8c88-e87752b027f3.png'
};

// Pinned Apps for Taskbar
export const PINNED_APPS: App[] = [
  APPS.fileExplorer,
  APPS.netSurfer,
  APPS.settings,
  APPS.psStore,
  APPS.trash,
];