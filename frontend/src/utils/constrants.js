// Color constants
export const COLORS = {
  primary: '#B88E2F',
  primaryDark: '#9A7B2A',
  secondary: '#F9F1E7',
  accent: '#E97171',
  success: '#2EC1AC',
  dark: '#3A3A3A',
  light: '#898989',
  background: '#F4F5F7',
  white: '#FFFFFF'
};

// Navigation items
export const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

// Product categories
export const CATEGORIES = [
  {
    id: 1,
    name: 'Dining',
    image: '/images/dining.jpg'
  },
  {
    id: 2,
    name: 'Living',
    image: '/images/living.jpg'
  },
  {
    id: 3,
    name: 'Bedroom',
    image: '/images/bedroom.jpg'
  }
];

// Sample products data
export const PRODUCTS = [
  {
    id: 1,
    name: 'Syltherine',
    description: 'Stylish cafe chair',
    price: 2500000,
    originalPrice: 3500000,
    discount: 30,
    image: '/images/product1.jpg',
    isNew: false,
    tag: 'sale'
  },
  {
    id: 2,
    name: 'Leviosa',
    description: 'Stylish cafe chair',
    price: 2500000,
    image: '/images/product2.jpg',
    isNew: false
  },
  {
    id: 3,
    name: 'Lolito',
    description: 'Luxury big sofa',
    price: 7000000,
    originalPrice: 14000000,
    discount: 50,
    image: '/images/product3.jpg',
    isNew: false,
    tag: 'sale'
  },
  {
    id: 4,
    name: 'Respira',
    description: 'Outdoor bar table and stool',
    price: 500000,
    image: '/images/product4.jpg',
    isNew: true,
    tag: 'new'
  },
  {
    id: 5,
    name: 'Grifo',
    description: 'Night lamp',
    price: 1500000,
    image: '/images/product5.jpg',
    isNew: false
  },
  {
    id: 6,
    name: 'Muggo',
    description: 'Small mug',
    price: 150000,
    image: '/images/product6.jpg',
    isNew: true,
    tag: 'new'
  },
  {
    id: 7,
    name: 'Pingky',
    description: 'Cute bed set',
    price: 7000000,
    originalPrice: 14000000,
    discount: 50,
    image: '/images/product7.jpg',
    isNew: false,
    tag: 'sale'
  },
  {
    id: 8,
    name: 'Potty',
    description: 'Minimalist flower pot',
    price: 500000,
    image: '/images/product8.jpg',
    isNew: true,
    tag: 'new'
  }
];

// Social media images
export const SOCIAL_IMAGES = [
  '/images/social1.jpg',
  '/images/social2.jpg',
  '/images/social3.jpg',
  '/images/social4.jpg',
  '/images/social5.jpg',
  '/images/social6.jpg',
  '/images/social7.jpg',
  '/images/social8.jpg',
  '/images/social9.jpg'
];

// Footer links
export const FOOTER_LINKS = {
  company: [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ],
  help: [
    { name: 'Payment Options', href: '/payment' },
    { name: 'Returns', href: '/returns' },
    { name: 'Privacy Policies', href: '/privacy' }
  ]
};