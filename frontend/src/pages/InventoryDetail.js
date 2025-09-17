import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Paper,
  Group,
  Button,
  Text,
  Badge,
  Grid,
  Card,
  Tabs,
  Table,
  ActionIcon,
  Modal,
  NumberInput,
  Textarea,
  Stack,
  Select,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconPlus,
  IconMinus,
  IconHistory,
  IconQrcode,
  IconPackage,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

// Mock data for a single inventory item
const mockItem = {
  id: 4,
  name: 'Lidocaine 2% with Epinephrine',
  sku: 'MED-001',
  category: 'Medications',
  quantity: 25,
  minimumQuantity: 10,
  unit: 'vials',
  location: 'Medication Cabinet',
  notes: 'Keep refrigerated',
  requiresLotTracking: true,
  isActive: true,
  createdAt: '2025-09-01T10:30:00Z',
  updatedAt: '2025-09-15T14:20:00Z',
  lots: [
    {
      id: 1,
      lotNumber: 'LOT-12345',
      expiryDate: '2026-01-15',
      quantity: 15,
      supplier: 'MediSupply Inc.',
      invoiceNumber: 'INV-2025-001',
      receivedDate: '2025-09-01',
    },
    {
      id: 2,
      lotNumber: 'LOT-12346',
      expiryDate: '2025-10-15',
      quantity: 10,
      supplier: 'MediSupply Inc.',
      invoiceNumber: 'INV-2025-002',
      receivedDate: '2025-09-10',
    },
  ],
  history: [
    {
      id: 1,
      action: 'Added',
      quantity: 15,
      lotNumber: 'LOT-12345',
      reason: 'Initial stock',
      user: 'Admin User',
      timestamp: '2025-09-01T10:30:00Z',
    },
    {
      id: 2,
      action: 'Added',
      quantity: 10,
      lotNumber: 'LOT-12346',
      reason: 'Restock',
      user: 'Manager User',
      timestamp: '2025-09-10T14:20:00Z',
    },
  ],
};

const InventoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [quantityModalOpened, { open: openQuantityModal, close: closeQuantityModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [lotModalOpened, { open: openLotModal, close: closeLotModal }] = useDisclosure(false);
  
  // Form state
  const [isAddingStock, setIsAddingStock] = useState(true);
  const [quantityChange, setQuantityChange] = useState(0);
  const [quantityReason, setQuantityReason] = useState('');
  const [selectedLot, setSelectedLot] = useState(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchItem = async () => {
    //   try {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/inventory/${id}`);
    //     setItem(response.data);
    //   } catch (error) {
    //     console.error('Error fetching item:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // Mock data fetch
    setTimeout(() => {
      setItem(mockItem);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleUpdateQuantity = (isAdding) => {
    setIsAddingStock(isAdding);
    setQuantityChange(0);
    setQuantityReason('');
    setSelectedLot(null);
    openQuantityModal();
  };
  
  const handleConfirmQuantityUpdate = () => {
    // In a real app, this would call an API
    console.log('Updating quantity', {
      isAdding: isAddingStock,
      quantity: quantityChange,
      reason: quantityReason,
      lotId: selectedLot,
    });
    
    closeQuantityModal();
  };
  
  const handleDelete = () => {
    openDeleteModal();
  };
  
  const handleConfirmDelete = () => {
    // In a real app, this would call an API
    console.log('Deleting item', item.id);
    
    closeDeleteModal();
    navigate('/app/inventory');
  };
  
  const handleAddLot = () => {
    openLotModal();
  };
  
  if (loading) {
    return (
      <Container size="xl" style={{ padding: '2rem' }}>
        <Text>Loading...</Text>
      </Container>
    );
  }
  
  if (!item) {
    return (
      <Container size="xl" style={{ padding: '2rem' }}>
        <Text>Item not found</Text>
        <Button onClick={() => navigate('/app/inventory')}>Back to Inventory</Button>
      </Container>
    );
  }
  
  return (
    <Container size="xl">
      <Group position="apart" mb="md">
        <Group>
          <Button 
            leftIcon={<IconArrowLeft size={16} />} 
            variant="subtle"
            onClick={() => navigate('/app/inventory')}
          >
            Back to Inventory
          </Button>
          <Title order={2}>{item.name}</Title>
          <Badge 
            color={item.quantity <= item.minimumQuantity ? 'orange' : 'green'}
            size="lg"
          >
            {item.quantity <= item.minimumQuantity ? 'Low Stock' : 'In Stock'}
          </Badge>
        </Group>
        <Group>
          <Button 
            leftIcon={<IconPlus size={16} />}
            color="green"
            onClick={() => handleUpdateQuantity(true)}
          >
            Add Stock
          </Button>
          <Button 
            leftIcon={<IconMinus size={16} />}
            color="orange"
            onClick={() => handleUpdateQuantity(false)}
          >
            Remove Stock
          </Button>
          <Button 
            leftIcon={<IconEdit size={16} />}
            variant="outline"
          >
            Edit
          </Button>
          <Button 
            leftIcon={<IconTrash size={16} />}
            color="red"
            variant="outline"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Group>
      </Group>
      
      <Grid>
        <Grid.Col span={4}>
          <Card withBorder p="md">
            <Title order={4} mb="md">Item Details</Title>
            <Table>
              <tbody>
                <tr>
                  <td><Text weight={500}>SKU</Text></td>
                  <td>{item.sku}</td>
                </tr>
                <tr>
                  <td><Text weight={500}>Category</Text></td>
                  <td>{item.category}</td>
                </tr>
                <tr>
                  <td><Text weight={500}>Quantity</Text></td>
                  <td>{item.quantity} {item.unit}</td>
                </tr>
                <tr>
                  <td><Text weight={500}>Minimum Quantity</Text></td>
                  <td>{item.minimumQuantity} {item.unit}</td>
                </tr>
                <tr>
                  <td><Text weight={500}>Location</Text></td>
                  <td>{item.location}</td>
                </tr>
                <tr>
                  <td><Text weight={500}>Lot Tracking</Text></td>
                  <td>
                    <Badge color={item.requiresLotTracking ? 'blue' : 'gray'}>
                      {item.requiresLotTracking ? 'Required' : 'Not Required'}
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td><Text weight={500}>Notes</Text></td>
                  <td>{item.notes}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={8}>
          <Tabs defaultValue="lots">
            <Tabs.List>
              <Tabs.Tab value="lots" icon={<IconPackage size={16} />}>Lots</Tabs.Tab>
              <Tabs.Tab value="history" icon={<IconHistory size={16} />}>History</Tabs.Tab>
              <Tabs.Tab value="qr" icon={<IconQrcode size={16} />}>QR Codes</Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Panel value="lots" pt="md">
              <Group position="apart" mb="md">
                <Title order={4}>Lot Information</Title>
                {item.requiresLotTracking && (
                  <Button 
                    leftIcon={<IconPlus size={16} />} 
                    size="sm"
                    onClick={handleAddLot}
                  >
                    Add Lot
                  </Button>
                )}
              </Group>
              
              {item.requiresLotTracking ? (
                <Table>
                  <thead>
                    <tr>
                      <th>Lot Number</th>
                      <th>Expiry Date</th>
                      <th>Quantity</th>
                      <th>Supplier</th>
                      <th>Invoice</th>
                      <th>Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.lots.map((lot) => (
                      <tr key={lot.id}>
                        <td>{lot.lotNumber}</td>
                        <td>
                          <Badge 
                            color={new Date(lot.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'red' : 'blue'}
                          >
                            {lot.expiryDate}
                          </Badge>
                        </td>
                        <td>{lot.quantity} {item.unit}</td>
                        <td>{lot.supplier}</td>
                        <td>{lot.invoiceNumber}</td>
                        <td>{lot.receivedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Text color="dimmed">This item does not require lot tracking.</Text>
              )}
            </Tabs.Panel>
            
            <Tabs.Panel value="history" pt="md">
              <Title order={4} mb="md">Activity History</Title>
              <Table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Quantity</th>
                    <th>Lot Number</th>
                    <th>Reason</th>
                    <th>User</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {item.history.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <Badge 
                          color={entry.action === 'Added' ? 'green' : entry.action === 'Removed' ? 'orange' : 'blue'}
                        >
                          {entry.action}
                        </Badge>
                      </td>
                      <td>{entry.quantity} {item.unit}</td>
                      <td>{entry.lotNumber || '-'}</td>
                      <td>{entry.reason}</td>
                      <td>{entry.user}</td>
                      <td>{new Date(entry.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tabs.Panel>
            
            <Tabs.Panel value="qr" pt="md">
              <Title order={4} mb="md">QR Codes</Title>
              <Text mb="md">
                QR code functionality is available in the Pro tier. Upgrade to access this feature.
              </Text>
              <Button variant="outline">Upgrade to Pro</Button>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
      
      {/* Quantity Update Modal */}
      <Modal
        opened={quantityModalOpened}
        onClose={closeQuantityModal}
        title={`${isAddingStock ? 'Add to' : 'Remove from'} Inventory`}
        size="md"
      >
        <Stack>
          <Text weight={500}>{item.name}</Text>
          <Text size="sm" color="dimmed">Current quantity: {item.quantity} {item.unit}</Text>
          
          {item.requiresLotTracking && (
            <Select
              label="Lot Number"
              placeholder="Select lot number"
              data={item.lots.map(lot => ({ value: lot.id.toString(), label: `${lot.lotNumber} (${lot.quantity} ${item.unit})` }))}
              value={selectedLot}
              onChange={setSelectedLot}
              required
            />
          )}
          
          <NumberInput
            label="Quantity"
            placeholder="Enter quantity"
            min={1}
            value={quantityChange}
            onChange={(val) => setQuantityChange(val)}
            required
          />
          
          <Textarea
            label="Reason"
            placeholder="Specify reason for this update"
            value={quantityReason}
            onChange={(e) => setQuantityReason(e.target.value)}
          />
          
          <Group position="right" mt="md">
            <Button variant="subtle" onClick={closeQuantityModal}>Cancel</Button>
            <Button color={isAddingStock ? 'green' : 'orange'} onClick={handleConfirmQuantityUpdate}>
              {isAddingStock ? 'Add Stock' : 'Remove Stock'}
            </Button>
          </Group>
        </Stack>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Delete Inventory Item"
        size="sm"
      >
        <Stack>
          <Text>Are you sure you want to delete <strong>{item.name}</strong>?</Text>
          <Text size="sm" color="dimmed">This action cannot be undone.</Text>
          
          <Group position="right" mt="md">
            <Button variant="subtle" onClick={closeDeleteModal}>Cancel</Button>
            <Button color="red" onClick={handleConfirmDelete}>Delete</Button>
          </Group>
        </Stack>
      </Modal>
      
      {/* Add Lot Modal */}
      <Modal
        opened={lotModalOpened}
        onClose={closeLotModal}
        title="Add New Lot"
        size="md"
      >
        <Text>Lot management functionality would be implemented here.</Text>
        <Group position="right" mt="md">
          <Button onClick={closeLotModal}>Close</Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default InventoryDetail;
