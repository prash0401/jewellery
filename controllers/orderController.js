const Order = require("../models/orderModel");

exports.getOrderList = (req, res, next) => {
  Order.getOrders()
    .then((orders) => {
      res.send(orders);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.orderDetails = (req, res, next) => {
  const { id } = req.query;
  Order.orderByProductId(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
