const exress = require("express");
const productController = require("./controllers/productController");
const app = exress();

app.use(exress.json());

app.use("/products", productController);

module.exports = app;