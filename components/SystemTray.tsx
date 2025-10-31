import React, { useState, useEffect, useRef } from 'react';

// --- ICONS ---
const SunnyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
);


const SystemTray: React.FC = () => {
    const [now, setNow] = useState(new Date());
    const [isExpanded, setIsExpanded] = useState(false);
    const trayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (trayRef.current && !trayRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendarDays = Array(firstDayOfMonth).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div ref={trayRef} className="fixed top-4 right-4 z-50 text-white select-none">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-4 px-4 py-2 bg-black/30 backdrop-blur-md rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle system tray"
            >
                <div className="flex items-center space-x-2">
                    <SunnyIcon className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold">75°F</span>
                </div>
                <div className="w-px h-6 bg-white/20"></div>
                <div className="text-right">
                    <div className="font-bold text-lg">{time}</div>
                    <div className="text-xs opacity-80">{date}</div>
                </div>
            </button>

            {isExpanded && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-black/50 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-2xl">
                    <div className="text-center pb-2 border-b border-white/10 mb-2">
                        <h3 className="font-bold text-lg">San Francisco, CA</h3>
                        <p className="text-sm text-gray-400">Sunny</p>
                    </div>
                    <div>
                        <div className="flex justify-between font-bold mb-2">
                            <span>{now.toLocaleDateString([], { month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-sm">
                            {weekDays.map(day => <div key={day} className="font-semibold text-gray-400">{day}</div>)}
                            {calendarDays.map((day, index) => (
                                <div
                                    key={index}
                                    className={`p-1 rounded-full ${day === null ? '' : 'cursor-default'} ${
                                        day === today ? 'bg-blue-600 text-white font-bold' : 'hover:bg-white/10'
                                    }`}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SystemTray;