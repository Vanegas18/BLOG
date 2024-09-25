import { Router } from "express";
import {
  deleteUsuario,
  getUsuarioById,
  getUsuarios,
  postUsuario,
  putUsuario,
} from "../Controllers/registroUsuario.js";

const Usuarios = Router();

Usuarios.get("/", getUsuarios);
Usuarios.get("/:id", getUsuarioById);
Usuarios.post("/", postUsuario);
Usuarios.put("/:id", putUsuario);
Usuarios.delete("/:id", deleteUsuario);

export default Usuarios;
