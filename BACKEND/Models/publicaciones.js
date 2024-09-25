import { model, Schema } from "mongoose";

const publicacionesSchema = new Schema(
  {
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
  },
  { versionKey: false }
);

export default model("Publicaciones", publicacionesSchema);
