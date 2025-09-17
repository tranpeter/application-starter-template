import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Title, Text, Button, Group, Center } from '@mantine/core';

const NotFound = () => {
  return (
    <Container size="sm" style={{ marginTop: '4rem', textAlign: 'center' }}>
      <Title order={1} size="3rem" mb="md">404</Title>
      <Title order={2} mb="lg">Page Not Found</Title>
      <Text mb="xl" color="dimmed">
        The page you are looking for doesn't exist or has been moved.
      </Text>
      <Center>
        <Group>
          <Button component={Link} to="/app">
            Go to Dashboard
          </Button>
          <Button variant="outline" component="a" href="mailto:support@medident.com">
            Contact Support
          </Button>
        </Group>
      </Center>
    </Container>
  );
};

export default NotFound;
