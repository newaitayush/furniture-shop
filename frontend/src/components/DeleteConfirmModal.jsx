import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import ProductService from '../services/productService';

const DeleteConfirmModal = ({ isOpen, onClose, product, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!product?._id) return;
    
    setLoading(true);
    setError('');

    try {
      const response = await ProductService.deleteProduct(product._id);
      
      if (response.success) {
        onSuccess();
      } else {
        setError(response.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setError(error.message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Delete Product</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md border border-red-200 mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>

            {/* Product Preview */}
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-start space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/64x64/f3f3f3/999999?text=${encodeURIComponent(product.name.charAt(0))}`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{product.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="font-medium text-gray-800">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    <span>Brand: {product.brand}</span>
                    <span>•</span>
                    <span>Category: {product.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  <span>Delete Product</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;