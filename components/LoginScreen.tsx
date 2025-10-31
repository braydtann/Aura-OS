import React, { useState } from 'react';
import { USER } from '../constants';
import { useClickSound } from '../hooks/useClickSound';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState('');
    const playClickSound = useClickSound();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playClickSound();
        setIsLoggingIn(true);
        setError('');

        // Simulate network request
        setTimeout(() => {
            // In a real app, you'd validate the password. Here, any password works.
            if (password) {
                onLogin();
            } else {
                setError('Password cannot be empty.');
                setIsLoggingIn(false);
            }
        }, 1000);
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center text-white">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>
            <div className="relative z-10 flex flex-col items-center p-10 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl">
                <img src={USER.avatar} alt="User Avatar" className="w-28 h-28 rounded-full border-4 border-blue-500 mb-4" />
                <h1 className="text-2xl font-bold mb-6">{USER.name}</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-xs">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-3 bg-white/10 border-2 border-transparent rounded-lg text-center text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        autoFocus
                    />
                     {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full mt-6 px-4 py-3 bg-blue-600 font-bold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-wait"
                    >
                        {isLoggingIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;