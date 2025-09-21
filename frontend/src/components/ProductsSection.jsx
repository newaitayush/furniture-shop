import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';

const ProductsSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { isAdmin } = useAuth();

  const products = [
    {
      id: 1,
      _id: '1',
      name: 'Syltherine',
      description: 'Stylish cafe chair',
      price: 2500000,
      originalPrice: 3500000,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isNew: false,
      stock: 10,
      brand: 'Modern'
    },
    {
      id: 2,
      _id: '2',
      name: 'Leviosa',
      description: 'Stylish cafe chair',
      price: 2500000,
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isNew: false,
      stock: 5,
      brand: 'Classic'
    },
    {
      id: 3,
      _id: '3',
      name: 'Lolito',
      description: 'Luxury big sofa',
      price: 7000000,
      originalPrice: 14000000,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isNew: false,
      stock: 3,
      brand: 'Luxury'
    },
    {
      id: 4,
      _id: '4',
      name: 'Respira',
      description: 'Outdoor bar table and stool',
      price: 500000,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isNew: true,
      stock: 8,
      brand: 'Outdoor'
    },
    {
      id: 5,
      _id: '5',
      name: 'Grifo',
      description: 'Night lamp',
      price: 1500000,
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isNew: false,
      stock: 15,
      brand: 'Lighting'
    },
    {
      id: 6,
      _id: '6',
      name: 'Muggo',
      description: 'Small mug',
      price: 150000,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isNew: true,
      stock: 25,
      brand: 'Kitchen'
    },
    {
      id: 7,
      _id: '7',
      name: 'Pingky',
      description: 'Cute bed set',
      price: 7000000,
      originalPrice: 14000000,
      discount: 50,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isNew: false,
      stock: 4,
      brand: 'Bedroom'
    },
    {
      id: 8,
      _id: '8',
      name: 'Potty',
      description: 'Minimalist flower pot',
      price: 500000,
      image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isNew: true,
      stock: 12,
      brand: 'Decor'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    console.log(`${product.name} added to cart`);
  };

  const handleShare = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  };

  const handleCompare = (product) => {
    console.log('Compare:', product.name);
  };

  const handleLike = (product) => {
    console.log('Like clicked for:', product.name);
    toggleWishlist(product);
  };

  const handleEdit = (product) => {
    console.log('Edit product:', product.name);
  };

  const handleDelete = (product) => {
    console.log('Delete product:', product.name);
  };

  const handleShowMore = () => {
    navigate('/shop');
  };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-dark mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Products
          </motion.h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <ProductCard 
                product={product}
                onAddToCart={handleAddToCart}
                onShare={handleShare}
                onCompare={handleCompare}
                onLike={handleLike}
                isInCompareList={false}
                isInWishlist={wishlist.some(item => item._id === product._id)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.button 
            onClick={handleShowMore}
            className="border-2 border-primary text-primary font-semibold py-3 px-16 hover:bg-primary hover:text-white transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(184, 142, 47, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Show More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;