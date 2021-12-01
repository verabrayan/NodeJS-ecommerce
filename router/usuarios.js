const { Router } = require("express");
const router = Router();
const usuarios = require("../services/usuarios");

const usuario = new usuarios();

router.get("/", async (req, res) => {
  const persona = await usuario.getUsuarios();
  res.status(200).json(persona);
});

router.post("/", async (req, res) => {
  const nuevaPersona = await usuario.createUsuario(req.body);
  res.status(201).json(nuevaPersona);
});

router.put("/:id", async (req, res) => {
  const update = await usuario.updateUsuario(req.params.id, req.body);
  res.status(200).json(update);
});

router.delete("/:id", async (req, res) => {
  await usuario.deletUsuario(req.params.id);
  res.status(200).json("product delete");
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
