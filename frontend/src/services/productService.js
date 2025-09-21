// src/services/productService.js

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (response.ok) {
    return { success: true, ...data };
  } else {
    // Handle specific error codes
    if (response.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
      return { success: false, message: 'Session expired. Please login again.' };
    }
    
    if (response.status === 403) {
      return { success: false, message: 'Access denied. Admin privileges required.' };
    }
    
    if (response.status === 404) {
      return { success: false, message: 'Product not found.' };
    }
    
    return { success: false, message: data.message || 'Request failed' };
  }
};

// Helper function to handle network errors
const handleNetworkError = (error, operation = 'operation') => {
  console.error(`${operation} error:`, error);
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return { 
      success: false, 
      message: 'Unable to connect to server. Please check your internet connection.',
      data: []
    };
  }
  
  return { 
    success: false, 
    message: 'Network error. Please check your connection and try again.',
    data: []
  };
};

// Get all products with filtering and pagination
export const getProducts = async (params = {}) => {
  try {
    // Build query string
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          // Handle array parameters (e.g., categories, brands)
          value.forEach(v => queryParams.append(key, v));
        } else {
          queryParams.append(key, value);
        }
      }
    });

    const response = await fetch(`${API_URL}/products?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Get products');
  }
};

// Get single product by ID
export const getProduct = async (id) => {
  try {
    if (!id) {
      return { success: false, message: 'Product ID is required' };
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Get product');
  }
};

// Create new product (Admin only)
export const createProduct = async (productData) => {
  try {
    if (!productData) {
      return { success: false, message: 'Product data is required' };
    }

    // Validate required fields
    const requiredFields = ['name', 'price', 'category'];
    const missingFields = requiredFields.filter(field => !productData[field]);
    
    if (missingFields.length > 0) {
      return { 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      };
    }

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Create product');
  }
};

// Update product (Admin only)
export const updateProduct = async (id, productData) => {
  try {
    if (!id) {
      return { success: false, message: 'Product ID is required' };
    }

    if (!productData) {
      return { success: false, message: 'Product data is required' };
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Update product');
  }
};

// Delete product (Admin only)
export const deleteProduct = async (id) => {
  try {
    if (!id) {
      return { success: false, message: 'Product ID is required' };
    }

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Delete product');
  }
};

// Bulk delete products (Admin only)
export const bulkDeleteProducts = async (productIds) => {
  try {
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return { success: false, message: 'Product IDs array is required' };
    }

    const response = await fetch(`${API_URL}/products/bulk-delete`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productIds })
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Bulk delete products');
  }
};

// Get product statistics
export const getProductStats = async () => {
  try {
    const response = await fetch(`${API_URL}/products/stats`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Get product stats');
  }
};

// Search products (enhanced search functionality)
export const searchProducts = async (searchTerm, filters = {}) => {
  try {
    if (!searchTerm || searchTerm.trim() === '') {
      return { success: false, message: 'Search term is required', data: [] };
    }

    const params = {
      search: searchTerm.trim(),
      ...filters
    };

    return await getProducts(params);
  } catch (error) {
    return handleNetworkError(error, 'Search products');
  }
};

// Get products by category
export const getProductsByCategory = async (category, params = {}) => {
  try {
    if (!category) {
      return { success: false, message: 'Category is required', data: [] };
    }

    return await getProducts({ 
      category, 
      ...params 
    });
  } catch (error) {
    return handleNetworkError(error, 'Get products by category');
  }
};

// Get products by brand
export const getProductsByBrand = async (brand, params = {}) => {
  try {
    if (!brand) {
      return { success: false, message: 'Brand is required', data: [] };
    }

    return await getProducts({ 
      brand, 
      ...params 
    });
  } catch (error) {
    return handleNetworkError(error, 'Get products by brand');
  }
};

// Get featured products
export const getFeaturedProducts = async (limit = 8) => {
  try {
    return await getProducts({ 
      featured: true,
      sortBy: '-rating',
      limit 
    });
  } catch (error) {
    return handleNetworkError(error, 'Get featured products');
  }
};

// Get new products
export const getNewProducts = async (limit = 8) => {
  try {
    return await getProducts({ 
      isNew: true,
      sortBy: '-createdAt',
      limit 
    });
  } catch (error) {
    return handleNetworkError(error, 'Get new products');
  }
};

// Get products on sale
export const getSaleProducts = async (limit = 8) => {
  try {
    return await getProducts({ 
      onSale: true,
      sortBy: '-discountPercentage',
      limit 
    });
  } catch (error) {
    return handleNetworkError(error, 'Get sale products');
  }
};

// Get related products
export const getRelatedProducts = async (productId, limit = 4) => {
  try {
    if (!productId) {
      return { success: false, message: 'Product ID is required', data: [] };
    }

    const response = await fetch(`${API_URL}/products/${productId}/related?limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Get related products');
  }
};

// Get categories with product counts
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Get categories');
  }
};

// Get brands with product counts
export const getBrands = async () => {
  try {
    const response = await fetch(`${API_URL}/products/brands`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Get brands');
  }
};

// Toggle product availability (Admin only)
export const toggleProductAvailability = async (id) => {
  try {
    if (!id) {
      return { success: false, message: 'Product ID is required' };
    }

    const response = await fetch(`${API_URL}/products/${id}/toggle-availability`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Toggle product availability');
  }
};

// Update product stock (Admin only)
export const updateProductStock = async (id, stock) => {
  try {
    if (!id) {
      return { success: false, message: 'Product ID is required' };
    }

    if (stock < 0) {
      return { success: false, message: 'Stock cannot be negative' };
    }

    const response = await fetch(`${API_URL}/products/${id}/stock`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ stock })
    });

    return await handleResponse(response);
  } catch (error) {
    return handleNetworkError(error, 'Update product stock');
  }
};

// Default export with all functions
const productService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  getProductStats,
  searchProducts,
  getProductsByCategory,
  getProductsByBrand,
  getFeaturedProducts,
  getNewProducts,
  getSaleProducts,
  getRelatedProducts,
  getCategories,
  getBrands,
  toggleProductAvailability,
  updateProductStock
};

export default productService;