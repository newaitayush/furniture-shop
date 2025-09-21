import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useCart();

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('en-IN')}.00`;
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/shop-bar.jpg")'
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img src="/images/logo.png" alt="Furniro" className="w-20 h-8 mb-4" />
          <h1 className="text-5xl font-medium mb-2 text-black">Cart</h1>
          <nav className="flex items-center space-x-2 text-base font-medium">
            <Link to="/" className="text-black hover:text-yellow-600">Home</Link>
            <ChevronRight className="w-5 h-5 text-black" />
            <span className="text-black">Cart</span>
          </nav>
        </div>
      </section>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started</p>
            <Link 
              to="/shop"
              className="bg-yellow-600 text-white px-8 py-3 rounded hover:bg-yellow-700 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items Table */}
            <div className="lg:col-span-2">
              <div className="bg-orange-50 rounded-lg overflow-hidden">
                
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 p-4 bg-orange-100 font-medium text-gray-900">
                  <div className="col-span-2">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-center">Subtotal</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-orange-200">
                  {cartItems.map((item) => (
                    <div key={item._id || item.id} className="grid grid-cols-5 gap-4 p-4 items-center">
                      
                      {/* Product Info */}
                      <div className="col-span-2 flex items-center space-x-4">
                        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/80x80/f3f3f3/999999?text=${encodeURIComponent(item.name)}`;
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                          {(item.selectedSize || item.selectedColor) && (
                            <div className="flex space-x-2 mt-1 text-sm text-gray-600">
                              {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                              {item.selectedColor && (
                                <div className="flex items-center space-x-1">
                                  <span>Color:</span>
                                  <div 
                                    className="w-3 h-3 rounded-full border border-gray-300"
                                    style={{ 
                                      backgroundColor: item.selectedColor === 'purple' ? '#8B5CF6' : 
                                                     item.selectedColor === 'black' ? '#000000' : 
                                                     item.selectedColor === 'gold' ? '#F59E0B' : item.selectedColor 
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-center text-gray-600">
                        {formatPrice(item.price)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => handleQuantityChange(item._id || item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value) || 1;
                                handleQuantityChange(item._id || item.id, newQuantity);
                              }}
                              className="w-12 px-2 py-1 text-center border-0 focus:ring-0"
                              min="1"
                            />
                            <button
                              onClick={() => handleQuantityChange(item._id || item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Subtotal and Remove */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item._id || item.id)}
                            className="p-1 text-yellow-600 hover:text-yellow-700 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Totals */}
            <div className="lg:col-span-1">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Cart Totals</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="text-gray-600">{formatPrice(getCartTotal())}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-xl font-semibold text-yellow-600">
                        {formatPrice(getCartTotal())}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-8 bg-white border border-gray-300 text-gray-900 py-3 px-6 rounded hover:bg-gray-50 transition-colors font-medium"
                >
                  Check Out
                </button>
              </div>

              {/* Additional Actions */}
              <div className="mt-6 space-y-3">
                <Link
                  to="/shop"
                  className="block w-full bg-yellow-600 text-white py-3 px-6 rounded hover:bg-yellow-700 transition-colors text-center font-medium"
                >
                  Continue Shopping
                </Link>
                
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your cart?')) {
                      clearCart();
                    }
                  }}
                  className="w-full bg-red-500 text-white py-3 px-6 rounded hover:bg-red-600 transition-colors font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5ZM42.5 25L27.5 40L17.5 30" stroke="#B88E2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-800 mb-2">High Quality</h3>
                <p className="text-gray-500 text-xl">crafted from top materials</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5ZM42.5 25L27.5 40L17.5 30" stroke="#B88E2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-800 mb-2">Warranty Protection</h3>
                <p className="text-gray-500 text-xl">Over 2 years</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M7.5 15H12.5L15 25H45L50 15H55M15 25L12.5 35H47.5L45 25M15 25V35M45 25V35" stroke="#B88E2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-800 mb-2">Free Shipping</h3>
                <p className="text-gray-500 text-xl">Order over 150 $</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M30 7.5C17.574 7.5 7.5 17.574 7.5 30C7.5 42.426 17.574 52.5 30 52.5C42.426 52.5 52.5 42.426 52.5 30C52.5 17.574 42.426 7.5 30 7.5ZM30 17.5C31.3807 17.5 32.5 18.6193 32.5 20C32.5 21.3807 31.3807 22.5 30 22.5C28.6193 22.5 27.5 21.3807 27.5 20C27.5 18.6193 28.6193 17.5 30 17.5ZM32.5 40H27.5V27.5H32.5V40Z" fill="#B88E2F"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-800 mb-2">24 / 7 Support</h3>
                <p className="text-gray-500 text-xl">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;