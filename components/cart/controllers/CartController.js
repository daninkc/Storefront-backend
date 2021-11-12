const fs = require("fs");
const path = require("path");
const ProductHandler = require("../../products/controllers/ProductController");

class Cart {
  constructor() {
    this.absoluteRoute = path.resolve(__dirname, "../data", "cart.json");
  }
  create(obj) {
    try {
      const fileExistenceCheck = fs.existsSync(this.absoluteRoute, "utf-8");
      if (fileExistenceCheck) {
        let data = fs.readFileSync(this.absoluteRoute, "utf-8");
        if (data.length === 0) {
          obj.id = 1;
          fs.appendFileSync(this.absoluteRoute, `[${JSON.stringify(obj)}]`);
        }
        data = JSON.parse(data);
        obj.id = data[data.length - 1].id + 1;
        data.push(obj);
        fs.writeFileSync(this.absoluteRoute, JSON.stringify(data), "UTF-8");
        return obj;
      }
      obj.id = 1;
      fs.writeFileSync(this.absoluteRoute, `[${JSON.stringify(obj)}]`, "UTF-8");
      return obj;
    } catch (error) {
      throw error;
    }
  }
  getById(selectedId) {
    try {
      const data = JSON.parse(
        fs.readFileSync(this.absoluteRoute, "UTF-8")
      ).find((item) => item.id === +selectedId);
      if (data.length === 0) {
        const customError = {
          error: "Producto no encontrado",
        };
        return customError;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
  addProducts(cartId, product) {
    try {
      const data = JSON.parse(fs.readFileSync(this.absoluteRoute, "UTF-8"));
      const item = JSON.parse(
        fs.readFileSync(this.absoluteRoute, "UTF-8")
      ).find((item) => item.id === +cartId);
      if (item.length === 0) {
        const customError = {
          error: "Carrito no encontrado",
        };
        return customError;
      }
      if (product && product.length > 0) {
        const { products } = item;
        products.push(product[0])
        data[cartId - 1] = item;
        fs.writeFileSync(this.absoluteRoute, JSON.stringify(data), "UTF-8");
        return data[cartId - 1];
      }

    } catch (error) {
      throw error;
    }
  }
  deleteProducts(cartId, product) {
    try {
      const data = JSON.parse(fs.readFileSync(this.absoluteRoute, "UTF-8"));  //Todos los carritos
      const item = JSON.parse(
        fs.readFileSync(this.absoluteRoute, "UTF-8")
      ).find((item) => item.id === +cartId);   //Mi carrito
      if (item.length === 0) {
        const customError = {
          error: "Carrito no encontrado",
        };
        return customError;
      }
      const { products } = item;

      const matchingProduct = products.findIndex((item) => item.id === product[0].id);

      const myfilter = data[cartId - 1].products.filter((item, index) => index !== matchingProduct)

      data[cartId - 1].products = myfilter;
      
      fs.writeFileSync(this.absoluteRoute, JSON.stringify(data), "UTF-8");
      return data[cartId - 1].products;

    } catch (error) {
      throw error;
    }
  }
  getAll() {
    try {
      const data = JSON.parse(fs.readFileSync(this.absoluteRoute, "UTF-8"));
      return data;
    } catch (error) {
      throw error;
    }
  }
  deleteById(idToDelete) {
    try {
      const content = this.getAll().filter((item) => item.id !== +idToDelete);
      fs.writeFileSync(this.absoluteRoute, JSON.stringify(content), "UTF-8");
      return content;
    } catch (error) {
      throw error;
    }
  }
  deleteAll() {
    try {
      fs.unlink(this.absoluteRoute, () => { });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Cart();