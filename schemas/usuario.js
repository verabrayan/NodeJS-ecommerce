const { mongoose } = require("../config/database");

const usuariosSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rol: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("usuarios", usuariosSchema);
