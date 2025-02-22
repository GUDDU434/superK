const Store = require("../models/stores");
const Product = require("../models/products");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const product = new Product({ ...req.body, store: store._id });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  const { limit = 10, page = 1, price, category } = req.query;
  const storeId = req.params.storeId;
  if (limit < 0 || page < 0) {
    return res.status(400).json({ message: "Invalid pagination parameters" });
  }

  let filter = { store: storeId };
  if (price) {
    filter.price = price;
  }
  if (category) {
    filter.category = category;
  }

  try {
    const products = await Product.find(filter)
      .populate("store")
      .limit(limit)
      .skip((page - 1) * limit);

    res
      .status(200)
      .json({ data: products, total: products.length, page, limit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById({
      _id: req.params.id,
      store: req.params.storeId,
    }).populate("store");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("store");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
