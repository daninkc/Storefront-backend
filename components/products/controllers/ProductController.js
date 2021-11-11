const fs = require("fs");
const path = require("path");

class ProductController {
  constructor() {
    this.absoluteRoute = path.resolve(__dirname, "../data", "products.json");
  }
  create(obj) {
    try {
      const fileExistenceCheck = fs.existsSync(this.absoluteRoute, "utf-8");
      if (fileExistenceCheck) {
        let data = fs.readFileSync(this.absoluteRoute, "utf-8");
        if (data.length === 0) {
          obj.id = 1;
          obj.timestamp = Date.now();
          fs.appendFileSync(this.absoluteRoute, `[${JSON.stringify(obj)}]`);
        }
        data = JSON.parse(data);
        obj.id = data.length + 1;
        obj.timestamp = Date.now();
        data.push(obj);
        fs.writeFileSync(this.absoluteRoute, JSON.stringify(data), "UTF-8");
        return obj;
      }
      obj.id = 1;
      obj.timestamp = Date.now();
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
      ).filter((item) => item.id === +selectedId);
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
  getAll() {
    try {
      const data = JSON.parse(fs.readFileSync(this.absoluteRoute, "UTF-8"));
      return data;
    } catch (error) {
      throw error;
    }
  }
  editById(idToEdit, newItem) {
    try {
      const data = JSON.parse(fs.readFileSync(this.absoluteRoute, "UTF-8"));
      const item = JSON.parse(
        fs.readFileSync(this.absoluteRoute, "UTF-8")
      ).filter((item) => item.id === +idToEdit);
      if (!data || item.length === 0 || !item) {
        const customError = {
          error: "Producto no encontrado",
        };
        return customError;
      } else {
        newItem.id = +idToEdit;
        const { name, description, code, price, stock, imageUrl } = newItem;
        if (name && description && code && price && stock && imageUrl ) {
          console.log('Request made:', newItem)
          data[idToEdit - 1] = newItem;
        }
         fs.writeFileSync(this.absoluteRoute, JSON.stringify(data), "UTF-8");
        return data[idToEdit - 1];
      }
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
      fs.unlink(this.absoluteRoute, () => {});
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductController();
