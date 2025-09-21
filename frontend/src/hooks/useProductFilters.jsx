// src/hooks/useProductFilters.js
import { useState, useEffect, useMemo, useCallback } from 'react';

export const useProductFilters = (allProducts, searchParams) => {
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    search: searchParams.get('search') || ''
  });
  
  const [sortBy, setSortBy] = useState('newest');

  // Available filters for sample data
  const availableFilters = useMemo(() => ({
    brands: [...new Set(allProducts.map(p => p.brand))].sort(),
    categories: [...new Set(allProducts.map(p => p.category))].sort()
  }), [allProducts]);

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(searchTerm);
        const matchesDescription = product.description.toLowerCase().includes(searchTerm);
        const matchesBrand = product.brand.toLowerCase().includes(searchTerm);
        const matchesCategory = product.category.toLowerCase().includes(searchTerm);
        
        if (!matchesName && !matchesDescription && !matchesBrand && !matchesCategory) {
          return false;
        }
      }
      
      // Brand filter
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }
      
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      
      // Price filters
      const minPrice = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
      
      return true;
    });
  }, [allProducts, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price_low_high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_high_low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name_az':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_za':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'rating_high_low':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'popularity':
        return sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      case 'oldest':
        return sorted.sort((a, b) => parseInt(a._id) - parseInt(b._id));
      case 'newest':
      default:
        return sorted.sort((a, b) => parseInt(b._id) - parseInt(a._id));
    }
  }, [filteredProducts, sortBy]);

  // Handle filter changes
  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      brand: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      search: ''
    });
  }, []);

  // Update search from URL params
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery && searchQuery !== filters.search) {
      setFilters(prev => ({ ...prev, search: searchQuery }));
    }
  }, [searchParams, filters.search]);

  return {
    filters,
    handleFilterChange,
    clearFilters,
    filteredProducts: sortedProducts,
    sortBy,
    setSortBy,
    availableFilters
  };
};