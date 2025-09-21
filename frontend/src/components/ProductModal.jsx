// src/components/ProductModals.jsx
import React from 'react';
import AddProductModal from './AddProductModal';
import UpdateProductModal from './UpdateProductModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const ProductModals = ({ modals, onClose, onSubmit }) => {
  return (
    <>
      {/* Add Product Modal */}
      {modals.add && (
        <AddProductModal
          isOpen={modals.add}
          onClose={() => onClose('add')}
          onSubmit={(product) => {
            onSubmit.create(product);
            onClose('add');
          }}
        />
      )}

      {/* Update Product Modal */}
      {modals.update && modals.selectedProduct && (
        <UpdateProductModal
          isOpen={modals.update}
          onClose={() => onClose('update')}
          onSubmit={(product) => {
            onSubmit.update(product);
            onClose('update');
          }}
          product={modals.selectedProduct}
        />
      )}

      {/* Delete Confirm Modal */}
      {modals.delete && modals.selectedProduct && (
        <DeleteConfirmModal
          isOpen={modals.delete}
          onClose={() => onClose('delete')}
          onConfirm={() => {
            onSubmit.delete(modals.selectedProduct);
            onClose('delete');
          }}
          productName={modals.selectedProduct.name}
        />
      )}
    </>
  );
};

export default ProductModals;