import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Title,
  Text,
  Image,
  Center,
  Box,
} from '@mantine/core';

import AuthContext from '../context/AuthContext';

const AuthLayout = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated && !loading) {
    return <Navigate to="/app" />;
  }

  return (
    <Container size={420} my={40}>
      <Center mb={30}>
        <Box>
          <Title ta="center" size="h2">
            MediDent Inventory Manager
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Streamline your inventory management
          </Text>
        </Box>
      </Center>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Outlet />
      </Paper>
    </Container>
  );
};

export default AuthLayout;
