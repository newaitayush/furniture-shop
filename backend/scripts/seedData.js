// scripts/seedData.js
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const sampleProducts = [
  {
    name: 'Syltherine',
    description: 'Stylish cafe chair',
    price: 2500000000,
    originalPrice: 3500000000,
    image: '/images/product1.jpg',
    category: 'Chair',
    brand: 'Modern Living',
    discount: '-30%',
    isNew: false
  },
  {
    name: 'Leviosa',
    description: 'Stylish cafe chair', 
    price: 2500000000,
    image: '/images/product2.jpg',
    category: 'Chair',
    brand: 'Classic Wood',
    isNew: false
  },
  {
    name: 'Lolito',
    description: 'Luxury big sofa',
    price: 7000000000,
    originalPrice: 14000000000,
    image: '/images/product3.jpg',
    category: 'Sofa',
    brand: 'Luxury Home',
    discount: '-50%',
    isNew: false
  },
  {
    name: 'Respira',
    description: 'Outdoor bar table and stool',
    price: 500000000,
    image: '/images/product4.jpg',
    category: 'Table',
    brand: 'Outdoor Plus',
    isNew: true
  }
];

const adminUsers = [
  {
    name: 'Admin User',
    email: 'admin@furniro.com',
    password: 'admin123',
    role: 'admin'
  }
];

const furnitureNames = [
  'Syltherine', 'Leviosa', 'Lolito', 'Respira', 'Grifo', 'Muggo', 
  'Pingky', 'Potty', 'Milano', 'Bamboo', 'Velvet', 'Garden', 
  'Moderno', 'Classic', 'Elegance', 'Patio', 'Urban', 'Rustic', 
  'Premier', 'Terrace'
];

const descriptions = [
  'Stylish cafe chair', 'Luxury big sofa', 'Outdoor bar table and stool',
  'Night lamp with elegant design', 'Cute bed set for bedroom',
  'Minimalist flower pot', 'Luxury dining chair', 'Eco-friendly office desk',
  'Premium velvet armchair', 'Outdoor dining set'
];

const seedDatabase = async () => {
  try {
    await mongoose.connect('your-mongodb-connection-string');
    
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    
    // Seed products
    await Product.insertMany(sampleProducts);
    
    // Seed admin users
    for (const user of adminUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      const newUser = new User({
        ...user,
        password: hashedPassword
      });
      await newUser.save();
    }
    
    console.log('Database seeded successfully');
    console.log('Admin credentials: admin@furniro.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};
seedDatabase();