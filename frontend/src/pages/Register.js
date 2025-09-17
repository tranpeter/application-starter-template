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
  Select,
} from '@mantine/core';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'assistant', // Default role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={error ? ' ' : null}
        />
        
        <TextInput
          label="Email"
          placeholder="your@email.com"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={error ? ' ' : null}
        />
        
        <PasswordInput
          label="Password"
          placeholder="Your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          error={error ? ' ' : null}
        />
        
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          error={error}
        />
        
        <Select
          label="Role"
          placeholder="Select your role"
          data={[
            { value: 'assistant', label: 'Dental/Medical Assistant' },
            { value: 'manager', label: 'Office Manager' },
            { value: 'admin', label: 'Administrator' },
          ]}
          value={formData.role}
          onChange={handleSelectChange}
          required
        />
        
        <Group position="apart" mt="lg">
          <Anchor component={Link} to="/login" size="sm">
            Already have an account? Login
          </Anchor>
          <Button type="submit" loading={loading}>
            Register
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default Register;
