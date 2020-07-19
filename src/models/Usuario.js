const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligario"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligario"],
  },
  contraseña: {
    type: String,
    required: [true, "La  contraseña es obligaria"],
  },
  img: {
    type: String,
    required: false,
  },
  gastos: {
    type: [],
    required: false,
  },
  presupuesto: {
    type: Number,
    required: false,
    default : -1
  },
  presupuestoRestante: {
    type: Number,
    required: false,
    default : -1
  },
});

usuarioSchema.methods.toJSON = function() {
    let usuarioThis  = this;
    let usuarioObjeto = usuarioThis.toObject();
    delete usuarioObjeto.contraseña;
    return usuarioObjeto;
};

module.exports = mongoose.model("Usuario", usuarioSchema);
