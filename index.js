const config = require("./config/index");
const express = require("express");
const { connection } = require("./config/database");
const cookie = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
//const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require("express-session");

const productosRouter = require("./router/productos");
const usuariosRouter = require("./router/usuarios");
const authRouter = require("./router/auth");

const app = express();

//settings
app.set("port", config.port || 4000);

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);
app.use(cookie());
app.use(express.json());
app.use(
  session({
    secret: "12345",
    //resave:true,
    //saveUninitialized:true
  })
);
app.use(passport.initialize());
app.use(passport.session());

//connection db
connection().catch((err) => console.log(err));

//Routes
//productos
app.use("/productos", productosRouter);
//usuarios
app.use("/usuarios", usuariosRouter);
//pedidos
app.use("/auth", authRouter);

const server = app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
process.on("unhandledRejection", (err, promise) => {
  console.log("Error", err.message);
  server.close(() => process.exit(1));
});
