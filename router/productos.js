const { Router } = require("express");
const router = Router();
const productos = require("../services/productos");
const {
  verifyToken,
  verifyTokenEditor,
  verifyTokenAdmin,
} = require("../middlewares/authValidation");

const producto = new productos();

router.get("/", verifyTokenAdmin, async (req, res) => {
  const products = await producto.getProducts();
  res.status(200).json(products);
});

router.post("/", verifyTokenEditor, async (req, res) => {
  const newProduct = await producto.createProduct(req.body);
  res.status(201).json(newProduct);
});

router.put("/:id", verifyTokenEditor, async (req, res) => {
  const update = await producto.updateProduct(req.params.id, req.body);
  res.status(200).json(update);
});

router.delete("/:id", verifyTokenEditor, async (req, res) => {
  await producto.deletProduct(req.params.id);
  res.status(200).json("product delete");
});

module.exports = router;
