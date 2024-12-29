const express = require("express");
const {
  getProductList,
  insertProduct,
} = require("../controllers/productController");
const {
  getOrderList,
  orderDetails,
} = require("../controllers/orderController");

const route = express.Router();

route.get("/products", getProductList);
route.get("/orders", getOrderList);
route.post("/orders-details", orderDetails);
route.post("/save-product", insertProduct);

module.exports = route;
