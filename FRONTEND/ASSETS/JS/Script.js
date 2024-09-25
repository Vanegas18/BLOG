//! MODAL PARA NUEVO POST
const modal = document.getElementById("newPostModal");
const btn = document.getElementById("newPostButton");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//! MODAL PARA LOGIN
const registerModal = document.getElementById("registerModal");
const registerBtn = document.getElementById("registerButton");
const closeRegister = document.getElementsByClassName("closeB")[0];

registerBtn.onclick = function () {
  registerModal.style.display = "block";
};

closeRegister.onclick = function () {
  registerModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
};

//! FETCH NUEVO USUARIO
const form = document.getElementById("form");

form.addEventListener("submit", Registrar);

function Registrar(event) {
  event.preventDefault();

  usuariosRegistrados = [];
  const nombre = document.getElementById("firstName").value;
  const apellido = document.getElementById("lastName").value;
  const correo = document.getElementById("email").value;
  const fechaNacimiento = document.getElementById("birthDate").value;
  const contraseña = document.getElementById("password").value;
  let valid = true;

  // EXPRESIONES REGULARES
  const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
  const expRegApellido = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
  const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; // Solo se permiten letras, números, puntos, guiones y guiones bajos
  const expRegFecha = /^\d{4}-\d{2}-\d{2}$/; // Solo se permiten fechas en formato yyyy-mm-dd
  const expRegContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; // Se requiere al menos una letra mayúscula, una letra minúscula, un número y debe tener entre 6 y 12 caracteres.

  // VALIDACIONES
  if (!expRegNombre.test(nombre)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El nombre no es válido: Solo se permiten letras y espacios",
    });
    valid = false;
  }

  if (!expRegApellido.test(apellido)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El apellido no es válido: Solo se permiten letras y espacios",
    });
    valid = false;
  }

  if (!expRegCorreo.test(correo)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El correo no es válido: Solo se permiten letras, números, puntos, guiones y guiones bajos",
    });
    valid = false;
  }

  if (!expRegFecha.test(fechaNacimiento)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La fecha de nacimiento no es válida: Solo se permiten fechas en formato yyyy-mm-dd",
    });
    valid = false;
  }

  if (!expRegContraseña.test(contraseña)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La contraseña no es válida: Se requiere al menos una letra mayúscula, una letra minúscula, un número y debe tener entre 6 y 12 caracteres",
    });
    valid = false;
  }

  if (valid) {
    const usuario = {
      nombre,
      apellido,
      correo,
      fechaNacimiento,
      contraseña,
    };

    fetch("/api/Usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al registrar el usuario.");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          title: "Buen trabajo!",
          text: "Usuario registrado con éxito",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "index.html";
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Algo salió mal!`,
        });
      });
  }
}

//! FETCH PARA NUEVA PUBLICACIÓN
const formPost = document.getElementById("form2");

formPost.addEventListener("submit", Publicar);

function Publicar(event) {
  event.preventDefault();

  const titulo = document.getElementById("postTitle").value;
  const contenido = document.getElementById("postDescription").value;
  let value = true;

  if (contenido === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes completar todos los campos",
    });
    value = false;
  }

  if (value) {
    const publicacion = {
      titulo,
      contenido,
    };

    fetch("/api/Publicaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publicacion),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al publicar la publicación.");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          title: "Buen trabajo!",
          text: "Publicación realizada con éxito",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "index.html";
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Algo salió mal!`,
        });
      });
  }
}
