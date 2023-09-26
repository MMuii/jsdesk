import { useBattery } from 'utils/hooks/useBattery';
import { Separator } from '../styled';
import { SettingsRow } from './styled';
import { useCallback } from 'react';

const getOsName = () => {
  let os = 'Unknown';
  if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1) os = 'Windows 10';
  if (window.navigator.userAgent.indexOf('Windows NT 6.3') !== -1) os = 'Windows 8.1';
  if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1) os = 'Windows 8';
  if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1) os = 'Windows 7';
  if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1) os = 'Windows Vista';
  if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1) os = 'Windows XP';
  if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1) os = 'Windows 2000';
  if (window.navigator.userAgent.indexOf('Mac') !== -1) os = 'MacOS';
  if (window.navigator.userAgent.indexOf('Linux') !== -1) os = 'Linux';
  return os;
};

const getUptime = () => {
  const uptimeTimestamp = localStorage.getItem('uptimeTimestamp');
  const uptime = new Date().getTime() - Number(uptimeTimestamp);
  const uptimeMinutes = uptime / 1000 / 60;

  if (uptimeMinutes < 1) {
    return 'less than a minute';
  }

  if (uptimeMinutes < 60) {
    return `${Math.floor(uptimeMinutes)} minutes`;
  }

  const uptimeHours = ~~(uptimeMinutes / 60);
  return `${uptimeHours} hour${uptimeHours > 1 ? 's' : ''}`;
};

const resolution = `${window.screen.availWidth}x${window.screen.availHeight}`;

const getRamAmount = () => {
  // @ts-ignore
  const { deviceMemory } = navigator;
  if (deviceMemory === undefined) {
    return 'unknown - API not supported';
  }

  return `${deviceMemory} GB or more`;
};

const getBrowser = () => {
  const { userAgent } = navigator;

  if (userAgent.indexOf('Firefox') > -1) {
    return 'Mozilla Firefox';
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    return 'Opera';
  } else if (userAgent.indexOf('Trident') > -1) {
    return 'Internet Explorer';
  } else if (userAgent.indexOf('Edge') > -1) {
    return 'Microsoft Edge';
  } else if (userAgent.indexOf('Chrome') > -1) {
    return 'Google Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  } else {
    return 'unknown';
  }
};

export const DeviceInfoTab = () => {
  const battery = useBattery();

  const getBatteryInfo = useCallback(() => {
    if (battery === null) return 'unknown - API not supported';

    return `${battery.level * 100}%, ${battery.charging ? 'charging' : 'not charging'}`;
  }, [battery]);

  return (
    <>
      <h2>Device info</h2>
      <Separator />
      <SettingsRow>
        <span>Operating system:</span>
        <span>{getOsName()}</span>
      </SettingsRow>
      <SettingsRow>
        <span>Uptime:</span>
        <span>{getUptime()}</span>
      </SettingsRow>
      <SettingsRow>
        <span>Resolution:</span>
        <span>{resolution}</span>
      </SettingsRow>
      <SettingsRow>
        <span>CPU cores:</span>
        <span>{navigator.hardwareConcurrency}</span>
      </SettingsRow>
      <SettingsRow>
        <span>RAM memory:</span>
        <span>{getRamAmount()}</span>
      </SettingsRow>
      <SettingsRow>
        <span>Battery:</span>
        <span>{getBatteryInfo()}</span>
      </SettingsRow>
      <SettingsRow>
        <span>Browser:</span>
        <span>{getBrowser()}</span>
      </SettingsRow>
    </>
  );
};
