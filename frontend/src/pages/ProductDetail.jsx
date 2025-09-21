import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Star, Minus, Plus, Share2, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import ProductService from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // State management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('purple');
  const [compareList, setCompareList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');

  // Sample product data for fallback
  const sampleProduct = {
    _id: id || '1',
    name: 'Asgaard sofa',
    price: 250000,
    originalPrice: 350000,
    description: 'Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.',
    images: [
      '/images/product1.png',
      '/images/product2.png',
      '/images/product3.png',
      '/images/product4.jpg'
    ],
    image: '/images/product1.png',
    brand: 'Furniro',
    category: 'Sofa',
    rating: 4.7,
    reviews: 5,
    sku: 'SS001',
    tags: ['Sofa', 'Chair', 'Home', 'Shop'],
    sizes: ['L', 'XL', 'XS'],
    colors: ['purple', 'black', 'gold'],
    inStock: true,
    isNew: false
  };

  // Sample related products
  const sampleRelatedProducts = [
    {
      _id: '2',
      name: 'Syltherine',
      price: 2500000,
      originalPrice: 3500000,
      image: '/images/product2.png',
      discount: '-30%'
    },
    {
      _id: '3',
      name: 'Leviosa',
      price: 2500000,
      image: '/images/product3.png'
    },
    {
      _id: '4',
      name: 'Lolito',
      price: 7000000,
      originalPrice: 14000000,
      image: '/images/product4.jpg',
      discount: '-50%'
    },
    {
      _id: '5',
      name: 'Respira',
      price: 500000,
      image: '/images/product1.png',
      isNew: true
    }
  ];

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Try to fetch from API
        const response = await ProductService.getProductById(id);
        
        if (response && response.success) {
          setProduct(response.data);
        } else {
          throw new Error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Use sample data as fallback
        setProduct(sampleProduct);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        // Try to fetch related products from API
        const response = await ProductService.getRelatedProducts(id);
        if (response && response.success) {
          setRelatedProducts(response.data);
        } else {
          throw new Error('Related products not found');
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
        // Use sample data as fallback
        setRelatedProducts(sampleRelatedProducts);
      }
    };

    if (id) {
      fetchProduct();
      fetchRelatedProducts();
    }
  }, [id]);

  // Get compare list from localStorage
  useEffect(() => {
    const savedCompareList = localStorage.getItem('compareList');
    if (savedCompareList) {
      setCompareList(JSON.parse(savedCompareList));
    }

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Helper functions
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString('id-ID')}.00`;
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Event handlers
  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      ...product,
      quantity,
      selectedSize,
      selectedColor
    };
    
    addToCart(cartItem, quantity);
    showNotification(`${product.name} added to cart!`);
  };

  const handleCompare = () => {
    if (!product) return;

    let updatedCompareList = [...compareList];
    const isInCompare = compareList.find(item => item._id === product._id);

    if (isInCompare) {
      updatedCompareList = compareList.filter(item => item._id !== product._id);
      showNotification(`${product.name} removed from comparison`);
    } else if (compareList.length >= 3) {
      showNotification('You can compare maximum 3 products');
      return;
    } else {
      updatedCompareList.push(product);
      showNotification(`${product.name} added to comparison`);
    }

    setCompareList(updatedCompareList);
    localStorage.setItem('compareList', JSON.stringify(updatedCompareList));

    // Navigate to comparison page
    if (updatedCompareList.length > 0) {
      navigate('/comparison', { state: { products: updatedCompareList } });
    }
  };

  const handleWishlist = () => {
    if (!product) return;

    let updatedWishlist = [...wishlist];
    const isInWishlist = wishlist.find(item => item._id === product._id);

    if (isInWishlist) {
      updatedWishlist = wishlist.filter(item => item._id !== product._id);
      showNotification(`${product.name} removed from wishlist`);
    } else {
      updatedWishlist.push(product);
      showNotification(`${product.name} added to wishlist`);
    }

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleShare = async () => {
    if (!product) return;

    const shareData = {
      title: product.name,
      text: `Check out this amazing ${product.description}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showNotification('Product shared successfully');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showNotification('Product link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      showNotification('Unable to share product');
    }
  };

  const StarRating = ({ rating, reviews }) => (
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
      <span className="text-sm text-gray-600">{reviews} Customer Review</span>
    </div>
  );

  const ProductCard = ({ product }) => (
    <Link to={`/product/${product._id}`} className="group">
      <div className="bg-gray-100 relative overflow-hidden">
        <div className="relative">
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/285x301/f3f3f3/999999?text=${encodeURIComponent(product.name)}`;
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            {product.discount && (
              <span className="bg-red-500 text-white text-base font-medium px-2 py-1 rounded-full w-12 h-12 flex items-center justify-center">
                {product.discount}
              </span>
            )}
            {product.isNew && (
              <span className="bg-green-500 text-white text-base font-medium px-2 py-1 rounded-full w-12 h-12 flex items-center justify-center">
                New
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 bg-gray-100">
          <h3 className="font-semibold text-2xl text-gray-800 mb-2">{product.name}</h3>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-xl text-gray-800">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-base">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading product...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-64">
          <div className="text-xl text-gray-600 mb-4">Product not found</div>
          <Link 
            to="/shop"
            className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images || [product.image];
  const isInCompareList = compareList.find(item => item._id === product._id);
  const isInWishlist = wishlist.find(item => item._id === product._id);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-orange-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-base">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Product Images */}
          <div className="space-y-4">
            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-yellow-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/80x80/f3f3f3/999999?text=${index + 1}`;
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="bg-orange-50 rounded-lg p-8">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/500x400/f3f3f3/999999?text=${encodeURIComponent(product.name)}`;
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-semibold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-2xl font-medium text-gray-600 mb-4">{formatPrice(product.price)}</p>
              <StarRating rating={product.rating || 4.7} reviews={product.reviews || 5} />
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
              <div className="flex space-x-3">
                {(product.sizes || ['L', 'XL', 'XS']).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-medium ${
                      selectedSize === size
                        ? 'border-yellow-600 bg-yellow-600 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-yellow-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {(product.colors || ['purple', 'black', 'gold']).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-gray-600 ring-2 ring-offset-2 ring-gray-400' : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: color === 'purple' ? '#8B5CF6' : 
                                     color === 'black' ? '#000000' : 
                                     color === 'gold' ? '#F59E0B' : color
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center space-x-4">
              {/* Quantity */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="p-3 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-3 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="p-3 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="bg-white border border-gray-300 text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Add To Cart
              </button>

              {/* Compare */}
              <button
                onClick={handleCompare}
                className={`border rounded-lg px-6 py-3 font-medium transition-colors ${
                  isInCompareList
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 text-gray-900 hover:border-blue-500 hover:text-blue-500'
                }`}
              >
                + Compare
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex items-center space-x-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
              
              <button
                onClick={handleWishlist}
                className={`flex items-center space-x-2 transition-colors ${
                  isInWishlist ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                <span>Wishlist</span>
              </button>
            </div>

            {/* Product Details */}
            <div className="space-y-2 pt-6 border-t border-gray-200">
              <div className="flex">
                <span className="w-20 text-gray-600">SKU</span>
                <span className="text-gray-600">: {product.sku || 'SS001'}</span>
              </div>
              <div className="flex">
                <span className="w-20 text-gray-600">Category</span>
                <span className="text-gray-600">: {product.category}</span>
              </div>
              <div className="flex">
                <span className="w-20 text-gray-600">Tags</span>
                <span className="text-gray-600">: {(product.tags || ['Sofa', 'Chair', 'Home']).join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="mb-8">
            <div className="flex justify-center space-x-8 border-b border-gray-200">
              <button className="pb-4 text-2xl font-medium text-black border-b-2 border-black">
                Description
              </button>
              <button className="pb-4 text-2xl font-medium text-gray-500 hover:text-black">
                Additional Information
              </button>
              <button className="pb-4 text-2xl font-medium text-gray-500 hover:text-black">
                Reviews [{product.reviews || 5}]
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.longDescription || product.description || 
              "Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road."}
            </p>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish transport.
            </p>

            {/* Product Images in Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-orange-50 p-6 rounded-lg">
                <img
                  src={product.image}
                  alt={`${product.name} lifestyle 1`}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x300/f3f3f3/999999?text=Product+Image+1`;
                  }}
                />
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <img
                  src={images[1] || product.image}
                  alt={`${product.name} lifestyle 2`}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x300/f3f3f3/999999?text=Product+Image+2`;
                  }}
                />
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    High-quality materials and craftsmanship
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Durable construction for long-lasting use
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Modern design that fits any space
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Available in multiple sizes and colors
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Brand</span>
                    <span className="font-medium">{product.brand || 'Furniro'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Category</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Material</span>
                    <span className="font-medium">Premium Wood & Fabric</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Warranty</span>
                    <span className="font-medium">2 Years</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Weight</span>
                    <span className="font-medium">25 KG</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Instructions */}
            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Care Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Cleaning</h4>
                  <p>Use a soft, dry cloth to dust regularly. For deeper cleaning, use a slightly damp cloth and dry immediately.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Maintenance</h4>
                  <p>Avoid direct sunlight and extreme temperatures. Check and tighten screws periodically.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;