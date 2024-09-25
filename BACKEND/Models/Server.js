import express from "express";
import cors from "cors";
import { dbConnection } from "../Database/config.js";
import "../Database/config.js";
import Usuarios from "../Routes/registroUsuario.js";
import Publicaciones from "../Routes/publicaciones.js";

class Sever {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      usuarios: "/api/Usuarios",
      publicaciones: "/api/Publicaciones",
    };
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("FRONTEND"));
  }

  routes() {
    this.app.use(this.paths.usuarios, Usuarios);
    this.app.use(this.paths.publicaciones, Publicaciones);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export default Sever;
