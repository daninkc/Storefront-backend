const express = require("express");
const { urlencoded } = require("express");
const path = require("path");
const { config } = require("./config");
const ServerRouter = require("./router");
const cors = require("cors");

const app = express();
app.use(cors("*"))

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views", "ejs"));
app.set("view engine", "ejs");

ServerRouter(app);

app.listen(config.port, (req, res, next) => {
  console.log(`App listening in port ${config.port}`);
});
