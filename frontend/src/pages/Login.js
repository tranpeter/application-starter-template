import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Text,
  Anchor,
  Stack,
} from '@mantine/core';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }
    
    try {
      const result = await login(email, password);
      
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error ? ' ' : null}
        />
        
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
        />
        
        <Group position="apart" mt="lg">
          <Anchor component={Link} to="/register" size="sm">
            Don't have an account? Register
          </Anchor>
          <Button type="submit" loading={loading}>
            Sign in
          </Button>
        </Group>
        
        <Anchor component={Link} to="/forgot-password" size="xs">
          Forgot password?
        </Anchor>
      </Stack>
    </form>
  );
};

export default Login;
