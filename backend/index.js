const express = require("express");
const cors = require("cors");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./controllers/products.js");
const {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
} = require("./controllers/store.js");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/start", (req, res) => {
  res.send("welcome");
});

// Stores;
app.get("/stores", getStores);
app.get("/stores/:id", getStoreById);
app.post("/stores", createStore);
app.put("/stores/:id", updateStore);
app.delete("/stores/:id", deleteStore);

// Products;
app.post("/products/:storeId", createProduct);
app.get("/products/:storeId", getProducts);
app.get("/products/:storeId/:id", getProductById);
app.put("/products/:id", updateProduct);
app.delete("/products/:id", deleteProduct);

const PORT = process.env.PORT || 8000;
require("./config/db");
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
