import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';


const ShoppingCart = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart } = useCart();
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('id-ID')}.00`;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={closeCart}
      ></div>

      {/* Shopping Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-black">Shopping Cart</h2>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item._id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center gap-4 bg-orange-50 rounded-lg p-4">
                {/* Product Image */}
                <div className="w-16 h-16 bg-yellow-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64x64/f3f3f3/999999?text=' + item.name.charAt(0);
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-black text-sm truncate">{item.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600">
                      {item.quantity} x <span className="text-yellow-600 font-medium">{formatPrice(item.price)}</span>
                    </span>
                  </div>
                  {/* Size and Color */}
                  {(item.selectedSize || item.selectedColor) && (
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedSize && item.selectedColor && <span>•</span>}
                      {item.selectedColor && (
                        <div className="flex items-center gap-1">
                          <span>Color:</span>
                          <div 
                            className={`w-3 h-3 rounded-full border border-gray-300 ${
                              item.selectedColor === 'purple' ? 'bg-purple-600' :
                              item.selectedColor === 'black' ? 'bg-black' :
                              item.selectedColor === 'gold' ? 'bg-yellow-600' : 'bg-gray-400'
                            }`}
                          ></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item._id, item.selectedSize, item.selectedColor)}
                  className="p-2 hover:bg-yellow-100 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-yellow-600" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-black">Subtotal</span>
              <span className="text-base font-semibold text-yellow-600">
                {formatPrice(calculateSubtotal())}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button className="bg-white border border-black text-black text-sm py-2 px-3 rounded-full hover:bg-black hover:text-white transition-colors font-medium">
                Cart
              </button>
              <button className="bg-white border border-black text-black text-sm py-2 px-3 rounded-full hover:bg-black hover:text-white transition-colors font-medium">
                Checkout
              </button>
              <button className="bg-white border border-black text-black text-sm py-2 px-3 rounded-full hover:bg-black hover:text-white transition-colors font-medium">
                Comparison
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;