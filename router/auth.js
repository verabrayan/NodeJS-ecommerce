const { Router } = require("express");
const { required } = require("joi");
const config = require('../config/index')
const router = Router();
const { verifyTokenAdmin } = require("../middlewares/authValidation");

const Auth = require("../services/auth");
const authService = new Auth();

const Provider =require('../services/passport')
const providerService = new Provider()

router.get("/google",providerService.authGoogle())

router.get('/google/callback', async (req,res)=>{
  const result = await providerService.authGoogleCallback(req,res)
  res.status(result.success?201:400).json(result)
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //console.log(email)
  const result = await authService.login(email, password);
  //res.status(200).json()
  if (result.success) {
    return res
      .cookie("token", result.token, { httpOnly: true })
      .status(200)
      .json({ name: result.usuario.name });
  }
  return res.status(404).json(result);
});

router.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;
  const rol = config.rol
  const result = await authService.registro(email, password, name,rol);
  //res.status(200).json()
  return res.status(result.success?201:400).json(result)
});

router.put("/cambiar_rol/:id", verifyTokenAdmin, async (req, res) => {
  const { rol } = req.body;
  const { id } = req.params;
  const result = await authService.cambiarRol(id, rol);
  //res.status(200).json()
  if (result.success) {
    return res.status(200).json({ name: result.usuario.name });
  }

  return res.status(400).json(result);
});

module.exports = router;
