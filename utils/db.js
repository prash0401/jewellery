const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const MongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://prashant:prash@nodes.qvuvs.mongodb.net/ecommerce-imitation-jewell"
  )
    .then((result) => {
      console.log("Connected to MongoDB");
      _db = result.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "DB is not connected";
  }
};

// async function updateImageField() {
//   const uri = "mongodb+srv://prashant:prash@nodes.qvuvs.mongodb.net/";
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     const db = client.db("ecommerce-imitation-jewell");
//     const collection = db.collection("products");

//     // Update documents where `image` is a string
//     const result = await collection.updateMany(
//       { image: { $type: "string" } },
//       { $set: { image: ["$image"] } } // Wrap string in an array
//     );

//     console.log(`Modified ${result.modifiedCount} documents.`);
//   } catch (err) {
//     console.error("Error updating documents:", err);
//   } finally {
//     await client.close();
//   }
// }

// updateImageField();

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;
