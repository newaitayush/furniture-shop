// src/components/admin/AdminProductCard.jsx
import React, { useState } from 'react';
import { Edit3, Trash2, Eye, ShoppingCart, Heart, BarChart3 } from 'lucide-react';

const AdminProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  onAddToCart, 
  onAddToWishlist, 
  onAddToCompare 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(product);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product._id);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWishlist?.(product);
  };

  const handleAddToCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCompare?.(product);
  };

  return (
    <div
      className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Admin Action Buttons - Show on Hover */}
      <div className={`absolute top-3 right-3 flex gap-2 z-20 transition-all duration-300 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}>
        <button
          onClick={handleEdit}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          title="Edit Product"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
          title="Delete Product"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Product Status Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.discount && (
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
            {product.discount}
          </span>
        )}
        {product.isNew && (
          <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
            New
          </span>
        )}
        {!product.inStock && (
          <span className="px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = '/images/placeholder-product.jpg';
            setImageLoaded(true);
          }}
        />

        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-white text-gray-800 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            title="Add to Cart"
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddToWishlist}
            className="p-2 bg-white text-gray-800 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
            title="Add to Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddToCompare}
            className="p-2 bg-white text-gray-800 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
            title="Add to Compare"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <a
            href={`/products/${product._id}`}
            className="p-2 bg-white text-gray-800 rounded-lg hover:bg-purple-500 hover:text-white transition-colors"
            title="View Details"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Category and Brand */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          <span>•</span>
          <span>{product.brand}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        {product.rating > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : star === Math.ceil(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-800">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Admin Info */}
        <div className="text-xs text-gray-500 border-t pt-2">
          <div className="flex justify-between items-center mb-1">
            <span>Stock:</span>
            <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.stock || 0} units
            </span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span>Status:</span>
            <span className={product.isActive ? 'text-green-600' : 'text-red-600'}>
              {product.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>ID:</span>
            <span className="font-mono">
              {product._id?.slice(-8)}...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;