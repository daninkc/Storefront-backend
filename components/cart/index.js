const { Router } = require("express");
const router = Router();
const ProductHandler = require("../products/controllers/ProductController");
const CartHandler = require("./controllers/CartController");


module.exports = function cart(app) {
  app.use("/cart", router);
  
  router.post("/", (req, res, next) => {
    const newCart = {
      timestamp: Date.now(),
      products: []
    }
    const { id } = CartHandler.create(newCart)
    res.json(id);
  });

  router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    const deletedCart = CartHandler.getById(id);
    CartHandler.deleteById(id)
    res.json(deletedCart);
  });

  router.get("/:id/products", (req, res, next) => {
    const { id } = req.params;
    const { products } = CartHandler.getById(id)
    res.json(products);
  });

  router.post("/:id/products", (req, res, next) => {
    const { id } = req.params;
    const { productId } = req.body
    const product = ProductHandler.getById(productId)
    const cart = CartHandler.addProducts(id, product);
    res.json(cart);
  });

  router.delete("/:id/products/:prod_id", (req, res, next) => {
    const { id, prod_id } = req.params;
    const product = ProductHandler.getById(prod_id)
    const listAfterDeletion = CartHandler.deleteProducts(id, product)
    res.json(listAfterDeletion);
  });
  
};
