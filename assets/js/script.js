import { contatos, listarUsuarios, mostrarConversa, usuarios } from "./contatos.js";

const elemento = {
  lista_contatos: document.querySelector(".container-mensagens"),
  perfil: document.querySelector(".perfil-usuario"),
  mensagems_perfil: document.querySelector(".contatos"),
  foto_perfil: document.querySelector(".foto-perfil"),
  containerMensagens: document.querySelector(".grid-msg"),
  fotoUsuario: document.querySelector(".foto-usuario img"),
  nomeUsuario: document.querySelector(".nome-usuario"),
  numeroUsuario: document.querySelector(".numero-usuario"),
  containerPerfisSecundarios: document.querySelector(".container_perfis_secundarios"),
};

let usuarioAtual = 0; 

function criarContatos(idContato, nome, hora, previa, naolidas) {
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
    mostrarConversa(usuarioAtual, idContato);
  });
}

function renderizarListaContatos(idUsuario) {
  elemento.lista_contatos.innerHTML = "";

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

function atualizarInfoPerfil(idUsuario) {
  const usuario = usuarios["whats-users"][idUsuario];

  elemento.fotoUsuario.src = `https://i.pravatar.cc/150?img=${idUsuario + 1}`;
  elemento.nomeUsuario.innerText = usuario.nickname || usuario.account;
  elemento.numeroUsuario.innerText = usuario.number;
}

function criarSelecaoPerfis() {
  elemento.containerPerfisSecundarios.innerHTML = "";

  usuarios["whats-users"].forEach((usuario, index) => {
    const cardPerfil = document.createElement("div");
    const avatarPerfil = document.createElement("img");
    const nomePerfil = document.createElement("p");

    cardPerfil.className = "card-perfil-secundario";
    avatarPerfil.className = "avatar-perfil-secundario";
    nomePerfil.className = "nome-perfil-secundario";

    avatarPerfil.src = `https://i.pravatar.cc/150?img=${index + 1}`;
    avatarPerfil.alt = usuario.nickname;
    nomePerfil.innerText = usuario.nickname;

    if (index === usuarioAtual) {
      cardPerfil.classList.add("ativo");
    }

    cardPerfil.addEventListener("click", () => {
      trocarPerfil(index);
    });

    cardPerfil.append(avatarPerfil, nomePerfil);
    elemento.containerPerfisSecundarios.append(cardPerfil);
  });
}

function trocarPerfil(idUsuario) {
  usuarioAtual = idUsuario;

  atualizarInfoPerfil(idUsuario);
  renderizarListaContatos(idUsuario);
  criarSelecaoPerfis()
  mostrarConversa(idUsuario, 0);
}

function mostarPerfil() {
  elemento.foto_perfil.addEventListener("click", (evento) => {
    evento.preventDefault();
    elemento.mensagems_perfil.classList.toggle("ocultar");
    elemento.perfil.classList.toggle("ocultar");
  });
}

mostarPerfil();
listarUsuarios();
atualizarInfoPerfil(usuarioAtual);
renderizarListaContatos(usuarioAtual);
criarSelecaoPerfis();
mostrarConversa(usuarioAtual, 0);