import { model, Schema } from "mongoose";

const registroUsuariosSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    contraseña: { type: String, required: true },
  },
  { versionKey: false }
);

export default model("Usuarios", registroUsuariosSchema);
