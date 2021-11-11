const { Router } = require("express");
const router = new Router();
const products = require("../components/products");
const cart = require("../components/cart");

module.exports = function serverRoutes(app) {
  app.use("/api", router);

  cart(router);
  products(router);

  app.use(function(req, res, next) {
    res.status(404).send(`Ruta ${req.originalUrl} no definida para el método ${req.method}`);
  });
};
