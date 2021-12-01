const btn_iniciar = document.querySelector('.btn-iniciar');
const btn_reiniciar = document.querySelector('.btn-reiniciar');
const elemento_pontuacao = document.querySelectorAll('.pontuacao');
const elemento_tempo = document.querySelector('.tempo');
const elemento_vida = document.querySelector('.vida');

const mosca = document.createElement('img');
mosca.draggable = false;

const largura_maxima = window.innerWidth - 280;
const altura_maxima = window.innerHeight - 280;

let intervalo = null;
let tempo_remocao = null;
const niveis = {
  facil: {
    tempo_maximo: 20,
    velocidade: 1000,
    quantidade_vida: 5
  },
  dificil: {
    tempo_maximo: 30,
    velocidade: 700,
    quantidade_vida: 3
  }
}

function adicionarMosca() {
  mosca.style.left = `${Math.floor(Math.random() * largura_maxima)}px`;
  mosca.style.top = `${Math.floor(Math.random() * altura_maxima)}px`;
  mosca.width = Math.floor(Math.random() * (280 - 120 + 1)) + 120;
  mosca.height = mosca.width

  document.body.appendChild(mosca);
  mosca.src = './images/mosca.png';
  clearTimeout(tempo_remocao);
}

function removerMosca() {
  mosca.remove();
}

let pontuacao = 0;
function atualizarPontuacao(valor) {
  if(valor == 0) {
    pontuacao = 0;
  }

  pontuacao += valor;
  elemento_pontuacao.forEach((elemento) => {
    elemento.textContent = pontuacao;
  });
}

let tempo = 0;
function atualizarTempo(valor) {
  if(valor == 0) {
    tempo = 0;
  }

  tempo += valor;
  elemento_tempo.textContent = tempo;
}

function definirVida(nivel) {
  for (let i = 0; i < niveis[nivel].quantidade_vida; i++) {
    elemento_vida.innerHTML += `<span>❤️<span>`;
  }
}

function iniciar(nivel) {
  document.body.classList.add('jogo-iniciado');
  atualizarPontuacao(0);
  atualizarTempo(0);
  definirVida(nivel)

  intervalo = setInterval(() => {
    atualizarTempo(1);
    removerMosca();
    adicionarMosca();

    if(tempo === niveis[nivel].tempo_maximo) {
      finalizarJogo()
    }
  }, niveis[nivel].velocidade);

}

function finalizarJogo() {
  clearInterval(intervalo);
  removerMosca();
  document.body.classList.remove('jogo-iniciado');
  document.body.classList.add('jogo-finalizado');
}

mosca.addEventListener('click', () => {
  atualizarPontuacao(1);
  mosca.src = './images/ponto-marcado.png';
  tempo_remocao = setTimeout(() => {
    removerMosca();
  }, 300)
});

btn_iniciar.addEventListener('click', ({target}) => {
  const nivel = document.querySelector('input[name="nivel"]:checked').value;
  target.closest('.painel').remove();
  iniciar(nivel);
});
btn_reiniciar.addEventListener('click', () => {
  window.location.reload();
});
document.body.addEventListener('click', (event) => {
  if(!event.target.classList.contains('jogo-iniciado')) return;

  const tag_clicada = event.srcElement.nodeName;
  if(tag_clicada != 'IMG') {
    if(elemento_vida.childNodes.length == 1){
      finalizarJogo()
    }
    elemento_vida.lastChild.remove();
  }
})