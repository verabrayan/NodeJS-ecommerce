const { Router } = require("express");
const router = Router();
const usuarios = require("../services/usuarios");
const { verifyTokenEditor, verifyTokenAdmin } = require("../middlewares/authValidation");

const usuario = new usuarios();

router.get("/",verifyTokenAdmin, async (req, res) => {
  const persona = await usuario.getUsuarios();
  res.status(200).json(persona);
});

router.post("/",verifyTokenAdmin, async (req, res) => {
  const nuevaPersona = await usuario.createUsuario(req.body);
  res.status(201).json(nuevaPersona);
});

router.put("/:id",verifyTokenEditor, async (req, res) => {
  const flag = await usuario.validateId(req.Usuario.id,req.params.id)
  if (flag){
    const update = await usuario.updateUsuario(req.params.id, req.body);
    return res.status(200).json(update);
  }
  return res.status(400).json({message:'No tiene permitido modificar este usuario'});
});

router.delete("/:id",verifyTokenEditor, async (req, res) => {
  const flag = await usuario.validateId(req.Usuario.id,req.params.id)
  if (flag){
    await usuario.deletUsuario(req.params.id);
    return res.status(200).json("product delete");
  }
  return res.status(400).json({message:'No tiene permitido eliminar este usuario'});

});

// router.post('/login',async(req,res)=>{
//     const {name,password,email}= req.body
//     const result= await usuario.login(email,password,name)
//     //if(result.success){
//         res.cookie("token",result.token,{httpOnly:true})
//         .status(201)
//         .json({nombre:result.Usuario.name})
//     //}
//     //return res.status(404).json(result)
// })

module.exports = router;
