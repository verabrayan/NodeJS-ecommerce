const { required } = require("joi");
const { mongoose } = require("../config/database");
const Joi = require('joi')

const usuariosSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rol: { type: String },
    provider: { type: String, required:true}
  },
  {
    timestamps: true,
  }
);

const usuarioSchemaJoi = Joi.object({
  name: Joi.string().required().max(100).message('El nombre es requerido y menor a 200 caracteres'),
  email: Joi.string().required().email().max(200).message('El email debe ser valido, es requerido y menor a 200'),
  password: Joi.string().required().min(8).alphanum(),
  rol: Joi.string().optional(),
  provider: Joi.string().required()
  //createdAt: joi.date().timestamps(),
  //updatedAt: joi.date().timestamps()
})
const UsuarioModel = mongoose.model("usuarios", usuariosSchema);
module.exports = {UsuarioModel,usuarioSchemaJoi}
