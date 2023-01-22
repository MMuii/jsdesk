import React from 'react';
import { SystemInfoContainer } from './styled';

interface Props {
  os: string;
}

const user = 'guest';
const host = 'localhost:3000';
const uptimeTimestamp = localStorage.getItem('uptimeTimestamp');
const uptime = new Date().getTime() - Number(uptimeTimestamp);
const uptimeMinutes = uptime / 1000 / 60;

export const SystemInfo = ({ os }: Props) => {
  const parseUptime = () => {
    if (uptimeMinutes < 1) {
      return 'less than a minute';
    }

    if (uptimeMinutes < 60) {
      return `${Math.floor(uptimeMinutes)} minutes`;
    }

    const uptimeHours = ~~(uptimeMinutes / 60);
    return `${uptimeHours} hour${uptimeHours > 1 ? 's' : ''}`;
  };

  return (
    <SystemInfoContainer>
      <div>
        {user}
        <span>@</span>
        {host}
      </div>
      <div>{'-'.repeat(host.length + user.length + 1)}</div>
      <div>
        System: <span>{os}</span>
      </div>
      <div>
        Resolution:{' '}
        <span>
          {window.screen.availWidth}x{window.screen.availHeight}
        </span>
      </div>
      <div>
        Theme: <span>{localStorage.getItem('theme')}</span>
      </div>
      <div>
        Uptime: <span>{parseUptime()}</span>
      </div>
      <div>
        Repo:{' '}
        <a href="https://github.com/marcin-swiderek/term" target="_blank">
          https://github.com/marcin-swiderek/term
        </a>
      </div>
      <div>
        Author: <a href="https://www.linkedin.com/in/marcin-swiderek2/">Marcin Świderek</a>
      </div>
    </SystemInfoContainer>
  );
};
