import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SideCart from './SideCart';
import AccountButton from './AccountButton';

const Navbar = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get wishlist from useProductActions hook
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist?.length || 0;

  // Hide search input on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchInput = document.getElementById('searchInput');
      const searchButton = event.target.closest('button[title="Search"]');
      
      if (searchInput && !searchInput.contains(event.target) && !searchButton) {
        searchInput.classList.add('hidden');
        searchInput.classList.remove('animate-slideIn');
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      // Hide search input after search
      const searchInput = document.getElementById('searchInput');
      searchInput.classList.add('hidden');
      searchInput.classList.remove('animate-slideIn');
    }
  };

  const cartCount = getCartCount();

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo with hover effect */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-105"
            >
              <img 
                src="/images/logo.png" 
                alt="Furniro" 
                className="h-16 w-auto transition-opacity duration-200 group-hover:opacity-90"
                onError={(e) => {
                  console.error('Logo failed to load from /images/logo.png');
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 bg-yellow-600 rounded items-center justify-center hidden group-hover:bg-yellow-700 transition-colors duration-200">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200">
                Furniro
              </span>
            </Link>

            {/* Navigation Links with enhanced hover effects */}
            <div className="hidden md:flex space-x-2">
              <Link 
                to="/" 
                className="relative px-4 py-2 text-base font-medium text-gray-700 rounded-lg transition-all duration-300 hover:text-yellow-600 hover:bg-yellow-50 group"
              >
                Home
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-8 group-hover:left-1/2 transform -translate-x-1/2"></span>
              </Link>
              <Link 
                to="/shop" 
                className="relative px-4 py-2 text-base font-medium text-gray-700 rounded-lg transition-all duration-300 hover:text-yellow-600 hover:bg-yellow-50 group"
              >
                Shop
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-8 group-hover:left-1/2 transform -translate-x-1/2"></span>
              </Link>
              <Link 
                to="/about" 
                className="relative px-4 py-2 text-base font-medium text-gray-700 rounded-lg transition-all duration-300 hover:text-yellow-600 hover:bg-yellow-50 group"
              >
                About
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-8 group-hover:left-1/2 transform -translate-x-1/2"></span>
              </Link>
              <Link 
                to="/contact" 
                className="relative px-4 py-2 text-base font-medium text-gray-700 rounded-lg transition-all duration-300 hover:text-yellow-600 hover:bg-yellow-50 group"
              >
                Contact
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-8 group-hover:left-1/2 transform -translate-x-1/2"></span>
              </Link>
            </div>

            {/* Right Side Icons with enhanced animations */}
            <div className="flex items-center space-x-3">
              
              {/* Search with slide-out animation */}
              <div className="relative hidden sm:block">
                {/* Search Icon Button */}
                <button
                  onClick={() => {
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput.classList.contains('hidden')) {
                      searchInput.classList.remove('hidden');
                      searchInput.classList.add('animate-slideIn');
                      setTimeout(() => searchInput.querySelector('input').focus(), 100);
                    } else {
                      searchInput.classList.add('hidden');
                      searchInput.classList.remove('animate-slideIn');
                      setSearchQuery('');
                    }
                  }}
                  className="p-3 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300 transform hover:scale-110 group"
                  title="Search"
                >
                  <Search className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  <div className="absolute inset-0 rounded-lg bg-yellow-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>

                {/* Search Input - Hidden by default, positioned properly */}
                <div 
                  id="searchInput" 
                  className="absolute right-0 top-full mt-2 hidden z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <form onSubmit={handleSearch}>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 placeholder-gray-400 shadow-lg"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                      >
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* User Account with enhanced styling */}
              <div className="relative">
                <AccountButton />
              </div>

              {/* Wishlist with hover animation and count */}
              <Link
                to="/wishlist"
                className="p-3 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300 transform hover:scale-110 relative group"
                title={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount})` : ''}`}
              >
                <Heart className={`h-6 w-6 transition-all duration-200 group-hover:scale-110 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse shadow-lg">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
                <div className="absolute inset-0 rounded-lg bg-yellow-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>

              {/* Shopping Cart with bounce animation */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-3 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300 transform hover:scale-110 relative group"
                title="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse shadow-lg">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
                <div className="absolute inset-0 rounded-lg bg-yellow-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Mobile Search with enhanced styling */}
          <div className="sm:hidden pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 placeholder-gray-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors duration-200" />
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Menu with slide animations */}
        <div className="md:hidden border-t border-gray-100 bg-gray-50">
          <div className="flex justify-around py-3">
            <Link 
              to="/" 
              className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-all duration-300 hover:bg-white rounded-md group"
            >
              Home
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-6 transform -translate-x-1/2"></span>
            </Link>
            <Link 
              to="/shop" 
              className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-all duration-300 hover:bg-white rounded-md group"
            >
              Shop
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-6 transform -translate-x-1/2"></span>
            </Link>
            <Link 
              to="/about" 
              className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-all duration-300 hover:bg-white rounded-md group"
            >
              About
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-6 transform -translate-x-1/2"></span>
            </Link>
            <Link 
              to="/contact" 
              className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-all duration-300 hover:bg-white rounded-md group"
            >
              Contact
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-6 transform -translate-x-1/2"></span>
            </Link>

            {/* Mobile Wishlist Link */}
            <Link 
              to="/wishlist" 
              className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-all duration-300 hover:bg-white rounded-md group flex items-center space-x-1"
            >
              <Heart className={`h-4 w-4 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-6 transform -translate-x-1/2"></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Side Cart Component */}
      <SideCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default Navbar;