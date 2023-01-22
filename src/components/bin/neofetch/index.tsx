import React from 'react';
import { Binary } from 'utils/providers/ShellProvider';
import { Macos } from './os-logos/Macos';
import { Windows } from './os-logos/Windows';
import { Ubuntu } from './os-logos/Ubuntu';
import { SystemInfo } from './SystemInfo';
import { Container, ColorBlocksContainer } from './styled';

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

export const neofetch: Binary = ({ terminate }) => {
  terminate();

  const renderAscii = () => {
    if (os.startsWith('Windows')) return <Windows />;
    if (os.startsWith('Mac')) return <Macos />;
    return <Ubuntu />;
  };

  return () => (
    <Container>
      {renderAscii()}
      <div>
        <SystemInfo os={os} />
        <ColorBlocksContainer>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </ColorBlocksContainer>
      </div>
    </Container>
  );
};
