// src/components/CompareBar.jsx
import React from 'react';
import { X, ArrowRight, Scale } from 'lucide-react';

const CompareBar = ({ compareList, onCompare, onClear, onGoToComparison }) => {
  if (!compareList || compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left side - Compare info and products */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-gray-800">
                Compare ({compareList.length}/3)
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              {compareList.map((product) => (
                <div key={product._id} className="relative group">
                  <div className="w-16 h-16 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/product-placeholder.png';
                      }}
                    />
                  </div>
                  <button
                    onClick={() => onCompare(product)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm"
                    title={`Remove ${product.name} from comparison`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {product.name}
                  </div>
                </div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: 3 - compareList.length }).map((_, index) => (
                <div 
                  key={`empty-${index}`} 
                  className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
                >
                  <span className="text-gray-400 text-xs">+</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onClear}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              title="Clear all products from comparison"
            >
              Clear All
            </button>
            
            <button
              onClick={onGoToComparison}
              disabled={compareList.length < 2}
              className={`px-6 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                compareList.length >= 2
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              title={compareList.length < 2 ? 'Select at least 2 products to compare' : 'Go to comparison page'}
            >
              <span>Compare Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Products selected</span>
            <span>{compareList.length}/3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-yellow-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(compareList.length / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;