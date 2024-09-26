document.addEventListener("DOMContentLoaded", () => {
  // Función para verificar si el usuario está logueado
  function isLoggedIn() {
    const token = localStorage.getItem("token");
    return token !== null;
  }

  // Función para mostrar usuarios y publicaciones
  function mostrarUsuariosYPublicaciones(publicaciones, usuarios) {
    const divArticles = document.getElementById("publications__main");
    divArticles.innerHTML = "";

    publicaciones.forEach((publicacion) => {
      const usuario = usuarios.find(
        (usuario) => usuario.id === publicacion.idUsuario
      );

      const article = document.createElement("article");
      article.className = "articles__main";

      article.innerHTML = `
        <div class="infoPersonal__articles">
          <img src="./ASSETS/IMG/profile.jpg" alt="" width="70px" class="imagen__infoPersonal">
          <div class="data__infoPersonal">
            <h2 class="name__data">${
              usuario
                ? usuario.nombre + " " + usuario.apellido
                : "Usuario no disponible"
            }</h2>
            <a href="" class="user__data">
              <p>@${usuario ? usuario.usuario : "Usuario no disponible"}</p>
            </a>
          </div>
          <div class="heart">
            <i class="fa-solid fa-heart" style="color: #ff0000;"></i>
            <i class="fa-solid fa-thumbs-down" style="color: #000000;"></i>
          </div>
        </div>
        <hr>
        <div class="infoPublication__articles">
          <h1 class="tittle__infoPublication">${publicacion.titulo}</h1>
          <p class="description__infoPublication">
            ${publicacion.contenido}
          </p>
        </div>
      `;
      divArticles.appendChild(article);
    });
  }

  // Función para manejar el registro de usuarios
  function Registrar(event) {
    event.preventDefault();

    const nombre = document.getElementById("firstName").value;
    const apellido = document.getElementById("lastName").value;
    const usuario = document.getElementById("userName").value;
    const correo = document.getElementById("email").value;
    const fechaNacimiento = document.getElementById("birthDate").value;
    const contraseña = document.getElementById("password").value;
    let valid = true;

    // EXPRESIONES REGULARES
    const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
    const expRegApellido = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
    const expRegUsuario = /^[a-zA-Z0-9]{1,40}$/; // Letras y números, sin espacios.
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

    if (!expRegUsuario.test(usuario)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El usuario no es válido: Solo se permiten letras y números, sin espacios",
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
      const usuarios = {
        nombre,
        apellido,
        usuario,
        correo,
        fechaNacimiento,
        contraseña,
      };

      fetch("/api/Usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarios),
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

  // Función para manejar la publicación de nuevos posts
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

  // Manejo de modales
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

  // Manejo de modales de login y registro
  const registerButton = document.getElementById("registerButton");
  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  const closeLogin = document.querySelector(".closeLogin");
  const closeRegister = document.querySelector(".closeB");
  const openRegisterModal = document.getElementById("openRegisterModal");

  // Cambiar el comportamiento del botón de registrar
  if (isLoggedIn()) {
    registerButton.innerHTML =
      '<i class="fa-solid fa-right-to-bracket" style="color: #000000;"></i> Cerrar Sesión';
    registerButton.addEventListener("click", () => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Estás a punto de cerrar sesión!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          // Eliminar el token del almacenamiento local
          localStorage.removeItem("token");
          Swal.fire("¡Cerrado!", "Tu sesión ha sido cerrada.", "success").then(
            () => {
              // Recargar la página
              window.location.reload();
            }
          );
        }
      });
    });
  } else {
    registerButton.addEventListener("click", () => {
      loginModal.style.display = "block";
    });
  }

  if (closeLogin) {
    // Cerrar modal de iniciar sesión
    closeLogin.addEventListener("click", () => {
      loginModal.style.display = "none";
    });
  }

  if (closeRegister) {
    // Cerrar modal de registro
    closeRegister.addEventListener("click", () => {
      registerModal.style.display = "none";
    });
  }

  if (openRegisterModal) {
    // Abrir modal de registro desde el modal de iniciar sesión
    openRegisterModal.addEventListener("click", (event) => {
      event.preventDefault();
      loginModal.style.display = "none";
      registerModal.style.display = "block";
    });
  }

  // Cerrar los modales al hacer clic fuera de ellos
  window.addEventListener("click", (event) => {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
    if (event.target == registerModal) {
      registerModal.style.display = "none";
    }
  });

  // Manejo del formulario de inicio de sesión
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const correo = document.getElementById("loginEmail").value;
      const contraseña = document.getElementById("loginPassword").value;

      try {
        const response = await fetch("/api/Usuarios/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo, contraseña }),
        });

        const data = await response.json();

        if (response.ok) {
          // Guardar el token en el almacenamiento local
          localStorage.setItem("token", data.token);
          Swal.fire({
            title: "Buen trabajo!",
            text: "Publicación realizada con éxito",
            icon: "success",
          });
          // Redirigir a la página principal o a otra página
          window.location.href = "../../index.html";
        } else {
          alert("Error al iniciar sesión");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión");
      }
    });
  }

  // Fetch para obtener publicaciones y usuarios
  let publicacionesHechas = [];

  fetch("/api/Publicaciones/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener la lista de publicaciones.");
      }
      return response.json();
    })
    .then((data) => {
      publicacionesHechas = data;
      return fetch("/api/Usuarios/");
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener la lista de usuarios.");
      }
      return response.json();
    })
    .then((usuarios) => {
      mostrarUsuariosYPublicaciones(publicacionesHechas, usuarios);
    })
    .catch((error) => console.error("Error cargando datos:", error));

  // Manejo del formulario de registro
  const form = document.getElementById("form");

  if (form) {
    form.addEventListener("submit", Registrar);
  }

  // Manejo del formulario de nueva publicación
  const formPost = document.getElementById("form2");

  if (formPost) {
    formPost.addEventListener("submit", Publicar);
  }
});
