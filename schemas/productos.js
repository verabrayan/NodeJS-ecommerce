const { mongoose } = require("../config/database");
const joi = require('joi')


const productosSchemaJoi = joi.object({
  nombre: joi.string().required().max(20).message('el nombre es requerido y menor a 20'),
  precio: joi.number().required().max(5000).message('precio requerido menor a 5000'),
  descripcion: joi.string().max(100),
  userId: joi.string().required(),
  imagePath: joi.string()
  //created_at: joi.date().default(Date.now)
})
const productosSchema = new mongoose.Schema({
  nombre: { type: String, required: [true,'el nombre es requerido'] },
  precio: { type: Number, required: [true, 'el precio es requerido'] },
  descripcion: { type: String },
  userId:{ type: String , required:true},
  imagePath: { type: String },
  created_at: { type: Date, default: Date.now },
});
const productoModel = mongoose.model("productos", productosSchema);
module.exports = {productoModel,productosSchemaJoi}
