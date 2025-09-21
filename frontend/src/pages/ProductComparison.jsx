import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Plus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const ProductComparison = () => {
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get products from navigation state or use default empty array
  const [compareProducts, setCompareProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get products from location state (passed from Shop component)
    if (location.state && location.state.products) {
      setCompareProducts(location.state.products);
    } else {
      // If no products passed, you might want to redirect or show empty state
      setCompareProducts([]);
    }
    setLoading(false);
  }, [location.state]);

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}.00`;
  };

  const StarRating = ({ rating = 4.5, reviews = "0 Review" }) => (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">{reviews}</span>
    </div>
  );

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    // You might want to show a notification here
  };

  const handleChooseProduct = () => {
    navigate('/shop');
  };

  const removeProduct = (productId) => {
    setCompareProducts(compareProducts.filter(product => product._id !== productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading comparison...</div>
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
          <h1 className="text-5xl font-medium mb-2 text-black">Product Comparison</h1>
          <nav className="flex items-center space-x-2 text-base font-medium">
            <Link to="/" className="text-black hover:text-yellow-600">Home</Link>
            <ChevronRight className="w-5 h-5 text-black" />
            <Link to="/shop" className="text-black hover:text-yellow-600">Shop</Link>
            <ChevronRight className="w-5 h-5 text-black" />
            <span className="text-black">Comparison</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {compareProducts.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Products to Compare</h2>
            <p className="text-gray-600 mb-8">Add products from the shop to start comparing them.</p>
            <button
              onClick={handleChooseProduct}
              className="bg-yellow-600 text-white px-8 py-3 rounded font-semibold hover:bg-yellow-700 transition-colors"
            >
              Go to Shop
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-8">
            
            {/* Left Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-orange-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-black mb-2">
                  Go to Product page for more Products
                </h3>
                <Link 
                  to="/shop"
                  className="text-yellow-600 font-medium underline hover:text-yellow-700"
                >
                  View More
                </Link>
              </div>
              
              {/* Comparison summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-lg mb-4">Comparing {compareProducts.length} Products</h4>
                <div className="space-y-2">
                  {compareProducts.map((product) => (
                    <div key={product._id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{product.name}</span>
                      <button
                        onClick={() => removeProduct(product._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Comparison */}
            <div className="col-span-12 lg:col-span-9">
              {/* Products Display */}
              <div className={`grid gap-8 mb-12 ${
                compareProducts.length === 1 ? 'grid-cols-2' : 
                compareProducts.length === 2 ? 'grid-cols-3' : 'grid-cols-4'
              }`}>
                
                {/* Display actual products */}
                {compareProducts.map((product) => (
                  <div key={product._id} className="text-center">
                    <div className="bg-orange-50 p-4 rounded-lg mb-4 relative group">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/285x301/f3f3f3/999999?text=${encodeURIComponent(product.name)}`;
                        }}
                      />
                      <button
                        onClick={() => removeProduct(product._id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from comparison"
                      >
                        ×
                      </button>
                    </div>
                    <h3 className="text-2xl font-semibold text-black mb-2">{product.name}</h3>
                    <p className="text-xl font-medium text-black mb-2">{formatPrice(product.price)}</p>
                    {product.originalPrice && (
                      <p className="text-gray-400 line-through text-sm mb-2">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                    <StarRating rating={4.5} reviews="125 Reviews" />
                    <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                  </div>
                ))}

                {/* Add Product slot (only show if less than 3 products) */}
                {compareProducts.length < 3 && (
                  <div className="text-center">
                    <div className="bg-yellow-100 p-4 rounded-lg mb-4 flex items-center justify-center h-48">
                      <div>
                        <Plus className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-black mb-4">Add A Product</h3>
                        <button 
                          onClick={handleChooseProduct}
                          className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition-colors font-medium"
                        >
                          Choose a Product
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Comparison Tables */}
              {compareProducts.length > 0 && (
                <div className="space-y-12">
                  
                  {/* General Section */}
                  <div>
                    <h2 className="text-3xl font-bold text-black mb-8">General</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tbody className="space-y-4">
                          <tr className="border-b border-gray-200">
                            <td className="py-4 text-xl font-medium text-black w-1/4">Product Name</td>
                            {compareProducts.map((product) => (
                              <td key={product._id} className="py-4 text-lg text-gray-700">
                                {product.name}
                              </td>
                            ))}
                            {/* Fill empty columns */}
                            {Array.from({ length: 3 - compareProducts.length }).map((_, index) => (
                              <td key={index} className="py-4"></td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-4 text-xl font-medium text-black">Price</td>
                            {compareProducts.map((product) => (
                              <td key={product._id} className="py-4 text-lg text-gray-700">
                                {formatPrice(product.price)}
                              </td>
                            ))}
                            {Array.from({ length: 3 - compareProducts.length }).map((_, index) => (
                              <td key={index} className="py-4"></td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-4 text-xl font-medium text-black">Brand</td>
                            {compareProducts.map((product) => (
                              <td key={product._id} className="py-4 text-lg text-gray-700">
                                {product.brand || 'N/A'}
                              </td>
                            ))}
                            {Array.from({ length: 3 - compareProducts.length }).map((_, index) => (
                              <td key={index} className="py-4"></td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-4 text-xl font-medium text-black">Category</td>
                            {compareProducts.map((product) => (
                              <td key={product._id} className="py-4 text-lg text-gray-700">
                                {product.category || 'N/A'}
                              </td>
                            ))}
                            {Array.from({ length: 3 - compareProducts.length }).map((_, index) => (
                              <td key={index} className="py-4"></td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-4 text-xl font-medium text-black">Description</td>
                            {compareProducts.map((product) => (
                              <td key={product._id} className="py-4 text-lg text-gray-700">
                                {product.description}
                              </td>
                            ))}
                            {Array.from({ length: 3 - compareProducts.length }).map((_, index) => (
                              <td key={index} className="py-4"></td>
                            ))}
                          </tr>
                          {compareProducts.some(product => product.originalPrice) && (
                            <tr className="border-b border-gray-200">
                              <td className="py-4 text-xl font-medium text-black">Original Price</td>
                              {compareProducts.map((product) => (
                                <td key={product._id} className="py-4 text-lg text-gray-700">
                                  {product.originalPrice ? formatPrice(product.originalPrice) : 'N/A'}
                                </td>
                              ))}
                              {Array.from({ length: 3 - compareProducts.length }).map((_, index) => (
                                <td key={index} className="py-4"></td>
                              ))}
                            </tr>
                          )}
                          {compareProducts.some(product => product.discount) && (
                            <tr className="border-b border-gray-200">
                              <td className="py-4 text-xl font-medium text-black">Discount</td>
                              {compareProducts.map((product) => (
                                <td key={product._id} className="py-4 text-lg text-gray-700">
                                  {product.discount || 'No discount'}
                                </td>
                              ))}
                              {Array.from({ length: 3 - compareProducts.length }).map((_, index) => (
                                <td key={index} className="py-4"></td>
                              ))}
                            </tr>
                          )}
                          <tr className="border-b border-gray-200">
                            <td className="py-4 text-xl font-medium text-black">Availability</td>
                            {compareProducts.map((product) => (
                              <td key={product._id} className="py-4 text-lg text-gray-700">
                                {product.isNew ? (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                    New Arrival
                                  </span>
                                ) : (
                                  <span className="text-green-600">In Stock</span>
                                )}
                              </td>
                            ))}
                            {Array.from({ length: 3 - compareProducts.length }).map((_, index) => (
                              <td key={index} className="py-4"></td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Add to Cart Buttons */}
                  <div className={`grid gap-8 pt-8 ${
                    compareProducts.length === 1 ? 'grid-cols-2' : 
                    compareProducts.length === 2 ? 'grid-cols-3' : 'grid-cols-4'
                  }`}>
                    {compareProducts.map((product) => (
                      <div key={product._id}>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-yellow-600 text-white py-3 px-6 rounded font-semibold text-lg hover:bg-yellow-700 transition-colors"
                        >
                          Add To Cart
                        </button>
                      </div>
                    ))}
                    {/* Empty column for add product slot */}
                    {compareProducts.length < 3 && <div></div>}
                  </div>
                </div>
              )}
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

export default ProductComparison;