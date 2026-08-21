const URLBASE = 'https://api.jikan.moe/v4/anime';
const inpBuscador = document.querySelector('#inp-buscador');
const btn = document.querySelector('.btn-buscador');
const secPorDefecto = document.querySelector('.por-defecto');
const secSinResultado = document.querySelector('.sin-resultados');
const secContenedorResult = document.querySelector('.contenedor-resultados');
const cardsContainer = document.querySelector('.resultados');
const card = document.querySelector('.result-card').cloneNode(true);

let textoABuscar = '';

btn.addEventListener('click', preparaUrl);
inpBuscador.addEventListener('input', e => {
  if (e.target.value === '') {
    mostrarPorDefecto();
  }
});

function preparaUrl() {
  const text = inpBuscador.value.trim();
  if (text.length === 0) {
    alert('Ingrese el anime a buscar');
    inpBuscador.focus()
    return;
  }
  textoABuscar = text;
  const url = new URL(URLBASE);
  url.searchParams.append('q', textoABuscar);
  url.searchParams.append('limit', 12);
  enviarConsulta(url.toString());
}

async function enviarConsulta(url) {
  try {
    const respuestaAPI = await fetch(url);
    const datos = await respuestaAPI.json();
    cargarPagina(datos);
  } catch (error) {
    console.error(error);
    mostrarPorDefecto();
  }
}

function cargarPagina(d) {
  console.log(d);

  if (!d || d.data.length === 0) {
    mostrarSinResultados()
  }
  cardsContainer.innerHTML = '';
  d.data.forEach(a => {
    const newCard = card.cloneNode(true);
    newCard.querySelector('img').src = a.images.jpg.image_url;


    cardsContainer.append(newCard);
  });

  mostrarContenedorResultados();
}

function mostrarContenedorResultados() {
  secPorDefecto.classList.add('oculto');
  secSinResultado.classList.add('oculto');
  secContenedorResult.classList.remove('oculto');
}

function mostrarPorDefecto() {
  secPorDefecto.classList.remove('oculto');
  secSinResultado.classList.add('oculto');
  secContenedorResult.classList.add('oculto');
}

function mostrarSinResultados() {
  secPorDefecto.classList.add('oculto');
  secSinResultado.classList.remove('oculto');
  secContenedorResult.classList.add('oculto');
}