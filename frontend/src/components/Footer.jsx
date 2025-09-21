import React from 'react';
import { motion } from 'framer-motion';
import Logo from './logo';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <Logo className="w-10 h-10 text-primary" />
                <span className="text-2xl font-bold text-dark">Funiro</span>
              </div>
              <address className="text-light text-sm leading-relaxed not-italic">
                400 University Drive Suite 200 Coral<br />
                Gables,<br />
                FL 33134 USA
              </address>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-light font-medium mb-6 text-base">Links</h3>
              <ul className="space-y-4">
                {['Home', 'Shop', 'About', 'Contact'].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  >
                    <motion.a
                      href="#"
                      className="text-dark hover:text-primary font-medium transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className="text-light font-medium mb-6 text-base">Help</h3>
              <ul className="space-y-4">
                {['Payment Options', 'Returns', 'Privacy Policies'].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <motion.a
                      href="#"
                      className="text-dark hover:text-primary font-medium transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h3 className="text-light font-medium mb-6 text-base">Newsletter</h3>
              <motion.div
                className="flex"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="flex-1 border-b border-dark text-sm py-2 pr-4 focus:outline-none focus:border-primary transition-colors"
                />
                <motion.button
                  className="border-b border-dark text-dark hover:text-primary font-medium text-sm py-2 transition-colors uppercase"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="border-t border-gray-200 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <p className="text-dark text-sm">2023 furino. All rights reserved</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
