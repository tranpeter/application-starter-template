import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Container,
  Title,
  Group,
  Button,
  TextInput,
  Select,
  Paper,
  Badge,
  ActionIcon,
  Menu,
  Text,
  Modal,
  NumberInput,
  Textarea,
  Tabs,
  Stack,
  Loader,
} from '@mantine/core';
import {
  IconSearch,
  IconAdjustments,
  IconPlus,
  IconEdit,
  IconTrash,
  IconDotsVertical,
  IconFilter,
  IconDownload,
  IconUpload,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

// Import a table component - would normally be in a separate file
const InventoryTable = ({ data, loading, onEdit, onDelete, onUpdateQuantity }) => {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Loader />
      </div>
    );
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #dee2e6' }}>
          <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
          <th style={{ padding: '12px', textAlign: 'left' }}>SKU</th>
          <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
          <th style={{ padding: '12px', textAlign: 'right' }}>Quantity</th>
          <th style={{ padding: '12px', textAlign: 'left' }}>Location</th>
          <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
          <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} style={{ borderBottom: '1px solid #dee2e6' }}>
            <td style={{ padding: '12px' }}>
              <Link to={`/app/inventory/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}>
                {item.name}
              </Link>
            </td>
            <td style={{ padding: '12px' }}>{item.sku}</td>
            <td style={{ padding: '12px' }}>{item.category}</td>
            <td style={{ padding: '12px', textAlign: 'right' }}>
              {item.quantity} {item.unit}
            </td>
            <td style={{ padding: '12px' }}>{item.location}</td>
            <td style={{ padding: '12px', textAlign: 'center' }}>
              {item.quantity <= item.minimumQuantity ? (
                <Badge color="orange">Low Stock</Badge>
              ) : (
                <Badge color="green">In Stock</Badge>
              )}
            </td>
            <td style={{ padding: '12px', textAlign: 'right' }}>
              <Group spacing={0} position="right">
                <Menu position="bottom-end" withArrow>
                  <Menu.Target>
                    <ActionIcon>
                      <IconDotsVertical size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<IconPlus size={14} />} onClick={() => onUpdateQuantity(item, true)}>
                      Add Stock
                    </Menu.Item>
                    <Menu.Item icon={<IconMinus size={14} />} onClick={() => onUpdateQuantity(item, false)}>
                      Remove Stock
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item icon={<IconEdit size={14} />} onClick={() => onEdit(item)}>
                      Edit Item
                    </Menu.Item>
                    <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => onDelete(item)}>
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Mock data for inventory items
const mockInventoryItems = [
  {
    id: 1,
    name: 'Nitrile Gloves - Small',
    sku: 'GLV-001',
    category: 'PPE',
    quantity: 500,
    minimumQuantity: 100,
    unit: 'pairs',
    location: 'Cabinet A',
    notes: 'Blue nitrile examination gloves, powder-free',
  },
  {
    id: 2,
    name: 'Nitrile Gloves - Medium',
    sku: 'GLV-002',
    category: 'PPE',
    quantity: 750,
    minimumQuantity: 150,
    unit: 'pairs',
    location: 'Cabinet A',
    notes: 'Blue nitrile examination gloves, powder-free',
  },
  {
    id: 3,
    name: 'Nitrile Gloves - Large',
    sku: 'GLV-003',
    category: 'PPE',
    quantity: 400,
    minimumQuantity: 100,
    unit: 'pairs',
    location: 'Cabinet A',
    notes: 'Blue nitrile examination gloves, powder-free',
  },
  {
    id: 4,
    name: 'Lidocaine 2% with Epinephrine',
    sku: 'MED-001',
    category: 'Medications',
    quantity: 25,
    minimumQuantity: 10,
    unit: 'vials',
    location: 'Medication Cabinet',
    notes: 'Keep refrigerated',
  },
  {
    id: 5,
    name: 'Dental Implant - 4.0mm x 10mm',
    sku: 'IMP-001',
    category: 'Implants',
    quantity: 3,
    minimumQuantity: 5,
    unit: 'pieces',
    location: 'Secure Cabinet',
    notes: 'Titanium dental implants',
  },
];

// Mock categories
const mockCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'PPE', label: 'PPE' },
  { value: 'Medications', label: 'Medications' },
  { value: 'Implants', label: 'Implants' },
  { value: 'Supplies', label: 'Supplies' },
  { value: 'Instruments', label: 'Instruments' },
];

const Inventory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Modals
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [quantityModalOpened, { open: openQuantityModal, close: closeQuantityModal }] = useDisclosure(false);
  const [importModalOpened, { open: openImportModal, close: closeImportModal }] = useDisclosure(false);
  
  // Current item being edited/deleted
  const [currentItem, setCurrentItem] = useState(null);
  const [isAddingStock, setIsAddingStock] = useState(true);
  
  // Form state for quantity update
  const [quantityChange, setQuantityChange] = useState(0);
  const [quantityReason, setQuantityReason] = useState('');
  
  useEffect(() => {
    // Get filter from URL if available
    const filterParam = searchParams.get('filter');
    
    // Simulate API call
    setTimeout(() => {
      let filteredItems = [...mockInventoryItems];
      
      if (filterParam === 'low-stock') {
        filteredItems = filteredItems.filter(item => item.quantity <= item.minimumQuantity);
      } else if (filterParam === 'expiring') {
        // In a real app, we would filter by expiry date
      }
      
      setInventoryItems(filteredItems);
      setLoading(false);
    }, 500);
  }, [searchParams]);
  
  // Handlers
  const handleEdit = (item) => {
    setCurrentItem(item);
    openEditModal();
  };
  
  const handleDelete = (item) => {
    setCurrentItem(item);
    openDeleteModal();
  };
  
  const handleUpdateQuantity = (item, isAdding) => {
    setCurrentItem(item);
    setIsAddingStock(isAdding);
    setQuantityChange(0);
    setQuantityReason('');
    openQuantityModal();
  };
  
  const handleConfirmQuantityUpdate = () => {
    // In a real app, this would call an API
    const updatedItems = inventoryItems.map(item => {
      if (item.id === currentItem.id) {
        const newQuantity = isAddingStock 
          ? item.quantity + quantityChange
          : item.quantity - quantityChange;
        return { ...item, quantity: Math.max(0, newQuantity) };
      }
      return item;
    });
    
    setInventoryItems(updatedItems);
    closeQuantityModal();
  };
  
  const handleConfirmDelete = () => {
    // In a real app, this would call an API
    setInventoryItems(inventoryItems.filter(item => item.id !== currentItem.id));
    closeDeleteModal();
  };
  
  const handleSearch = () => {
    // In a real app, this would call an API with search params
    setLoading(true);
    setTimeout(() => {
      const filtered = mockInventoryItems.filter(item => {
        const matchesSearch = searchTerm 
          ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.sku.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        
        const matchesCategory = categoryFilter !== 'all' 
          ? item.category === categoryFilter 
          : true;
        
        return matchesSearch && matchesCategory;
      });
      
      setInventoryItems(filtered);
      setLoading(false);
    }, 300);
  };
  
  return (
    <Container size="xl">
      <Group position="apart" mb="md">
        <Title order={2}>Inventory</Title>
        <Button leftIcon={<IconPlus size={16} />} onClick={() => handleEdit(null)}>
          Add New Item
        </Button>
      </Group>
      
      {/* Search and Filters */}
      <Paper withBorder p="md" mb="xl">
        <Group position="apart">
          <Group>
            <TextInput
              icon={<IconSearch size={16} />}
              placeholder="Search by name or SKU"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 250 }}
            />
            <Select
              icon={<IconFilter size={16} />}
              data={mockCategories}
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ width: 200 }}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Group>
          
          <Group>
            <Button 
              variant="outline" 
              leftIcon={<IconUpload size={16} />}
              onClick={openImportModal}
            >
              Import CSV
            </Button>
            <Button 
              variant="outline" 
              leftIcon={<IconDownload size={16} />}
              component="a"
              href={`${process.env.REACT_APP_API_URL}/inventory/export`}
              download="inventory-export.csv"
            >
              Export CSV
            </Button>
          </Group>
        </Group>
      </Paper>
      
      {/* Tabs */}
      <Tabs defaultValue="all" mb="md">
        <Tabs.List>
          <Tabs.Tab value="all">All Items</Tabs.Tab>
          <Tabs.Tab value="low-stock" color="orange">Low Stock</Tabs.Tab>
          <Tabs.Tab value="expiring" color="red">Expiring Soon</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      
      {/* Inventory Table */}
      <Paper withBorder p="md">
        <InventoryTable 
          data={inventoryItems} 
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </Paper>
      
      {/* Modals */}
      {/* Quantity Update Modal */}
      <Modal
        opened={quantityModalOpened}
        onClose={closeQuantityModal}
        title={`${isAddingStock ? 'Add to' : 'Remove from'} Inventory`}
        size="md"
      >
        {currentItem && (
          <Stack>
            <Text weight={500}>{currentItem.name}</Text>
            <Text size="sm" color="dimmed">Current quantity: {currentItem.quantity} {currentItem.unit}</Text>
            
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
              <Button color={isAddingStock ? 'blue' : 'orange'} onClick={handleConfirmQuantityUpdate}>
                {isAddingStock ? 'Add Stock' : 'Remove Stock'}
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Delete Inventory Item"
        size="sm"
      >
        {currentItem && (
          <Stack>
            <Text>Are you sure you want to delete <strong>{currentItem.name}</strong>?</Text>
            <Text size="sm" color="dimmed">This action cannot be undone.</Text>
            
            <Group position="right" mt="md">
              <Button variant="subtle" onClick={closeDeleteModal}>Cancel</Button>
              <Button color="red" onClick={handleConfirmDelete}>Delete</Button>
            </Group>
          </Stack>
        )}
      </Modal>
      
      {/* Import Modal */}
      <Modal
        opened={importModalOpened}
        onClose={closeImportModal}
        title="Import Inventory from CSV"
        size="md"
      >
        <Stack>
          <Text size="sm">Upload a CSV file to import inventory items.</Text>
          <Text size="xs" color="dimmed">
            CSV file should have the following columns: name, sku, category, quantity, minimumQuantity, unit, location, notes
          </Text>
          
          <input type="file" accept=".csv" />
          
          <Group position="right" mt="md">
            <Button variant="subtle" onClick={closeImportModal}>Cancel</Button>
            <Button onClick={closeImportModal}>Import</Button>
          </Group>
        </Stack>
      </Modal>
      
      {/* Edit/Add Item Modal would be more complex and likely in its own component */}
    </Container>
  );
};

// Missing icon definition
const IconMinus = ({ size, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    strokeWidth="2" 
    stroke="currentColor" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default Inventory;
