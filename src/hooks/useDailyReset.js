import { useEffect } from 'react';

export function useDailyReset(callback) {
  useEffect(() => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('lastReset');

    if (lastReset !== today) {
      callback();
      localStorage.setItem('lastReset', today);
    }
  }, []);
}
