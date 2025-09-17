import React, { useState } from 'react';
import {
  Container,
  Title,
  Paper,
  Switch,
  Group,
  Text,
  Stack,
  Button,
  Select,
  NumberInput,
  Divider,
  Tabs,
} from '@mantine/core';
import { IconSettings, IconBell, IconDatabase, IconCloudUpload } from '@tabler/icons-react';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    darkMode: false,
    compactView: false,
    autoRefresh: true,
    refreshInterval: 5,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlerts: true,
    expiryAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
    alertDays: 30,
  });
  
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 7,
  });
  
  const handleGeneralChange = (field, value) => {
    setGeneralSettings({
      ...generalSettings,
      [field]: value,
    });
  };
  
  const handleNotificationChange = (field, value) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: value,
    });
  };
  
  const handleBackupChange = (field, value) => {
    setBackupSettings({
      ...backupSettings,
      [field]: value,
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would be an API call to save settings
    console.log('Saving settings:', {
      general: generalSettings,
      notifications: notificationSettings,
      backup: backupSettings,
    });
    
    // Show success message or notification
    alert('Settings saved successfully');
  };
  
  return (
    <Container size="md">
      <Title order={2} mb="xl">Settings</Title>
      
      <Tabs defaultValue="general">
        <Tabs.List mb="md">
          <Tabs.Tab value="general" icon={<IconSettings size={16} />}>General</Tabs.Tab>
          <Tabs.Tab value="notifications" icon={<IconBell size={16} />}>Notifications</Tabs.Tab>
          <Tabs.Tab value="backup" icon={<IconCloudUpload size={16} />}>Backup & Data</Tabs.Tab>
        </Tabs.List>
        
        <Tabs.Panel value="general">
          <Paper withBorder p="xl" radius="md">
            <Title order={4} mb="md">General Settings</Title>
            
            <Stack spacing="md">
              <Group position="apart">
                <div>
                  <Text>Dark Mode</Text>
                  <Text size="xs" color="dimmed">Enable dark mode for the application</Text>
                </div>
                <Switch 
                  checked={generalSettings.darkMode} 
                  onChange={(e) => handleGeneralChange('darkMode', e.currentTarget.checked)}
                />
              </Group>
              
              <Group position="apart">
                <div>
                  <Text>Compact View</Text>
                  <Text size="xs" color="dimmed">Use compact view for tables and lists</Text>
                </div>
                <Switch 
                  checked={generalSettings.compactView} 
                  onChange={(e) => handleGeneralChange('compactView', e.currentTarget.checked)}
                />
              </Group>
              
              <Group position="apart">
                <div>
                  <Text>Auto Refresh</Text>
                  <Text size="xs" color="dimmed">Automatically refresh data</Text>
                </div>
                <Switch 
                  checked={generalSettings.autoRefresh} 
                  onChange={(e) => handleGeneralChange('autoRefresh', e.currentTarget.checked)}
                />
              </Group>
              
              {generalSettings.autoRefresh && (
                <Group grow>
                  <Text>Refresh Interval (minutes)</Text>
                  <NumberInput
                    min={1}
                    max={60}
                    value={generalSettings.refreshInterval}
                    onChange={(value) => handleGeneralChange('refreshInterval', value)}
                  />
                </Group>
              )}
            </Stack>
          </Paper>
        </Tabs.Panel>
        
        <Tabs.Panel value="notifications">
          <Paper withBorder p="xl" radius="md">
            <Title order={4} mb="md">Notification Settings</Title>
            
            <Stack spacing="md">
              <Group position="apart">
                <div>
                  <Text>Low Stock Alerts</Text>
                  <Text size="xs" color="dimmed">Get notified when items are running low</Text>
                </div>
                <Switch 
                  checked={notificationSettings.lowStockAlerts} 
                  onChange={(e) => handleNotificationChange('lowStockAlerts', e.currentTarget.checked)}
                />
              </Group>
              
              <Group position="apart">
                <div>
                  <Text>Expiry Alerts</Text>
                  <Text size="xs" color="dimmed">Get notified when items are about to expire</Text>
                </div>
                <Switch 
                  checked={notificationSettings.expiryAlerts} 
                  onChange={(e) => handleNotificationChange('expiryAlerts', e.currentTarget.checked)}
                />
              </Group>
              
              {notificationSettings.expiryAlerts && (
                <Group grow>
                  <Text>Alert Days Before Expiry</Text>
                  <NumberInput
                    min={1}
                    max={180}
                    value={notificationSettings.alertDays}
                    onChange={(value) => handleNotificationChange('alertDays', value)}
                  />
                </Group>
              )}
              
              <Divider my="sm" />
              
              <Group position="apart">
                <div>
                  <Text>Email Notifications</Text>
                  <Text size="xs" color="dimmed">Receive alerts via email</Text>
                </div>
                <Switch 
                  checked={notificationSettings.emailNotifications} 
                  onChange={(e) => handleNotificationChange('emailNotifications', e.currentTarget.checked)}
                />
              </Group>
              
              <Group position="apart">
                <div>
                  <Text>Push Notifications</Text>
                  <Text size="xs" color="dimmed">Receive alerts via browser notifications</Text>
                </div>
                <Switch 
                  checked={notificationSettings.pushNotifications} 
                  onChange={(e) => handleNotificationChange('pushNotifications', e.currentTarget.checked)}
                />
              </Group>
            </Stack>
          </Paper>
        </Tabs.Panel>
        
        <Tabs.Panel value="backup">
          <Paper withBorder p="xl" radius="md">
            <Title order={4} mb="md">Backup & Data Settings</Title>
            
            <Stack spacing="md">
              <Group position="apart">
                <div>
                  <Text>Automatic Backups</Text>
                  <Text size="xs" color="dimmed">Automatically backup your data</Text>
                </div>
                <Switch 
                  checked={backupSettings.autoBackup} 
                  onChange={(e) => handleBackupChange('autoBackup', e.currentTarget.checked)}
                />
              </Group>
              
              {backupSettings.autoBackup && (
                <>
                  <Group grow>
                    <Text>Backup Frequency</Text>
                    <Select
                      data={[
                        { value: 'daily', label: 'Daily' },
                        { value: 'weekly', label: 'Weekly' },
                        { value: 'monthly', label: 'Monthly' },
                      ]}
                      value={backupSettings.backupFrequency}
                      onChange={(value) => handleBackupChange('backupFrequency', value)}
                    />
                  </Group>
                  
                  <Group grow>
                    <Text>Backup Retention (days)</Text>
                    <NumberInput
                      min={1}
                      max={365}
                      value={backupSettings.backupRetention}
                      onChange={(value) => handleBackupChange('backupRetention', value)}
                    />
                  </Group>
                </>
              )}
              
              <Divider my="sm" />
              
              <Group>
                <Button variant="outline">Export All Data</Button>
                <Button variant="outline" color="red">Clear All Data</Button>
              </Group>
            </Stack>
          </Paper>
        </Tabs.Panel>
      </Tabs>
      
      <Group position="right" mt="xl">
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </Group>
    </Container>
  );
};

export default Settings;
