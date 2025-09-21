// src/components/FilterPanel.jsx
import React from 'react';
import { X } from 'lucide-react';

const FilterPanel = ({ 
  showFilter, 
  filters, 
  onFilterChange, 
  onClearFilters, 
  availableFilters 
}) => {
  if (!showFilter) return null;

  return (
    <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Advanced Filters</h3>
        <button
          onClick={onClearFilters}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">All Categories</option>
            {availableFilters?.categories?.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <select
            value={filters.brand || ''}
            onChange={(e) => onFilterChange('brand', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">All Brands</option>
            {availableFilters?.brands?.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.search || filters.category || filters.brand || filters.minPrice || filters.maxPrice) && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                Search: "{filters.search}"
              </span>
            )}
            {filters.category && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                Category: {filters.category}
              </span>
            )}
            {filters.brand && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                Brand: {filters.brand}
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;