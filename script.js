
const fonemas = [
  { nombre: "a", frente: "img/fonema-a-front.png", reverso: "img/fonema-a-back.png" },
  { nombre: "b", frente: "img/fonema-b-front.png", reverso: "img/fonema-b-back.png" },
  { nombre: "c", frente: "img/fonema-a-front.png", reverso: "img/fonema-a-back.png" },
  { nombre: "d", frente: "img/fonema-b-front.png", reverso: "img/fonema-b-back.png" },
  { nombre: "e", frente: "img/fonema-a-front.png", reverso: "img/fonema-a-back.png" },
  { nombre: "f", frente: "img/fonema-b-front.png", reverso: "img/fonema-b-back.png" },
  { nombre: "g", frente: "img/fonema-a-front.png", reverso: "img/fonema-a-back.png" },
  { nombre: "h", frente: "img/fonema-b-front.png", reverso: "img/fonema-b-back.png" },
  { nombre: "i", frente: "img/fonema-a-front.png", reverso: "img/fonema-a-back.png" },
  { nombre: "j", frente: "img/fonema-b-front.png", reverso: "img/fonema-b-back.png" }
];

const container = document.getElementById('cards-container');
const search = document.getElementById('search');
const pagination = document.getElementById('pagination');

const porPagina = 2;
let paginaActual = 1;

function crearTarjeta(fonema) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="\${fonema.frente}" alt="\${fonema.nombre} frente" />
        <button>Ver reverso</button>
      </div>
      <div class="card-back">
        <img src="\${fonema.reverso}" alt="\${fonema.nombre} reverso" />
        <button>Ver frente</button>
      </div>
    </div>
  `;
  const btns = card.querySelectorAll('button');
  btns[0].addEventListener('click', () => card.classList.add('flipped'));
  btns[1].addEventListener('click', () => card.classList.remove('flipped'));
  return card;
}

function mostrarFonemas(filtro = '', pagina = 1) {
  const filtrados = fonemas.filter(f => f.nombre.toLowerCase().includes(filtro.toLowerCase()));
  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;

  container.innerHTML = '';
  filtrados.slice(inicio, fin).forEach(fonema => {
    container.appendChild(crearTarjeta(fonema));
  });

  // Paginación
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.disabled = i === pagina;
    btn.addEventListener('click', () => {
      paginaActual = i;
      mostrarFonemas(search.value, i);
    });
    pagination.appendChild(btn);
  }
}

search.addEventListener('input', e => {
  paginaActual = 1;
  mostrarFonemas(e.target.value, paginaActual);
});

mostrarFonemas();
