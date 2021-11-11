require("dotenv").config();

let config = {
  port: process.env.PORT || 8080
};

module.exports = { config };
