// controllers/productController.js
import Product from '../models/productModel.js';

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      sort = '-createdAt',
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      isNew,
      inStock,
      rating
    } = req.query;

    // Build query
    let query = { isActive: true };

    // Category filter
    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(category, 'i') };
    }

    // Brand filter
    if (brand && brand !== 'all') {
      query.brand = { $regex: new RegExp(brand, 'i') };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Boolean filters
    if (isNew === 'true') query.isNew = true;
    if (inStock === 'true') query.inStock = true;
    if (rating) query.rating = { $gte: parseFloat(rating) };

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination and sorting
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    // Get unique categories and brands for filters
    const categories = await Product.distinct('category', { isActive: true });
    const brands = await Product.distinct('brand', { isActive: true });

    res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      totalPages,
      currentPage: parseInt(page),
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      filters: {
        categories: categories.sort(),
        brands: brands.sort()
      },
      data: products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching products'
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not available'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    
    // Check if error is due to invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching product'
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin only)
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      image,
      category,
      brand,
      discount,
      isNew,
      inStock,
      stock,
      rating,
      reviews
    } = req.body;

    // Validation
    if (!name || !description || !price || !image || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, description, price, image, category, brand'
      });
    }

    // Create product data
    const productData = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: image.trim(),
      category: category.trim(),
      brand: brand.trim()
    };

    // Add optional fields
    if (originalPrice) productData.originalPrice = parseFloat(originalPrice);
    if (discount) productData.discount = discount.trim();
    if (typeof isNew !== 'undefined') productData.isNew = Boolean(isNew);
    if (typeof inStock !== 'undefined') productData.inStock = Boolean(inStock);
    if (stock !== undefined) productData.stock = parseInt(stock) || 0;
    if (rating) productData.rating = parseFloat(rating);
    if (reviews !== undefined) productData.reviews = parseInt(reviews) || 0;

    // Create product
    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map(err => err.message).join(', ');
      return res.status(400).json({
        success: false,
        message: `Validation Error: ${message}`
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating product'
    });
  }
};

// @desc    Update product by ID
// @route   PUT /api/products/:id
// @access  Private (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Build update object with only provided fields
    const updateData = {};
    const allowedFields = [
      'name', 'description', 'price', 'originalPrice', 'image', 
      'category', 'brand', 'discount', 'isNew', 'inStock', 
      'stock', 'rating', 'reviews', 'isActive'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'name' || field === 'description' || field === 'image' || 
            field === 'category' || field === 'brand' || field === 'discount') {
          updateData[field] = req.body[field]?.toString().trim();
        } else if (field === 'price' || field === 'originalPrice' || field === 'rating') {
          updateData[field] = parseFloat(req.body[field]);
        } else if (field === 'stock' || field === 'reviews') {
          updateData[field] = parseInt(req.body[field]) || 0;
        } else if (field === 'isNew' || field === 'inStock' || field === 'isActive') {
          updateData[field] = Boolean(req.body[field]);
        }
      }
    });

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map(err => err.message).join(', ');
      return res.status(400).json({
        success: false,
        message: `Validation Error: ${message}`
      });
    }

    // Check if error is due to invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating product'
    });
  }
};

// @desc    Delete product by ID (soft delete)
// @route   DELETE /api/products/:id
// @access  Private (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete - set isActive to false
    const deletedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    console.error('Delete product error:', error);
    
    // Check if error is due to invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting product'
    });
  }
};

// @desc    Get product statistics
// @route   GET /api/products/stats
// @access  Public
export const getProductStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
          totalStock: { $sum: '$stock' },
          avgRating: { $avg: '$rating' },
          totalCategories: { $addToSet: '$category' },
          totalBrands: { $addToSet: '$brand' }
        }
      }
    ]);

    const categoryStats = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const brandStats = await Product.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$brand',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const result = stats[0] || {
      totalProducts: 0,
      avgPrice: 0,
      maxPrice: 0,
      minPrice: 0,
      totalStock: 0,
      avgRating: 0,
      totalCategories: [],
      totalBrands: []
    };

    res.status(200).json({
      success: true,
      data: {
        overview: {
          ...result,
          totalCategories: result.totalCategories?.length || 0,
          totalBrands: result.totalBrands?.length || 0
        },
        categoryBreakdown: categoryStats,
        brandBreakdown: brandStats
      }
    });
  } catch (error) {
    console.error('Get product stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching product statistics'
    });
  }
};