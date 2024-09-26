import { model, Schema } from "mongoose";

const registroUsuariosSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    usuario: {
      type: String,
      required: true,
      unique: [true, "El usuario debe ser único"],
    },
    correo: {
      type: String,
      required: true,
      unique: [true, "El correo debe ser único"],
    },
    fechaNacimiento: { type: Date, required: true },
    contraseña: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

export default model("Usuarios", registroUsuariosSchema);
