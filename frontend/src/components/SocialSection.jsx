import React from 'react';
import { motion } from 'framer-motion';

const SocialSection = () => {
  const socialImages = [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  ];

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-light text-base lg:text-lg mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Share your setup with
          </motion.p>
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            #FuniroFurniture
          </motion.h2>
        </motion.div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {socialImages.map((image, index) => (
            <motion.div 
              key={index}
              className={`
                overflow-hidden rounded-lg cursor-pointer
                ${index === 0 ? 'aspect-[3/4]' : ''}
                ${index === 1 ? 'aspect-square' : ''}
                ${index === 2 ? 'aspect-[4/5]' : ''}
                ${index === 3 ? 'aspect-[3/4]' : ''}
                ${index === 4 ? 'aspect-square' : ''}
                ${index === 5 ? 'aspect-[4/3]' : ''}
                ${index === 6 ? 'aspect-square' : ''}
                ${index === 7 ? 'aspect-[3/4]' : ''}
                ${index === 8 ? 'aspect-[4/5]' : ''}
                ${index > 8 ? 'aspect-square' : ''}
              `}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: Math.random() * 6 - 3,
                zIndex: 10
              }}
            >
              <img
                src={image}
                alt={`Furniture setup ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;