const config = require("./config/index");
const express = require("express");
const productosRouter = require("./router/productos");
const usuariosRouter = require("./router/usuarios");
const authRouter = require("./router/auth");
const { connection } = require("./config/database");
const cookie = require("cookie-parser");
const { verifyTokenAdmin } = require("./middlewares/authValidation");
const app = express();

//settings
app.set("port", config.port || 4000);

//middlewares
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: false }));

//connection db
connection().catch((err) => console.log(err));

//Routes
//productos
app.use("/productos", productosRouter);
//usuarios
app.use("/usuarios", verifyTokenAdmin, usuariosRouter);
//pedidos
app.use("/auth", authRouter);

const server = app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
process.on("unhandledRejection", (err, promise) => {
  console.log("Error", err.message);
  server.close(() => process.exit(1));
});
