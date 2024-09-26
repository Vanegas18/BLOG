import Usuarios from "../Models/registroUsuario.js";
import bcrypt from "bcrypt";

export async function getUsuarios(req, res) {
  try {
    const usuarios = await Usuarios.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}

export async function getUsuarioById(req, res) {
  const { id } = req.params;
  try {
    const usuario = await Usuarios.findById(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}

export async function postUsuario(req, res) {
  const { nombre, apellido, usuario, correo, fechaNacimiento, contraseña } =
    req.body;
  try {
    const Usuario = await new Usuarios({
      nombre,
      apellido,
      usuario,
      correo,
      fechaNacimiento,
      contraseña,
    });

    Usuario.contraseña = await bcrypt.hash(contraseña, 5);
    await Usuario.save();
    res.status(201).json("Usuario creado correctamente");
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}

export async function putUsuario(req, res) {
  const { id } = req.params;
  const { nombre, apellido, correo, fechaNacimiento, contraseña } = req.body;
  try {
    const Usuario = await Usuarios.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        correo,
        fechaNacimiento,
        contraseña,
      },
      { new: true }
    );
    if (!Usuario) {
      return res.status(404).json("Usuario no encontrado");
    }
    res.status(201).json("Usuario actualizado correctamente");
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}

export async function deleteUsuario(req, res) {
  const { id } = req.params;
  try {
    const Usuario = await Usuarios.findByIdAndDelete(id);
    if (!Usuario) {
      return res.status(404).json("Usuario no encontrado");
    }
    res.status(200).json("Usuario eliminado correctamente");
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}
