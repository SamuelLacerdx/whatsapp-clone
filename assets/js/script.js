import { contatos, listarUsuarios, mostrarConversa } from "./contatos.js";

const elemento = {
  lista_contatos: document.querySelector(".container-mensagens"),
  perfil: document.querySelector(".perfil-usuario"),
  mensagems_perfil: document.querySelector(".contatos"),
  foto_perfil: document.querySelector(".foto-perfil"),
  containerMensagens: document.querySelector(".grid-msg"),
};

function criarContatos(idContato, nome, hora, previa, naolidas) {
  // criação dos elementos do card contatos
  const cardContato = document.createElement("div");
  const fotoContato = document.createElement("img");
  const nomeContato = document.createElement("p");
  const horaMsg = document.createElement("p");
  const previaMsg = document.createElement("p");
  const msgNaoLidas = document.createElement("p");

  cardContato.className = "card-mensagem";
  fotoContato.className = "foto-contato";
  nomeContato.className = "nome-contato";
  horaMsg.className = "horario-mensagem";
  previaMsg.className = "previa-mensagem";
  msgNaoLidas.className = "bola-mensagem";

  fotoContato.src = `https://i.pravatar.cc/150?img=${idContato + 1}`;
  nomeContato.innerText = nome;
  horaMsg.innerText = hora;
  previaMsg.innerText = previa;
  msgNaoLidas.innerText = naolidas;

  cardContato.id = idContato;

  cardContato.append(fotoContato, nomeContato, horaMsg, previaMsg, msgNaoLidas);

  elemento.lista_contatos.append(cardContato);

  cardContato.addEventListener("click", () => {
    mostrarConversa(0, idContato);
  });
}

function renderizarListaContatos(idUsuario) {
  elemento.lista_contatos.innerHTML = ""; // limpa a lista antes de recriar

  contatos(idUsuario).forEach((element, index) => {
    const mensagensRecebidas = element.messages.filter(
      (msg) => msg.sender !== "me"
    ).length;

    criarContatos(
      index,
      element.name,
      element.messages.at(-1).time,
      element.messages.at(-1).content,
      mensagensRecebidas
    );
  });
}

renderizarListaContatos(0);
mostrarConversa(0, 0);

// aparecer e desaparecer perfil
function mostarPerfil() {
  elemento.foto_perfil.addEventListener("click", (evento) => {
    evento.preventDefault();
    elemento.mensagems_perfil.classList.toggle("ocultar");
    elemento.perfil.classList.toggle("ocultar");
  });
}
mostarPerfil();