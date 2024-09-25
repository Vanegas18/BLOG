import { Router } from "express";
import {
  deletePublicacion,
  getPublicacionById,
  getPublicaciones,
  postPublicacion,
  putPublicacion,
} from "../Controllers/publicaciones.js";

const Publicaciones = Router();

Publicaciones.get("/", getPublicaciones);
Publicaciones.get("/:id", getPublicacionById);
Publicaciones.post("/", postPublicacion);
Publicaciones.put("/:id", putPublicacion);
Publicaciones.delete("/:id", deletePublicacion);

export default Publicaciones;
