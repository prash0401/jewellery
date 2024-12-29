const { getDb } = require("../utils/db");

class Product {
  constructor(name, category, quantity, image, prodDetail, price, userId) {
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.image = Array.isArray(image) ? image : [image];
    this.image = image;
    this.prodDetail = prodDetail;
    this.price = price;
    this.userId = userId;
  }

  productSave() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getProducts() {
    let db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
}
module.exports = Product;
