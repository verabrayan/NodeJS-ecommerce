const {mongoose} = require('../config/database');



const productosSchema = new mongoose.Schema({
    nombre: {type: String,required: true},
    precio: {type: Number,required: true},
    descripcion: {type: String},
    imagePath: {type: String},
    created_at: {type: Date,default: Date.now}
});
module.exports = mongoose.model('productos',productosSchema);