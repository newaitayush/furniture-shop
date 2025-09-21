import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SideCart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartCount,
    clearCart 
  } = useCart();

  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    // Get compare list from localStorage
    const savedCompareList = localStorage.getItem('compareList');
    if (savedCompareList) {
      setCompareList(JSON.parse(savedCompareList));
    }
  }, []);

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

  const handleCartClick = () => {
    navigate('/cart');
    onClose();
  };

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
    onClose();
  };

  const handleComparisonClick = () => {
    if (compareList.length === 0) {
      alert('No products to compare. Add products from shop first.');
      return;
    }
    navigate('/comparison', { state: { products: compareList } });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Side Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                <button 
                  onClick={() => {
                    navigate('/shop');
                    onClose();
                  }}
                  className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="flex items-start space-x-3 py-3">
                    
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/64x64/f3f3f3/999999?text=${encodeURIComponent(item.name)}`;
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
                        {item.name}
                      </h3>
                      
                      {/* Quantity Controls Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item._id || item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-50"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="text-sm font-medium px-2">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item._id || item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm font-semibold text-yellow-600">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      {(item.selectedSize || item.selectedColor) && (
                        <div className="flex space-x-2 mt-1 text-xs text-gray-500">
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

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item._id || item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary & Actions */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4">
              
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-normal">Subtotal</span>
                <span className="text-lg font-semibold text-yellow-600">{formatPrice(getCartTotal())}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-4">
                <div className="flex space-x-2">
                  
                  {/* Cart Button */}
                  <button
                    onClick={handleCartClick}
                    className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cart
                  </button>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckoutClick}
                    className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Checkout
                  </button>

                  {/* Comparison Button */}
                  <button
                    onClick={handleComparisonClick}
                    className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Comparison
                  </button>
                </div>
              </div>

              {/* Clear Cart Link */}
              <div className="text-center">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your cart?')) {
                      clearCart();
                    }
                  }}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors underline"
                >
                  Clear Cart
                </button>
              </div>

              {/* Item Count */}
              <div className="text-center text-sm text-gray-500 mt-2">
                {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in cart
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideCart;