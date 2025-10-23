import { useState, useEffect, useCallback } from 'react';

const USAGE_LIMIT = 15; // Monthly limit for free users

const getInitialState = () => {
    try {
        const item = window.localStorage.getItem('snappenseUsageQuota');
        if (item) {
            const parsed = JSON.parse(item);
            const now = new Date();
            const resetDate = new Date(parsed.resetDate);
            
            // Check if the reset date is in the past (i.e., new month)
            if (now.getFullYear() > resetDate.getFullYear() || now.getMonth() > resetDate.getMonth()) {
                 // Time to reset
                 const newResetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                 return { count: 0, resetDate: newResetDate.toISOString() };
            }
            return parsed;
        }
    } catch (error) {
        console.error("Error reading usage quota from localStorage", error);
    }
    
    // Default state for a new user
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return { count: 0, resetDate: nextMonth.toISOString() };
};

export const useUsageQuota = () => {
    const [usage, setUsage] = useState(getInitialState);

    useEffect(() => {
        try {
            window.localStorage.setItem('snappenseUsageQuota', JSON.stringify(usage));
        } catch (error) {
            console.error("Error saving usage quota to localStorage", error);
        }
    }, [usage]);

    const incrementUsage = useCallback(() => {
        setUsage(prev => {
            if (prev.count < USAGE_LIMIT) {
                return { ...prev, count: prev.count + 1 };
            }
            return prev;
        });
    }, []);
    
    const isLimitReached = usage.count >= USAGE_LIMIT;

    return {
        usageCount: usage.count,
        usageLimit: USAGE_LIMIT,
        isLimitReached,
        incrementUsage,
    };
};
