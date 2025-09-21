import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Sri Lanka',
    streetAddress: '',
    city: '',
    province: 'Western Province',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
    paymentMethod: 'bank-transfer'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('en-IN')}.00`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the order to your backend
      console.log('Order Data:', {
        customer: formData,
        items: cartItems,
        total: getCartTotal()
      });

      // Clear cart and redirect to success page
      clearCart();
      alert('Order placed successfully!');
      navigate('/');
      
    } catch (error) {
      console.error('Order processing error:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">No items to checkout</h2>
          <p className="text-gray-600 mb-8">Add some products to your cart first</p>
          <Link 
            to="/shop"
            className="bg-yellow-600 text-white px-8 py-3 rounded hover:bg-yellow-700 transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
          <h1 className="text-5xl font-medium mb-2 text-black">Checkout</h1>
          <nav className="flex items-center space-x-2 text-base font-medium">
            <Link to="/" className="text-black hover:text-yellow-600">Home</Link>
            <ChevronRight className="w-5 h-5 text-black" />
            <span className="text-black">Checkout</span>
          </nav>
        </div>
      </section>

      {/* Checkout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Billing Details */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Billing details</h2>
            
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white pr-10"
                  >
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Pakistan">Pakistan</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Street address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              {/* Town / City */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              {/* Province */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Province <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 appearance-none bg-white pr-10"
                  >
                    <option value="Western Province">Western Province</option>
                    <option value="Central Province">Central Province</option>
                    <option value="Eastern Province">Eastern Province</option>
                    <option value="Northern Province">Northern Province</option>
                    <option value="Southern Province">Southern Province</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-4 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* ZIP Code */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  ZIP code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              {/* Additional Information */}
              <div>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Additional information"
                  rows="4"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              
              {/* Product Summary */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-lg font-semibold">Product</span>
                  <span className="text-lg font-semibold">Subtotal</span>
                </div>

                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="text-black">×</span>
                      <span className="text-black">{item.quantity}</span>
                    </div>
                    <span className="text-black">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-black">Subtotal</span>
                  <span className="text-black">{formatPrice(getCartTotal())}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-lg font-semibold text-black">Total</span>
                  <span className="text-xl font-bold text-yellow-600">{formatPrice(getCartTotal())}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id="bank-transfer"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={formData.paymentMethod === 'bank-transfer'}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                  />
                  <div>
                    <label htmlFor="bank-transfer" className="text-black font-medium cursor-pointer">
                      Direct Bank Transfer
                    </label>
                    <p className="text-gray-500 text-sm mt-1">
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="bank-transfer-2"
                    name="paymentMethod"
                    value="bank-transfer-2"
                    checked={formData.paymentMethod === 'bank-transfer-2'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                  />
                  <label htmlFor="bank-transfer-2" className="text-gray-500 cursor-pointer">
                    Direct Bank Transfer
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="cash-delivery"
                    name="paymentMethod"
                    value="cash-delivery"
                    checked={formData.paymentMethod === 'cash-delivery'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
                  />
                  <label htmlFor="cash-delivery" className="text-gray-500 cursor-pointer">
                    Cash On Delivery
                  </label>
                </div>
              </div>

              {/* Privacy Policy */}
              <p className="text-sm text-gray-600 mb-6">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}
                <Link to="/privacy-policy" className="text-black font-medium underline">
                  privacy policy
                </Link>.
              </p>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-white border border-gray-300 text-black py-3 px-6 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Place order'}
              </button>
            </div>
          </div>
        </form>
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

export default Checkout;