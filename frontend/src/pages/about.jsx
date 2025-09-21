import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center" style={{backgroundImage: 'url("/images/shop-bar.jpg")'}}>
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img src="/images/logo.png" alt="Furniro" className="w-20 h-8 mb-4" />
          <h1 className="text-5xl font-medium mb-2 text-black">About</h1>
          <nav className="flex items-center space-x-2 text-base font-medium">
            <Link to="/" className="text-black hover:text-yellow-600">Home</Link>
            <ChevronRight className="w-5 h-5 text-black" />
            <span className="text-black">About</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* About Us Section */}
            <div className="mb-12">
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Our Story" 
                className="w-full h-96 object-cover mb-6 rounded-lg"
              />
              <div className="mb-4 text-sm text-gray-600">
                <span className="mr-4">Admin</span>
                <span className="mr-4">14 Oct 2022</span>
                <span>Wood</span>
              </div>
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Story & Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Furniro was founded with a simple mission: to make beautiful, high-quality furniture accessible to everyone. 
                What started as a small workshop in 2015 has grown into a trusted name in home furnishing, but our core values remain unchanged. 
                We believe that every home deserves furniture that combines style, comfort, and durability.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our journey began when our founder, passionate about craftsmanship and design, noticed a gap in the market for 
                affordable yet elegant furniture. We started with handcrafted pieces, focusing on attention to detail and 
                sustainable materials. Today, we continue to honor that tradition while embracing modern design trends and technology.
              </p>
              <button className="text-gray-800 border-b border-gray-800 hover:text-yellow-600 hover:border-yellow-600 transition-colors pb-1">
                Read more
              </button>
            </div>

            {/* Our Values Section */}
            <div className="mb-12">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Our Values" 
                className="w-full h-96 object-cover mb-6 rounded-lg"
              />
              <div className="mb-4 text-sm text-gray-600">
                <span className="mr-4">Admin</span>
                <span className="mr-4">14 Oct 2022</span>
                <span>Handmade</span>
              </div>
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">Quality & Craftsmanship</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every piece of furniture we create is a testament to our commitment to quality. We work with skilled artisans 
                who bring decades of experience to every project. From selecting the finest materials to the final finishing touches, 
                we ensure that each item meets our rigorous standards.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our workshop combines traditional techniques with modern innovation. We use sustainable wood sources, 
                eco-friendly finishes, and time-tested joinery methods to create furniture that not only looks beautiful 
                but stands the test of time. When you choose Furniro, you're investing in pieces that will be cherished for generations.
              </p>
              <button className="text-gray-800 border-b border-gray-800 hover:text-yellow-600 hover:border-yellow-600 transition-colors pb-1">
                Read more
              </button>
            </div>

            {/* Sustainability Section */}
            <div className="mb-12">
              <img 
                src="https://media.istockphoto.com/id/1435661938/photo/children-holding-a-planet-outdoors.jpg?s=612x612&w=0&k=20&c=Q4tWy8FRhOrrv69KsB-qbM_ciXzm1aUYfjeExi--hC0=" 
                alt="Sustainability" 
                className="w-full h-96 object-cover mb-6 rounded-lg"
              />
              <div className="mb-4 text-sm text-gray-600">
                <span className="mr-4">Admin</span>
                <span className="mr-4">14 Oct 2022</span>
                <span>Green</span>
              </div>
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">Sustainable Future</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Environmental responsibility is at the heart of everything we do. We're committed to sustainable practices 
                that minimize our impact on the planet while creating beautiful furniture. Our wood is sourced from responsibly 
                managed forests, and we prioritize local suppliers to reduce transportation emissions.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe in creating furniture that lasts, reducing the need for frequent replacements. Our repair and 
                restoration services help extend the life of our pieces, and we offer a comprehensive recycling program 
                for items that have reached the end of their useful life. Together, we're building a more sustainable future, one piece at a time.
              </p>
              <button className="text-gray-800 border-b border-gray-800 hover:text-yellow-600 hover:border-yellow-600 transition-colors pb-1">
                Read more
              </button>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button className="w-10 h-10 bg-yellow-600 text-white rounded flex items-center justify-center font-medium">
                1
              </button>
              <button className="w-10 h-10 bg-orange-50 text-black rounded flex items-center justify-center font-medium hover:bg-yellow-600 hover:text-white transition-colors">
                2
              </button>
              <button className="w-10 h-10 bg-orange-50 text-black rounded flex items-center justify-center font-medium hover:bg-yellow-600 hover:text-white transition-colors">
                3
              </button>
              <button className="px-4 h-10 bg-orange-50 text-black rounded font-medium hover:bg-yellow-600 hover:text-white transition-colors">
                Next
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-2xl font-medium mb-6 text-gray-800">Categories</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Crafts</span>
                  <span className="text-gray-400">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Design</span>
                  <span className="text-gray-400">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Handmade</span>
                  <span className="text-gray-400">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Interior</span>
                  <span className="text-gray-400">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Wood</span>
                  <span className="text-gray-400">6</span>
                </div>
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <h3 className="text-2xl font-medium mb-6 text-gray-800">Recent Posts</h3>
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" 
                    alt="Recent post" 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Going all-in with millennial design</h4>
                    <p className="text-sm text-gray-500">03 Aug 2022</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" 
                    alt="Recent post" 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Exploring new ways of decorating</h4>
                    <p className="text-sm text-gray-500">03 Aug 2022</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" 
                    alt="Recent post" 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Handmade pieces that took time to make</h4>
                    <p className="text-sm text-gray-500">03 Aug 2022</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" 
                    alt="Recent post" 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Modern home in Milan</h4>
                    <p className="text-sm text-gray-500">03 Aug 2022</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80" 
                    alt="Recent post" 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Colorful office redesign</h4>
                    <p className="text-sm text-gray-500">03 Aug 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="30" cy="30" r="25" stroke="#B88E2F" strokeWidth="2" fill="none"/>
                  <path d="M30 15v10l7 7" stroke="#B88E2F" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-800 mb-1">High Quality</h3>
                <p className="text-gray-500 text-sm">crafted from top materials</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5ZM42.5 25L27.5 40L17.5 30" stroke="#B88E2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-800 mb-1">Warranty Protection</h3>
                <p className="text-gray-500 text-sm">Over 2 years</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M10 30h40M25 15l25 15-25 15" stroke="#B88E2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-800 mb-1">Free Shipping</h3>
                <p className="text-gray-500 text-sm">Order over 150 $</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="30" cy="30" r="20" stroke="#B88E2F" strokeWidth="2" fill="none"/>
                  <path d="M30 20v20" stroke="#B88E2F" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="30" cy="45" r="2" fill="#B88E2F"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-800 mb-1">24 / 7 Support</h3>
                <p className="text-gray-500 text-sm">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;