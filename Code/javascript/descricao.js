import { trocarNoLocalStorage } from "./utils/localStorage.js"

const botaoDescricao = document.querySelector(".container-descricao button");
const descricao = document.querySelector(".texto");
const notas = document.querySelector(".notas");

botaoDescricao.style.backgroundImage = "url(./assets/Icons/icon-notes.png)";
let toogle = true;

botaoDescricao.addEventListener("click", () => {
  notas.classList.toggle("none");
  descricao.classList.toggle("none");

  if (toogle) {
    botaoDescricao.style.backgroundImage = "url(./assets/Icons/icon-livro.png)";
    toogle = false;
  } else {
    botaoDescricao.style.backgroundImage = "url(./assets/Icons/icon-notes.png)";
    toogle = true;
  }
});

// Salvar no LS Descrição
descricao.innerHTML = trocarNoLocalStorage("descricao");
descricao.addEventListener("focusout", () =>
  trocarNoLocalStorage("descricao", descricao.innerHTML)
);

// Salvar no LS Notas
notas.innerHTML = trocarNoLocalStorage("notas");
notas.addEventListener("focusout", () =>
  trocarNoLocalStorage("notas", notas.innerHTML)
);
