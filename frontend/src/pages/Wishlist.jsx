// src/pages/Wishlist.jsx - Updated with WishlistContext
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, ShoppingCart, Share2, Trash2, Grid, List } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProductActions } from '../hooks/useProductActions';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [notification, setNotification] = useState('');

  // Get wishlist from WishlistContext
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();

  // Get other product actions (compare, share) from the hook
  const { handleShare, handleCompare, compareList } = useProductActions(navigate);

  // Notification system
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Handle add to cart from wishlist
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showNotification(`${product.name} added to cart`);
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (product) => {
    toggleWishlist(product);
    showNotification(`${product.name} removed from wishlist`);
  };

  // Handle like/unlike (toggle wishlist)
  const handleLike = (product) => {
    toggleWishlist(product);
    const isRemoving = wishlist.some(item => item._id === product._id);
    showNotification(isRemoving ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`);
  };

  // Clear entire wishlist
  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
      showNotification('Wishlist cleared');
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          {notification}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center" style={{backgroundImage: 'url("/images/shop-bar.jpg")'}}>
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img src="/images/logo.png" alt="Furniro" className="w-20 h-8 mb-4" />
          <h1 className="text-5xl font-medium mb-2 text-black">Wishlist</h1>
          <nav className="flex items-center space-x-2 text-base font-medium">
            <Link to="/" className="text-black hover:text-yellow-600">Home</Link>
            <ChevronRight className="w-5 h-5 text-black" />
            <span className="text-black">Wishlist</span>
          </nav>
        </div>
      </section>

      {/* Wishlist Header */}
      <div className="bg-orange-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Left Side */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
                <span className="text-xl font-medium">
                  {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} in Wishlist
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                {[
                  { mode: 'grid', icon: Grid },
                  { mode: 'list', icon: List }
                ].map(({ mode, icon: Icon }) => (
                  <button 
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded ${viewMode === mode ? 'bg-gray-200' : 'hover:bg-gray-100'} transition-colors`}
                  >
                    <Icon className="w-7 h-7" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side */}
            {wishlist.length > 0 && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleClearWishlist}
                  className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {wishlist.length === 0 ? (
          // Empty Wishlist State
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 text-center max-w-md mb-8">
              Save your favorite items to your wishlist and never lose track of what you love.
            </p>
            <Link
              to="/shop"
              className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          // Wishlist Items Grid
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 lg:grid-cols-2 gap-6'}`}>
            {wishlist.map((product) => (
              <div key={product._id} className="relative group">
                <Link to={`/product/${product._id}`} className="block">
                  <ProductCard 
                    product={product}
                    onAddToCart={handleAddToCart}
                    onShare={handleShare}
                    onCompare={handleCompare}
                    onLike={handleLike}
                    isInCompareList={!!compareList.find(item => item._id === product._id)}
                    isInWishlist={isInWishlist(product._id)}
                  />
                </Link>
                
                {/* Quick Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFromWishlist(product);
                  }}
                  className="absolute top-2 right-2 bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Wishlist Actions */}
        {wishlist.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex space-x-4">
              <Link
                to="/shop"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  // Add all wishlist items to cart
                  wishlist.forEach(product => addToCart(product, 1));
                  showNotification(`${wishlist.length} items added to cart`);
                }}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add All to Cart</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
            {[
              { title: 'Save Favorites', desc: 'Keep track of products you love' },
              { title: 'Easy Access', desc: 'Quick view of saved items' },
              { title: 'Share Lists', desc: 'Share your wishlist with others' },
              { title: 'Price Tracking', desc: 'Get notified of price changes' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-16 h-16 flex-shrink-0">
                  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5ZM42.5 25L27.5 40L17.5 30" stroke="#B88E2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-xl">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* CSS */}
      <style>{`
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Wishlist;