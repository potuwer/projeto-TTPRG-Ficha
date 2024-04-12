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
