import { model, Schema } from "mongoose";

const publicacionesSchema = new Schema(
  {
    titulo: { type: String, required: false },
    contenido: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

export default model("Publicaciones", publicacionesSchema);
