import React, { useState, useContext } from 'react';
import {
  Container,
  Title,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Stack,
  Avatar,
  Text,
  Divider,
} from '@mantine/core';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    // Validate passwords if changing
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setError('Current password is required to set a new password');
        setLoading(false);
        return;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        setLoading(false);
        return;
      }
    }
    
    try {
      // In a real app, this would be an API call
      // const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/profile`, {
      //   name: formData.name,
      //   email: formData.email,
      //   currentPassword: formData.currentPassword,
      //   password: formData.newPassword || undefined,
      // });
      
      // Mock API call
      setTimeout(() => {
        setSuccess('Profile updated successfully');
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <Container size="md">
      <Title order={2} mb="xl">My Profile</Title>
      
      <Paper withBorder p="xl" radius="md">
        <Group position="center" mb="lg">
          <Avatar size={100} radius={100} color="blue">
            {formData.name.charAt(0) || 'U'}
          </Avatar>
        </Group>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing="md">
            <TextInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
            
            <TextInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              disabled
              description="Email cannot be changed"
            />
            
            <Divider label="Change Password" labelPosition="center" my="lg" />
            
            <PasswordInput
              label="Current Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
            />
            
            <PasswordInput
              label="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            
            <PasswordInput
              label="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              error={error}
            />
            
            {success && <Text color="green">{success}</Text>}
            
            <Group position="right" mt="md">
              <Button type="submit" loading={loading}>
                Update Profile
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
