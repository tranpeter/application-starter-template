import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  SimpleGrid,
  Card,
  Group,
  Text,
  Title,
  Badge,
  Stack,
  Paper,
  Button,
  Table,
  Container,
} from '@mantine/core';
import { 
  IconPackage, 
  IconAlertCircle, 
  IconCalendarStats,
  IconArrowRight,
  IconShoppingCart,
  IconAlertTriangle,
} from '@tabler/icons-react';

// Mock data - would be replaced with API calls
const lowStockItems = [
  { id: 1, name: 'Composite Filling Material - A2', quantity: 3, minimumQuantity: 5, unit: 'syringes' },
  { id: 2, name: 'Dental Implant - 4.0mm x 10mm', quantity: 3, minimumQuantity: 5, unit: 'pieces' },
];

const expiringItems = [
  { id: 1, name: 'Lidocaine 2% with Epinephrine', expiryDate: '2025-10-15', daysUntil: 30, quantity: 10 },
  { id: 2, name: 'Composite Filling Material - A2', expiryDate: '2025-10-20', daysUntil: 35, quantity: 2 },
];

const recentActivity = [
  { id: 1, item: 'Nitrile Gloves - Medium', action: 'Added', quantity: 100, user: 'John Doe', timestamp: '2025-09-15 13:45' },
  { id: 2, item: 'Lidocaine 2%', action: 'Removed', quantity: 5, user: 'Jane Smith', timestamp: '2025-09-15 11:20' },
  { id: 3, item: 'Dental Implant - 4.0mm x 10mm', action: 'Added', quantity: 10, user: 'John Doe', timestamp: '2025-09-14 16:30' },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStockCount: 0,
    expiryAlertCount: 0,
    itemsAddedToday: 0,
  });

  // Simulate loading data
  useEffect(() => {
    // In a real application, this would be an API call
    setStats({
      totalItems: 250,
      lowStockCount: lowStockItems.length,
      expiryAlertCount: expiringItems.length,
      itemsAddedToday: 15,
    });
  }, []);

  return (
    <Container size="xl">
      <Title order={2} mb="md">Dashboard</Title>

      {/* Stats Cards */}
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]} mb="lg">
        <Card withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" weight={500}>TOTAL INVENTORY</Text>
            <IconPackage size={20} color="blue" />
          </Group>
          <Group position="apart" mt="md">
            <Text weight={700} size="xl">{stats.totalItems}</Text>
            <Badge color="blue">Items</Badge>
          </Group>
        </Card>

        <Card withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" weight={500}>LOW STOCK ALERTS</Text>
            <IconAlertCircle size={20} color="orange" />
          </Group>
          <Group position="apart" mt="md">
            <Text weight={700} size="xl">{stats.lowStockCount}</Text>
            <Badge color="orange">Items</Badge>
          </Group>
        </Card>

        <Card withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" weight={500}>EXPIRY ALERTS</Text>
            <IconCalendarStats size={20} color="red" />
          </Group>
          <Group position="apart" mt="md">
            <Text weight={700} size="xl">{stats.expiryAlertCount}</Text>
            <Badge color="red">Items</Badge>
          </Group>
        </Card>

        <Card withBorder p="md" radius="md">
          <Group position="apart">
            <Text size="xs" color="dimmed" weight={500}>ADDED TODAY</Text>
            <IconShoppingCart size={20} color="green" />
          </Group>
          <Group position="apart" mt="md">
            <Text weight={700} size="xl">{stats.itemsAddedToday}</Text>
            <Badge color="green">Items</Badge>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Alerts Section */}
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing="lg" mb="xl">
        <Paper withBorder p="md" radius="md">
          <Group position="apart" mb="xs">
            <Text weight={600}>Low Stock Items</Text>
            <Button 
              component={Link} 
              to="/app/inventory?filter=low-stock" 
              variant="subtle" 
              rightIcon={<IconArrowRight size={16} />}
              compact
            >
              View All
            </Button>
          </Group>
          <Table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Min. Qty</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Group spacing="xs">
                      <IconAlertTriangle size={16} color="orange" />
                      <Text size="sm">{item.name}</Text>
                    </Group>
                  </td>
                  <td>{item.quantity} {item.unit}</td>
                  <td>{item.minimumQuantity} {item.unit}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>

        <Paper withBorder p="md" radius="md">
          <Group position="apart" mb="xs">
            <Text weight={600}>Expiring Items</Text>
            <Button 
              component={Link} 
              to="/app/inventory?filter=expiring" 
              variant="subtle" 
              rightIcon={<IconArrowRight size={16} />}
              compact
            >
              View All
            </Button>
          </Group>
          <Table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Expiry Date</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {expiringItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Group spacing="xs">
                      <IconAlertTriangle size={16} color="red" />
                      <Text size="sm">{item.name}</Text>
                    </Group>
                  </td>
                  <td>
                    <Badge color="red" variant="light">{item.expiryDate} ({item.daysUntil} days)</Badge>
                  </td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      </SimpleGrid>

      {/* Recent Activity */}
      <Paper withBorder p="md" radius="md">
        <Group position="apart" mb="xs">
          <Text weight={600}>Recent Activity</Text>
        </Group>
        <Table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Action</th>
              <th>Quantity</th>
              <th>User</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.item}</td>
                <td>
                  <Badge 
                    color={activity.action === 'Added' ? 'green' : 'blue'} 
                    variant="light"
                  >
                    {activity.action}
                  </Badge>
                </td>
                <td>{activity.quantity}</td>
                <td>{activity.user}</td>
                <td>{activity.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Dashboard;
