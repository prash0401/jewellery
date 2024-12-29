const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/db");

class Order {
  static getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find()
      .toArray()
      .then((result) => {
        console.log("Orders loaded", result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static orderByProductId(id) {
    console.log("iddddd", id);
    let db = getDb();
    return db
      .collection("orders")
      .aggregate([
        {
          $match: {
            userId: new ObjectId(id), // Match the specific userId
          },
        },
        {
          $unwind: "$products", // Deconstruct the products array
        },
        {
          $lookup: {
            from: "products", // The target collection to join
            localField: "products.id", // Field from `orders` to match
            foreignField: "_id", // Field from `products` to match
            as: "productDetails", // Output array field with matching documents
          },
        },
        {
          $unwind: "$productDetails", // Unwind the productDetails array
        },
        {
          $group: {
            _id: "$_id", // Group by the order ID
            userId: { $first: "$userId" },
            status: { $first: "$status" },
            totalAmount: { $first: "$totalAmount" },
            products: {
              $push: {
                productId: "$products.productId",
                quantity: "$products.quantity",
                name: "$products.name",
                amount: "$products.amount",
                image: "$productDetails.image", // Include the image field from the lookup
              },
            },
          },
        },
      ])

      .toArray()
      .then((result) => {
        console.log("res", result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = Order;
