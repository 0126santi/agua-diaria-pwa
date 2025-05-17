import React, { useState, useEffect } from 'react';
import WaterTracker from "./components/WaterTracker";
import { useDailyReset } from './hooks/useDailyReset';

function App() {
  const [water, setWater] = useState(() => {
    const stored = localStorage.getItem('water');
    return stored ? parseInt(stored) : 0;
  });

  useEffect(() => {
    localStorage.setItem('water', water.toString());
  }, [water]);

  // Reinicia el contador si cambia el día
  useDailyReset(() => {
    setWater(0);
  });

  return <WaterTracker water={water} setWater={setWater} />;
}

export default App;

