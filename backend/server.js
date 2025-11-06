const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const products = [
  { id: '1', name: 'Wireless Headphones', price: 99.99, image: 'https://picsum.photos/300/300?random=1', description: 'High-quality wireless headphones' },
  { id: '2', name: 'Smartphone', price: 699.99, image: 'https://picsum.photos/300/300?random=2', description: 'Latest smartphone model' },
  { id: '3', name: 'Laptop', price: 1299.99, image: 'https://picsum.photos/300/300?random=3', description: 'Powerful gaming laptop' },
  { id: '4', name: 'Smart Watch', price: 249.99, image: 'https://picsum.photos/300/300?random=4', description: 'Feature-rich smartwatch' },
  { id: '5', name: 'Tablet', price: 449.99, image: 'https://picsum.photos/300/300?random=5', description: '10-inch tablet' },
  { id: '6', name: 'Camera', price: 799.99, image: 'https://picsum.photos/300/300?random=6', description: 'Professional DSLR camera' },
  { id: '7', name: 'Gaming Console', price: 499.99, image: 'https://picsum.photos/300/300?random=7', description: 'Next-gen gaming console' }
];

let cart = [];

// Routes
app.get('/', (req, res) => {
  res.send('🛒 Mock E-Commerce Backend is Running!');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/cart', (req, res) => {
  const cartWithDetails = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      name: product.name,
      price: product.price,
      image: product.image,
      itemTotal: item.quantity * product.price
    };
  });
  
  const total = cartWithDetails.reduce((sum, item) => sum + item.itemTotal, 0);
  res.json({ items: cartWithDetails, total: parseFloat(total.toFixed(2)) });
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ 
      id: Date.now().toString(), 
      productId, 
      quantity 
    });
  }
  
  res.json({ message: 'Item added to cart' });
});

app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  
  const initialLength = cart.length;
  cart = cart.filter(item => item.id !== id);
  
  if (cart.length === initialLength) {
    return res.status(404).json({ error: 'Cart item not found' });
  }
  
  res.json({ message: 'Item removed from cart' });
});

app.post('/api/checkout', (req, res) => {
  const { customerInfo } = req.body;
  
  if (cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const cartWithDetails = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      name: product.name,
      price: product.price,
      image: product.image,
      itemTotal: item.quantity * product.price
    };
  });

  const total = cartWithDetails.reduce((sum, item) => sum + item.itemTotal, 0);
  
  const receipt = {
    orderId: 'ORD-' + Date.now(),
    timestamp: new Date().toISOString(),
    customerInfo,
    items: cartWithDetails,
    total: parseFloat(total.toFixed(2)),
    status: 'completed'
  };

  // Clear cart after successful checkout
  cart = [];
  
  res.json(receipt);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log('✅ =================================');
  console.log('✅ BACKEND SERVER STARTED SUCCESSFULLY!');
  console.log('✅ =================================');
  console.log('📍 Server URL: http://localhost:' + PORT);
  console.log('🔗 API Endpoints:');
  console.log('   • GET  /api/products');
  console.log('   • GET  /api/cart');
  console.log('   • POST /api/cart');
  console.log('   • DELETE /api/cart/:id');
  console.log('   • POST /api/checkout');
  console.log('   • GET  /api/health');
  console.log('✅ =================================');
});

// Handle errors
app.on('error', (error) => {
  console.log('❌ Server error:', error);
});