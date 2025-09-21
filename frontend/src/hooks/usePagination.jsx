// src/hooks/usePagination.js
import { useState, useMemo, useEffect } from 'react';

export const usePagination = (products) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  // Paginated products
  const paginatedData = useMemo(() => {
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    return {
      products: currentProducts,
      totalPages,
      totalProducts,
      startIndex: totalProducts > 0 ? startIndex + 1 : 0,
      endIndex: Math.min(endIndex, totalProducts)
    };
  }, [products, currentPage, itemsPerPage]);

  // Reset page when products change
  useEffect(() => {
    if (currentPage > paginatedData.totalPages && paginatedData.totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, paginatedData.totalPages]);

  // Pagination buttons renderer
  const renderPaginationButtons = () => {
    const buttons = [];
    const { totalPages } = paginatedData;
    const maxVisiblePages = 5;
    
    if (totalPages <= 1) return buttons;

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <button 
          key="prev"
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-orange-50 text-black px-4 py-2 rounded hover:bg-orange-200 transition-colors"
        >
          Previous
        </button>
      );
    }

    // Calculate page range
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page + ellipsis
    if (startPage > 1) {
      buttons.push(
        <button 
          key={1}
          onClick={() => setCurrentPage(1)}
          className="bg-orange-50 text-black px-3 py-2 rounded hover:bg-orange-200 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-3 py-2 text-gray-500">...</span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button 
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-2 rounded transition-colors ${
            currentPage === i 
              ? 'bg-yellow-600 text-white' 
              : 'bg-orange-50 text-black hover:bg-orange-200'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page + ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-3 py-2 text-gray-500">...</span>
        );
      }
      buttons.push(
        <button 
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="bg-orange-50 text-black px-3 py-2 rounded hover:bg-orange-200 transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <button 
          key="next"
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-orange-50 text-black px-4 py-2 rounded hover:bg-orange-200 transition-colors"
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    renderPaginationButtons
  };
};