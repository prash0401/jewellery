const { S3 } = require("@aws-sdk/client-s3");
const Product = require("../models/productModel");
const { ObjectId } = require("mongodb");
const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.getProductList = (req, res, next) => {
  Product.getProducts()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.insertProduct = async (req, res, next) => {
  const { name, category, quantity, prodDetail, price, userId } = req.body;
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No file uploaded");
  }
  const files = Array.isArray(req.files.image)
    ? req.files.image
    : [req.files.image];
  const imageUrls = [];

  for (const file of files) {
    const params = {
      Bucket: "nitaripra",
      Key: file.name,
      Body: file.data,
      ContentType: file.mimetype,
    };
    await s3.putObject(params);
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    imageUrls.push(imageUrl);
  }
  const newProd = new Product(
    name,
    category,
    quantity,
    imageUrls,
    prodDetail,
    price,
    new ObjectId(userId)
  );
  newProd
    .productSave()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("error", err);
    });
};
