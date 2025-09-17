import React, { useContext, useState } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import {
  AppShell,
  Text,
  Burger,
  useMantineTheme,
  Group,
  Avatar,
  Menu,
  UnstyledButton,
  Box,
} from '@mantine/core';
import {
  IconDashboard,
  IconPackages,
  IconUsers,
  IconSettings,
  IconLogout,
  IconUser,
} from '@tabler/icons-react';

import AuthContext from '../context/AuthContext';

const MainLinks = ({ onLinkClick }) => {
  const data = [
    { icon: <IconDashboard size={16} />, color: 'blue', label: 'Dashboard', link: '/app' },
    { icon: <IconPackages size={16} />, color: 'teal', label: 'Inventory', link: '/app/inventory' },
    { icon: <IconUsers size={16} />, color: 'violet', label: 'Users', link: '/app/users' },
    { icon: <IconSettings size={16} />, color: 'grape', label: 'Settings', link: '/app/settings' },
  ];

  const links = data.map((item) => (
    <Link 
      to={item.link} 
      key={item.label} 
      style={{ textDecoration: 'none', color: 'inherit' }}
      onClick={onLinkClick}
    >
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <div style={{ color: item.color }}>{item.icon}</div>
          <Text size="sm">{item.label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  ));

  return <div>{links}</div>;
};

const AppLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <AppShell
      padding="md"
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      header={{
        height: 60,
      }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      footer={{
        height: 60,
      }}
    >
      <AppShell.Header p="md">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <Box sx={{ '@media (min-width: 768px)': { display: 'none' } }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </Box>

          <Text size="lg" fw={700}>MediDent Inventory Manager</Text>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Group>
                  <Avatar color="blue" radius="xl">{user?.name?.charAt(0) || 'U'}</Avatar>
                  <Box sx={{ '@media (max-width: 767px)': { display: 'none' } }}>
                    <div>
                      <Text size="sm" fw={500}>{user?.name || 'User'}</Text>
                      <Text c="dimmed" size="xs">{user?.role || 'Role'}</Text>
                    </div>
                  </Box>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconUser size={14} />} component={Link} to="/app/profile">
                Profile
              </Menu.Item>
              <Menu.Item leftSection={<IconSettings size={14} />} component={Link} to="/app/settings">
                Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={logout}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow mt="md">
          <MainLinks onLinkClick={() => setOpened(false)} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer p="md">
        <Text size="sm" c="dimmed" ta="center">
          © 2025 MediDent Inventory Manager. All rights reserved.
        </Text>
      </AppShell.Footer>
    </AppShell>
  );
};

export default AppLayout;
