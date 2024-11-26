document.addEventListener("DOMContentLoaded", () => {
  cargarPeliculas("watchlist");
  cargarPeliculas("vistas");
  mostrarPeliculasPredefinidas();
});

const peliculasPredefinidas = [
  {
    titulo: "El señor de los anillos: las dos torres",
    año: 2001,
    genero: "Fantasía",
    puntaje: 10,
    img: "/Imagenes/Señor de los anillos.jpg",
  },
  {
    titulo: "Matrix",
    año: 1997,
    genero: "Accion/Ciencia Ficcion",
    puntaje: 10,
    img: "/Imagenes/matrix.jpg",
  },
  {
    titulo: "Terminator 2",
    año: 1994,
    genero: "Accion/Ciencia Ficcion",
    puntaje: 10,
    img: "/Imagenes/Terminator2.jpg",
  },
  {
    titulo: "Batman: El Caballero de la Noche",
    año: 2008,
    genero: "Accion/Crimen",
    puntaje: 10,
    img: "/Imagenes/batman.jpg",
  },
];

function mostrarPeliculasPredefinidas() {
  const contenedor = document.getElementById("cineFanCards");

  peliculasPredefinidas.forEach((pelicula) => {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center";

    const contenido = `
            <div class="card mb-4">
                <img src="${pelicula.img}" class="card-img-top" alt="${pelicula.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${pelicula.titulo}</h5>
                    <p class="card-text"><span class="text-primary">Año:</span> ${pelicula.año}</p>
                    <p class="card-text"><span class="text-danger">Género:</span> ${pelicula.genero}</p>
                    <p class="card-text"><span class="text-success">Puntaje:</span> ${pelicula.puntaje}</p>
                    <button class="btn btn-primary btn-sm ver-mas-tarde">Ver más tarde</button>
                    <button class="btn btn-success btn-sm vista">Vista</button>
                </div>
            </div>
        `;

    col.innerHTML = contenido;

    col
      .querySelector(".ver-mas-tarde")
      .addEventListener("click", () => confirmarVerMasTarde(pelicula));
    col
      .querySelector(".vista")
      .addEventListener("click", () => marcarComoVista(pelicula));

    contenedor.appendChild(col);
  });
}

function confirmarVerMasTarde(pelicula) {
  peliculaSeleccionada = pelicula;
  document.getElementById("modalPeliculaTitulo").textContent = pelicula.titulo;
  const modal = new bootstrap.Modal(
    document.getElementById("verMasTardeModal")
  );
  modal.show();
}

document
  .getElementById("confirmarVerMasTardeBtn")
  .addEventListener("click", () => {
    if (peliculaSeleccionada) {
      guardarPelicula("watchlist", peliculaSeleccionada);
      mostrarPelicula("watchlist", peliculaSeleccionada);
    }
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("verMasTardeModal")
    );
    modal.hide();
  });

function marcarComoVista(pelicula) {
  const fecha = prompt("Ingrese la fecha de visualización (DD/MM/AAAA):");
  const fechaValida = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!fecha || !fechaValida.test(fecha)) {
    alert("La fecha ingresada no es válida.");
    return;
  }

  const puntaje = prompt("Ingrese el puntaje (1-10):");
  const puntajeNumero = parseInt(puntaje, 10);

  if (
    !puntaje ||
    isNaN(puntajeNumero) ||
    puntajeNumero < 1 ||
    puntajeNumero > 10
  ) {
    alert("Por favor, ingrese un puntaje válido entre 1 y 10.");
    return;
  }

  const peliculaVista = {
    titulo: pelicula.titulo,
    fecha: fecha,
    puntaje: puntaje,
  };
  guardarPelicula("vistas", peliculaVista);
  mostrarPelicula("vistas", peliculaVista);
}

function mostrarModal(lista) {
  const modalFormulario = new bootstrap.Modal(
    document.getElementById("modalFormulario")
  );
  const modalLabel = document.getElementById("modalLabel");
  const extraCampos = document.getElementById("extraCampos");

  document.getElementById("formularioPelicula").reset();
  extraCampos.innerHTML = "";

  if (lista === "watchlist") {
    modalLabel.textContent = "Agregar Película a Watchlist";
    extraCampos.innerHTML = `
            <div class="mb-3">
                <label for="año" class="form-label">Año</label>
                <input type="number" class="form-control" id="año" required>
            </div>
            <div class="mb-3">
                <label for="genero" class="form-label">Género</label>
                <input type="text" class="form-control" id="genero" required>
            </div>
        `;
  } else if (lista === "vistas") {
    modalLabel.textContent = "Agregar Película a Vistas";
    extraCampos.innerHTML = `
            <div class="mb-3">
                <label for="fecha" class="form-label">Fecha de visualización</label>
                <input type="date" class="form-control" id="fecha" required>
            </div>
            <div class="mb-3">
                <label for="puntaje" class="form-label">Puntaje (1-10)</label>
                <input type="number" class="form-control" id="puntaje" min="1" max="10" required>
            </div>
        `;
  }

  document.getElementById("guardarPeliculaBtn").onclick = () =>
    guardarPeliculaDesdeModal(lista);
  modalFormulario.show();
}

function guardarPeliculaDesdeModal(lista) {
  const titulo = document.getElementById("titulo").value.trim();
  if (!titulo) return alert("El título es obligatorio.");

  let pelicula = { titulo };

  if (lista === "watchlist") {
    const año = document.getElementById("año").value.trim();
    const genero = document.getElementById("genero").value.trim();
    if (!año || !genero) return alert("Todos los campos son obligatorios.");
    pelicula.año = año;
    pelicula.genero = genero;
  } else if (lista === "vistas") {
    const fecha = document.getElementById("fecha").value.trim();
    const puntaje = document.getElementById("puntaje").value.trim();
    const fechaValida = /^\d{4}-\d{2}-\d{2}$/;

    if (!fecha || !fechaValida.test(fecha)) {
      alert("La fecha ingresada no es válida.");
      return;
    }

    const puntajeNumero = parseInt(puntaje, 10);
    if (
      !puntaje ||
      isNaN(puntajeNumero) ||
      puntajeNumero < 1 ||
      puntajeNumero > 10
    ) {
      alert("Por favor, ingrese un puntaje válido entre 1 y 10.");
      return;
    }
    if (!fecha || !puntaje) return alert("Todos los campos son obligatorios.");
    pelicula.fecha = fecha;
    pelicula.puntaje = puntaje;
  }

  guardarPelicula(lista, pelicula);
  mostrarPelicula(lista, pelicula);

  const modalFormulario = bootstrap.Modal.getInstance(
    document.getElementById("modalFormulario")
  );
  modalFormulario.hide();
}

function guardarPelicula(lista, pelicula) {
  const peliculas = JSON.parse(localStorage.getItem(lista)) || [];
  peliculas.push(pelicula);
  localStorage.setItem(lista, JSON.stringify(peliculas));
}

function cargarPeliculas(lista) {
  const peliculas = JSON.parse(localStorage.getItem(lista)) || [];
  peliculas.forEach((pelicula) => mostrarPelicula(lista, pelicula));
}

function mostrarPelicula(lista, pelicula) {
  const contenedor = document.getElementById(`${lista}Cards`);
  const col = document.createElement("div");
  col.className = "col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center";

  let contenido = `
        <div class="card mb-4">
            <div class="card-body">
                <img src="/Imagenes/peliculagenerica.jfif" class="card-img-top" alt="pelicula generica">
                <h5 class="card-title">${pelicula.titulo}</h5>
    `;

  if (lista === "watchlist") {
    contenido += `<p class="card-text">Año: ${pelicula.año}</p><p class="card-text">Género: ${pelicula.genero}</p>`;
  } else if (lista === "vistas") {
    contenido += `<p class="card-text">Fecha: ${pelicula.fecha}</p><p class="card-text">Puntaje: ${pelicula.puntaje}</p>`;
  }

  contenido += `<button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button></div></div>`;
  col.innerHTML = contenido;

  col
    .querySelector(".eliminar-btn")
    .addEventListener("click", () => abrirModalEliminar(lista, pelicula, col));

  contenedor.appendChild(col);
}

function abrirModalEliminar(lista, pelicula, tarjeta) {
  peliculaAEliminar = { lista, pelicula };
  tarjetaAEliminar = tarjeta;

  const modal = new bootstrap.Modal(
    document.getElementById("confirmarEliminacionModal")
  );
  modal.show();
}

document
  .getElementById("confirmarEliminarBtn")
  .addEventListener("click", () => {
    if (peliculaAEliminar && tarjetaAEliminar) {
      const { lista, pelicula } = peliculaAEliminar;

      tarjetaAEliminar.remove();

      const peliculas = JSON.parse(localStorage.getItem(lista)) || [];
      const index = peliculas.findIndex(
        (p) => JSON.stringify(p) === JSON.stringify(pelicula)
      );
      if (index !== -1) {
        peliculas.splice(index, 1);
        localStorage.setItem(lista, JSON.stringify(peliculas));
      }

      peliculaAEliminar = null;
      tarjetaAEliminar = null;

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("confirmarEliminacionModal")
      );
      modal.hide();
    }
  });
