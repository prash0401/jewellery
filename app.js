const express = require("express");
const { MongoConnect } = require("./utils/db");
const fileupload = require("express-fileupload");
require("dotenv").config();
const app = express();
const route = require("./Routes/route");
const port = 5000;

app.use(express.json());
app.use(fileupload());
app.use(route);
MongoConnect(() => {
  app.listen(port, () => {
    console.log(`App is running in ${port} port`);
  });
});
