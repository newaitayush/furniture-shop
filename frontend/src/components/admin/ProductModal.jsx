// src/components/admin/ProductModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Plus, Package, DollarSign, Tag, Image, FileText, Star, Hash } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, onSubmit, product = null, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    brand: '',
    discount: '',
    stock: '',
    rating: '',
    reviews: '',
    isNew: false,
    inStock: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Static images for products (since we're ignoring image upload)
  const staticImages = [
    '/images/products/sofa-1.jpg',
    '/images/products/chair-1.jpg',
    '/images/products/table-1.jpg',
    '/images/products/bed-1.jpg',
    '/images/products/cabinet-1.jpg',
    '/images/products/lamp-1.jpg'
  ];

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        originalPrice: product.originalPrice?.toString() || '',
        category: product.category || '',
        brand: product.brand || '',
        discount: product.discount || '',
        stock: product.stock?.toString() || '',
        rating: product.rating?.toString() || '',
        reviews: product.reviews?.toString() || '',
        isNew: product.isNew || false,
        inStock: product.inStock !== undefined ? product.inStock : true
      });
    } else if (mode === 'add') {
      // Reset form for add mode
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        brand: '',
        discount: '',
        stock: '',
        rating: '',
        reviews: '',
        isNew: false,
        inStock: true
      });
    }
    setErrors({});
  }, [product, mode, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    
    if (formData.originalPrice && parseFloat(formData.originalPrice) < parseFloat(formData.price)) {
      newErrors.originalPrice = 'Original price should be higher than current price';
    }
    
    if (formData.stock && parseInt(formData.stock) < 0) newErrors.stock = 'Stock cannot be negative';
    if (formData.rating && (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }
    if (formData.reviews && parseInt(formData.reviews) < 0) newErrors.reviews = 'Reviews cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        image: staticImages[Math.floor(Math.random() * staticImages.length)], // Random static image
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: formData.stock ? parseInt(formData.stock) : 0,
        rating: formData.rating ? parseFloat(formData.rating) : 0,
        reviews: formData.reviews ? parseInt(formData.reviews) : 0
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            {mode === 'add' ? <Plus className="w-6 h-6 text-blue-600" /> : <Package className="w-6 h-6 text-amber-600" />}
            <h2 className="text-xl font-semibold">
              {mode === 'add' ? 'Add New Product' : 'Edit Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Basic Information
            </h3>
            
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product name"
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter product description"
                disabled={isSubmitting}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Category and Brand */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Sofa, Chair, Table"
                  disabled={isSubmitting}
                />
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.brand ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter brand name"
                  disabled={isSubmitting}
                />
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                  disabled={isSubmitting}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.originalPrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                  disabled={isSubmitting}
                />
                {errors.originalPrice && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
              </div>
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Label
              </label>
              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., -30% or Sale"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Inventory & Reviews */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Inventory & Reviews
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                  disabled={isSubmitting}
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="5"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.rating ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.0"
                  disabled={isSubmitting}
                />
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reviews Count
                </label>
                <input
                  type="number"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.reviews ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                  disabled={isSubmitting}
                />
                {errors.reviews && <p className="text-red-500 text-sm mt-1">{errors.reviews}</p>}
              </div>
            </div>
          </div>

          {/* Status Flags */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Status
            </h3>
            
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-700">Mark as New Product</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-700">In Stock</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {mode === 'add' ? 'Adding...' : 'Updating...'}
                </>
              ) : (
                <>
                  {mode === 'add' ? <Plus className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                  {mode === 'add' ? 'Add Product' : 'Update Product'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;