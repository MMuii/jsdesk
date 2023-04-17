import { useState } from 'react';
import { FaLaptop } from 'react-icons/fa';
import { MdOutlinePalette } from 'react-icons/md';
import { FiHardDrive } from 'react-icons/fi';
import { SlUser } from 'react-icons/sl';
import { Container, SettingsTab, SettingsTabsWrapper, TabContentWrapper } from './styled';
import { DeviceInfoTab } from './tabs/DeviceInfoTab';
import { ThemeTab } from './tabs/ThemeTab';
import { MemoryTab } from './tabs/MemoryTab';
import { AnimatePresence } from 'framer-motion';

enum Tabs {
  DeviceInfo = 0,
  Account,
  Theme,
  Memory,
}

const settingsTabs = [
  { name: 'Device info', icon: <FaLaptop /> },
  { name: 'Account', icon: <SlUser /> },
  { name: 'Theme', icon: <MdOutlinePalette /> },
  { name: 'Memory', icon: <FiHardDrive /> },
];

const animationProps = {
  initial: { x: -5, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 5, opacity: 0 },
  transition: { duration: 0.1 },
};

export const Settings = () => {
  const [selectedTab, setSelectedTab] = useState(Tabs.DeviceInfo);

  const renderTabs = () =>
    settingsTabs.map(({ name, icon }, idx) => {
      return (
        <SettingsTab key={name} $selected={selectedTab === idx} onClick={() => setSelectedTab(idx)}>
          {icon}
          <div>{name}</div>
        </SettingsTab>
      );
    });

  const getTabContent = () => {
    switch (selectedTab) {
      case Tabs.DeviceInfo:
        return <DeviceInfoTab />;
      case Tabs.Account:
        return <ThemeTab />;
      case Tabs.Theme:
        return <ThemeTab />;
      case Tabs.Memory:
        return <MemoryTab />;
    }
  };

  return (
    <Container>
      <SettingsTabsWrapper>{renderTabs()}</SettingsTabsWrapper>
      <AnimatePresence mode="wait">
        <TabContentWrapper key={selectedTab} {...animationProps}>
          {getTabContent()}
        </TabContentWrapper>
      </AnimatePresence>
    </Container>
  );
};
