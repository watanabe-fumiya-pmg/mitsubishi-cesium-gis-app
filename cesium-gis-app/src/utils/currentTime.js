// utils/currentTime.js

import { useState, useEffect } from 'react';

export const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const isoString = now.toISOString();
            const trimmed = isoString.slice(0, 19);
            setCurrentTime(trimmed);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return currentTime;
};