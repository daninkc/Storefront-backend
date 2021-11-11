const { Router } = require("express");
const router = Router();
const ProductHandler = require("./controllers/ProductController")
const adminCheck = require("../../utils/middlewares/adminCheck");
const productFieldValidator = require("../../utils/middlewares/fieldValidator");

module.exports = function products(app) {
  app.use("/products", router);

  router.get("/", (req, res) => {
    const allProducts = ProductHandler.getAll();
    if (allProducts && allProducts.length > 0) {
      res.json(allProducts)
    } else {
      res.send("No products found.");
    }
  })

  router.get("/:id", (req, res) => {
      const { id } = req.params;
      const product = ProductHandler.getById(id);
      res.json(product);
  });

  router.post("/", adminCheck, productFieldValidator, (req, res) => {
    const newProduct = ProductHandler.create(req.body)
    res.json(newProduct)
  })

  router.put("/:id", adminCheck, productFieldValidator, (req, res) => {
    const { id } = req.params;
    const editedProduct = ProductHandler.editById(id, req.body)
    res.json(editedProduct);
  });

  router.delete("/:id", adminCheck, (req, res) => {
    const { id } = req.params;
    const deletedProduct = ProductHandler.getById(id);
    ProductHandler.deleteById(id)
    res.json(deletedProduct);
  });
};
