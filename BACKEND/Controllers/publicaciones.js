import Publicaciones from "../Models/publicaciones.js";

export async function getPublicaciones(req, res) {
  try {
    const publicaciones = await Publicaciones.find();
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}

export async function getPublicacionById(req, res) {
  const { id } = req.params;
  try {
    const publicacion = await Publicaciones.findById(id);
    res.status(200).json(publicacion);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}

export async function postPublicacion(req, res) {
  const { titulo, contenido } = req.body;
  try {
    const Publicacion = await new Publicaciones({
      titulo,
      contenido,
    });

    await Publicacion.save();
    res.status(201).json("Publicación creada correctamente");
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}

export async function putPublicacion(req, res) {
  const { id } = req.params;
  const { titulo, contenido } = req.body;
  try {
    const Publicacion = await Publicaciones.findByIdAndUpdate(
      id,
      {
        titulo,
        contenido,
      },
      { new: true }
    );
    if (!Publicacion) {
      return res.status(404).json("Publicación no encontrada");
    }
    res.status(201).json("Publicación actualizada correctamente");
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}

export async function deletePublicacion(req, res) {
  const { id } = req.params;
  try {
    const Publicacion = await Publicaciones.findByIdAndDelete(id);
    if (!Publicacion) {
      return res.status(404).json("Publicación no encontrada");
    }
    res.status(200).json("Publicación eliminada correctamente");
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
}
