const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to optimize image URLs for consistent sizing
const optimizeImageUrl = (url, width = 500, height = 500) => {
  if (!url) return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
  
  // For Google Shopping images, we can't resize directly, but we can ensure consistent display via CSS
  return url;
};

// Mock data with optimized product information
const products = [
  { 
    id: '1', 
    name: 'Wireless Headphones', 
    price: 99.99, 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', 
    description: 'High-quality wireless headphones with noise cancellation',
    brand: 'AudioMax',
    category: 'Electronics',
    inStock: true,
    stockQuantity: 50,
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Comfortable over-ear design'
    ],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Color': 'Black',
      'Warranty': '2 years'
    },
    reviews: [
      { user: 'John D.', rating: 5, comment: 'Amazing sound quality!', date: '2024-01-15' },
      { user: 'Sarah M.', rating: 4, comment: 'Very comfortable for long use', date: '2024-01-10' }
    ],
    rating: 4.5,
    reviewCount: 128
  },
  { 
    id: '2', 
    name: 'Smartphone', 
    price: 699.99, 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop', 
    description: 'Latest smartphone with advanced camera and performance',
    brand: 'TechPhone',
    category: 'Electronics',
    inStock: true,
    stockQuantity: 25,
    features: [
      '6.7-inch OLED Display',
      'Triple Camera System',
      '5G Connectivity',
      '128GB Storage',
      'Face Recognition'
    ],
    specifications: {
      'Screen Size': '6.7 inches',
      'Storage': '128GB',
      'RAM': '8GB',
      'Camera': '48MP + 12MP + 8MP',
      'Battery': '4500mAh'
    },
    reviews: [
      { user: 'Mike R.', rating: 5, comment: 'Best phone I ever had!', date: '2024-01-12' },
      { user: 'Lisa K.', rating: 4, comment: 'Great camera quality', date: '2024-01-08' }
    ],
    rating: 4.3,
    reviewCount: 89
  },
  { 
    id: '3', 
    name: 'Laptop', 
    price: 1299.99, 
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop', 
    description: 'Powerful gaming laptop with high-end graphics',
    brand: 'GamePro',
    category: 'Electronics',
    inStock: true,
    stockQuantity: 15,
    features: [
      'Intel i7 Processor',
      '16GB RAM',
      '1TB SSD',
      'NVIDIA RTX 4060',
      '15.6-inch 144Hz Display'
    ],
    specifications: {
      'Processor': 'Intel Core i7-13700H',
      'Graphics': 'NVIDIA RTX 4060 8GB',
      'RAM': '16GB DDR5',
      'Storage': '1TB NVMe SSD',
      'Display': '15.6" 144Hz IPS'
    },
    reviews: [
      { user: 'Alex T.', rating: 5, comment: 'Runs all games smoothly!', date: '2024-01-14' },
      { user: 'Emma L.', rating: 4, comment: 'Great for gaming and work', date: '2024-01-09' }
    ],
    rating: 4.7,
    reviewCount: 67
  },
  { 
    id: '4', 
    name: 'Smart Watch', 
    price: 249.99, 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', 
    description: 'Feature-rich smartwatch with health monitoring',
    brand: 'FitTech',
    category: 'Wearables',
    inStock: true,
    stockQuantity: 100,
    features: [
      'Heart Rate Monitor',
      'Sleep Tracking',
      'GPS',
      'Water Resistant',
      '7-day battery life'
    ],
    specifications: {
      'Display': '1.3-inch AMOLED',
      'Battery': '7 days',
      'Water Resistance': '5 ATM',
      'Connectivity': 'Bluetooth 5.2',
      'Compatibility': 'iOS & Android'
    },
    reviews: [
      { user: 'David P.', rating: 5, comment: 'Excellent fitness tracker!', date: '2024-01-11' },
      { user: 'Maria S.', rating: 4, comment: 'Comfortable and accurate', date: '2024-01-07' }
    ],
    rating: 4.2,
    reviewCount: 203
  },
  { 
    id: '5', 
    name: 'Tablet', 
    price: 449.99, 
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop', 
    description: '10-inch tablet perfect for work and entertainment',
    brand: 'TabPlus',
    category: 'Electronics',
    inStock: true,
    stockQuantity: 30,
    features: [
      '10-inch Retina Display',
      '64GB Storage',
      '8MP Camera',
      'All-day battery',
      'Stylus Support'
    ],
    specifications: {
      'Screen Size': '10.1 inches',
      'Storage': '64GB',
      'RAM': '4GB',
      'Camera': '8MP Rear, 5MP Front',
      'Battery': '7000mAh'
    },
    reviews: [
      { user: 'Tom B.', rating: 4, comment: 'Great for reading and videos', date: '2024-01-13' },
      { user: 'Sophia M.', rating: 5, comment: 'Perfect size for travel', date: '2024-01-06' }
    ],
    rating: 4.4,
    reviewCount: 156
  },
  { 
    id: '6', 
    name: 'Camera', 
    price: 799.99, 
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop', 
    description: 'Professional DSLR camera for photography enthusiasts',
    brand: 'PhotoPro',
    category: 'Electronics',
    inStock: true,
    stockQuantity: 20,
    features: [
      '24.2MP Full Frame Sensor',
      '4K Video Recording',
      '5-Axis Image Stabilization',
      'Wi-Fi & Bluetooth',
      'Weather-Sealed Body'
    ],
    specifications: {
      'Sensor': '24.2MP Full Frame',
      'Video': '4K at 30fps',
      'ISO Range': '100-51200',
      'Autofocus': '693-point phase detection',
      'Connectivity': 'Wi-Fi, Bluetooth'
    },
    reviews: [
      { user: 'Chris P.', rating: 5, comment: 'Professional quality images!', date: '2024-01-16' },
      { user: 'Jessica L.', rating: 4, comment: 'Great for both photos and videos', date: '2024-01-12' }
    ],
    rating: 4.6,
    reviewCount: 89
  },
  { 
    id: '7', 
    name: 'Gaming Console', 
    price: 499.99, 
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop', 
    description: 'Next-gen gaming console with 4K gaming support',
    brand: 'GameBox',
    category: 'Electronics',
    inStock: true,
    stockQuantity: 35,
    features: [
      '4K Gaming at 120fps',
      '1TB SSD Storage',
      'Ray Tracing Support',
      'Backward Compatibility',
      '8K Media Support'
    ],
    specifications: {
      'Storage': '1TB SSD',
      'Resolution': '4K at 120Hz',
      'Backward Compatibility': 'Yes',
      'Controller': 'Wireless with haptic feedback',
      'Media': '8K video playback'
    },
    reviews: [
      { user: 'Ryan K.', rating: 5, comment: 'Incredible graphics and performance!', date: '2024-01-14' },
      { user: 'Michelle T.', rating: 4, comment: 'Love the game library', date: '2024-01-10' }
    ],
    rating: 4.8,
    reviewCount: 234
  },
  { 
    id: '8', 
    name: 'Bluetooth Speaker', 
    price: 89.99, 
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop', 
    description: 'Portable Bluetooth speaker with crystal clear sound',
    brand: 'SoundWave',
    category: 'Electronics',
    inStock: true,
    stockQuantity: 75,
    features: [
      '360° Surround Sound',
      '24-hour Battery Life',
      'IPX7 Waterproof',
      'PartySync Technology',
      'Built-in Microphone'
    ],
    specifications: {
      'Battery': '24 hours',
      'Waterproof': 'IPX7',
      'Connectivity': 'Bluetooth 5.0',
      'Drivers': 'Dual 10W',
      'Weight': '0.9kg'
    },
    reviews: [
      { user: 'Kevin M.', rating: 5, comment: 'Amazing sound for its size!', date: '2024-01-13' },
      { user: 'Amanda R.', rating: 4, comment: 'Perfect for outdoor parties', date: '2024-01-09' }
    ],
    rating: 4.3,
    reviewCount: 167
  }
];

let cart = [];

// Routes
app.get('/', (req, res) => {
  res.send('🛒 Mock E-Commerce Backend is Running!');
});

// GET all products
app.get('/api/products', (req, res) => {
  console.log('GET /api/products - Returning all products');
  res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  console.log(`GET /api/products/${productId} - Looking for product`);
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    console.log(`Product ${productId} not found`);
    return res.status(404).json({ error: 'Product not found' });
  }
  
  console.log(`Found product: ${product.name}`);
  res.json(product);
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

// New endpoint to update cart item quantity
app.put('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  
  const cartItem = cart.find(item => item.id === id);
  if (!cartItem) {
    return res.status(404).json({ error: 'Cart item not found' });
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    cart = cart.filter(item => item.id !== id);
    return res.json({ message: 'Item removed from cart' });
  }
  
  cartItem.quantity = quantity;
  res.json({ message: 'Cart updated successfully' });
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

// Clear entire cart
app.delete('/api/cart', (req, res) => {
  const initialLength = cart.length;
  cart = [];
  res.json({ 
    message: 'Cart cleared successfully',
    itemsRemoved: initialLength
  });
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
    status: 'completed',
    shipping: {
      method: 'Standard Shipping',
      cost: total > 50 ? 0 : 4.99,
      estimatedDelivery: '3-5 business days'
    }
  };

  // Clear cart after successful checkout
  cart = [];
  
  res.json(receipt);
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running!',
    products: products.length,
    cartItems: cart.length
  });
});

// Start server
app.listen(PORT, () => {
  console.log('✅ =================================');
  console.log('✅ BACKEND SERVER STARTED SUCCESSFULLY!');
  console.log('✅ =================================');
  console.log('📍 Server URL: http://localhost:' + PORT);
  console.log('🔗 API Endpoints:');
  console.log('   • GET  /api/products');
  console.log('   • GET  /api/products/:id');
  console.log('   • GET  /api/cart');
  console.log('   • POST /api/cart');
  console.log('   • PUT  /api/cart/:id');
  console.log('   • DELETE /api/cart/:id');
  console.log('   • DELETE /api/cart (clear all)');
  console.log('   • POST /api/checkout');
  console.log('   • GET  /api/health');
  console.log('✅ =================================');
  console.log('📸 Using optimized product images from Unsplash');
  console.log('✅ =================================');
});

// Handle errors
app.on('error', (error) => {
  console.log('❌ Server error:', error);
});