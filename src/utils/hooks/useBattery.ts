import { useEffect, useState } from 'react';

interface Battery {
  level: number;
  charging: boolean;
}

export const useBattery = () => {
  const [batteryState, setBatteryState] = useState<Battery | null>({} as Battery);

  useEffect(() => {
    if ('getBattery' in window.navigator) {
      // @ts-ignore
      window.navigator.getBattery().then(battery => hookBattery(battery));
    } else {
      setBatteryState(null);
      console.warn('Battery API unsupported');
    }

    return () => {
      if ('getBattery' in window.navigator) {
        // @ts-ignore
        window.navigator.getBattery().then(battery => unHookBattery(battery));
      }
    };
  }, []);

  const unHookBattery = (battery: any) => {
    battery.removeEventListener('levelchange', () => setBatteryState(battery));
    battery.removeEventListener('chargingchange', () => setBatteryState(battery));
    battery.removeEventListener('dischargingtimechange', () => setBatteryState(battery));
    battery.removeEventListener('chargingtimechange', () => setBatteryState(battery));
  };

  const hookBattery = (battery: any) => {
    setBatteryState(battery);
    battery.addEventListener('levelchange', () => setBatteryState(battery));
    battery.addEventListener('chargingchange', () => setBatteryState(battery));
    battery.addEventListener('dischargingtimechange', () => setBatteryState(battery));
    battery.addEventListener('chargingtimechange', () => setBatteryState(battery));
  };

  return batteryState;
};
