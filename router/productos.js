const { Router } = require("express");
const router = Router();
const productos = require("../services/productos");
const {
  verifyToken,
  verifyTokenEditor,
  verifyTokenAdmin,
} = require("../middlewares/authValidation");

const producto = new productos();

router.get("/", verifyTokenEditor, async (req, res) => {
  const products = await producto.getProducts(req.Usuario.id);
  res.status(200).json(products);
});

router.post("/", verifyTokenEditor, async (req, res) => {
  const newProduct = await producto.createProduct({...req.body,userId:req.Usuario.id});
  res.status(newProduct.success?201:400).json(newProduct);

});

router.put("/:id", verifyTokenEditor, async (req, res) => {
  const flag = await producto.validateId(req.Usuario.id,req.params.id)
  if (flag){
    const update = await producto.updateProduct(req.params.id,req.body);
    return res.status(200).json(update);
  }
  return res.status(400).json({message:'No tiene permitido modificar este producto'});

});

router.delete("/:id", verifyTokenEditor, async (req, res) => {
  const flag = await producto.validateId(req.Usuario.id,req.params.id)
  if (flag){ 
    await producto.deletProduct(req.params.id);
    return res.status(200).json("product delete");
  }
  return res.status(400).json({message:'No tiene permitido eliminar este producto'});
});

module.exports = router;
