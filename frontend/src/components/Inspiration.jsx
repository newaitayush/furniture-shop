import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Inspiration = () => {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-6 lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl lg:text-5xl font-bold text-dark leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              50+ Beautiful rooms inspiration
            </motion.h2>
            <motion.p 
              className="text-light text-base lg:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Our designer already made a lot of beautiful prototype of rooms that inspire you
            </motion.p>
            <motion.button 
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(184, 142, 47, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore More
            </motion.button>
          </motion.div>

          {/* Images Section */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-3 gap-4">
              {/* Main large image */}
              <motion.div 
                className="col-span-2 relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Beautiful room inspiration"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Inner Peace Badge */}
                <motion.div 
                  className="absolute bottom-6 left-6 bg-white bg-opacity-90 p-4 rounded-lg max-w-xs"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="text-light text-sm mb-1">01 — Bed Room</div>
                  <h3 className="text-dark font-semibold text-lg mb-2">Inner Peace</h3>
                </motion.div>

                {/* Navigation Arrow */}
                <motion.button 
                  className="absolute bottom-6 right-6 bg-primary hover:bg-primary-dark text-white p-3 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  <ChevronRight size={20} />
                </motion.button>
              </motion.div>

              {/* Side images */}
              <div className="space-y-4">
                {[
                  'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                  'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                ].map((src, index) => (
                  <motion.div 
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={src}
                      alt={`Room inspiration ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pagination dots */}
            <motion.div 
              className="flex justify-center space-x-2 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {[0, 1, 2, 3].map((_, index) => (
                <motion.div 
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary' : 'bg-gray-300'}`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Inspiration;