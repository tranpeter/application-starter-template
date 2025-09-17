import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Paper,
  Table,
  Button,
  Group,
  TextInput,
  Badge,
  ActionIcon,
  Menu,
  Modal,
  Stack,
  PasswordInput,
  Select,
  Text,
} from '@mantine/core';
import { IconSearch, IconPlus, IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

// Mock data for users
const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', isActive: true },
  { id: 2, name: 'Office Manager', email: 'manager@example.com', role: 'manager', isActive: true },
  { id: 3, name: 'Dental Assistant', email: 'assistant@example.com', role: 'assistant', isActive: true },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [userModalOpened, { open: openUserModal, close: closeUserModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  
  // Form state
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'assistant',
  });
  
  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchUsers = async () => {
    //   try {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    //     setUsers(response.data.users);
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // Mock data fetch
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);
  
  const handleSearch = () => {
    setLoading(true);
    
    // In a real app, this would be an API call with search params
    setTimeout(() => {
      const filtered = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsers(filtered);
      setLoading(false);
    }, 300);
  };
  
  const handleAddUser = () => {
    setCurrentUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'assistant',
    });
    openUserModal();
  };
  
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
    openUserModal();
  };
  
  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    openDeleteModal();
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmitUser = () => {
    // In a real app, this would be an API call
    if (currentUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        isActive: true,
      };
      setUsers([...users, newUser]);
    }
    
    closeUserModal();
  };
  
  const handleConfirmDelete = () => {
    // In a real app, this would be an API call
    const updatedUsers = users.filter(user => user.id !== currentUser.id);
    setUsers(updatedUsers);
    closeDeleteModal();
  };
  
  return (
    <Container size="xl">
      <Group position="apart" mb="md">
        <Title order={2}>Users</Title>
        <Button leftIcon={<IconPlus size={16} />} onClick={handleAddUser}>
          Add User
        </Button>
      </Group>
      
      <Paper withBorder p="md" mb="xl">
        <Group>
          <TextInput
            icon={<IconSearch size={16} />}
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
          <Button onClick={handleSearch}>Search</Button>
        </Group>
      </Paper>
      
      <Paper withBorder p="md">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ width: 80 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge 
                      color={
                        user.role === 'admin' ? 'red' : 
                        user.role === 'manager' ? 'blue' : 
                        'green'
                      }
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </td>
                  <td>
                    <Badge color={user.isActive ? 'green' : 'gray'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td>
                    <Menu position="bottom-end" withArrow>
                      <Menu.Target>
                        <ActionIcon>
                          <IconDotsVertical size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item 
                          icon={<IconEdit size={14} />} 
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item 
                          icon={<IconTrash size={14} />} 
                          color="red"
                          onClick={() => handleDeleteUser(user)}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Paper>
      
      {/* User Modal */}
      <Modal
        opened={userModalOpened}
        onClose={closeUserModal}
        title={currentUser ? 'Edit User' : 'Add New User'}
        size="md"
      >
        <Stack>
          <TextInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="User's full name"
            required
          />
          
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@example.com"
            required
          />
          
          <PasswordInput
            label={currentUser ? 'New Password (leave blank to keep current)' : 'Password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required={!currentUser}
          />
          
          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={(value) => handleSelectChange('role', value)}
            data={[
              { value: 'admin', label: 'Administrator' },
              { value: 'manager', label: 'Office Manager' },
              { value: 'assistant', label: 'Dental/Medical Assistant' },
            ]}
            required
          />
          
          <Group position="right" mt="md">
            <Button variant="subtle" onClick={closeUserModal}>Cancel</Button>
            <Button onClick={handleSubmitUser}>
              {currentUser ? 'Update User' : 'Add User'}
            </Button>
          </Group>
        </Stack>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Delete User"
        size="sm"
      >
        {currentUser && (
          <Stack>
            <Text>Are you sure you want to delete <strong>{currentUser.name}</strong>?</Text>
            <Text size="sm" color="dimmed">This action cannot be undone.</Text>
            
            <Group position="right" mt="md">
              <Button variant="subtle" onClick={closeDeleteModal}>Cancel</Button>
              <Button color="red" onClick={handleConfirmDelete}>Delete</Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Container>
  );
};

export default Users;
