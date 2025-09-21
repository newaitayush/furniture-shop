// routes/productRoutes.js
import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/products/stats
// @desc    Get product statistics
// @access  Public
router.get('/stats', getProductStats);

// @route   GET /api/products
// @desc    Get all products with filtering, sorting, pagination
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', getProduct);

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), createProduct);

// @route   PUT /api/products/:id
// @desc    Update product by ID
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin'), updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product by ID (soft delete)
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;