import { fecharOnFocusOut } from "./utils/focusOut.js";
import { deletarDiv } from "./utils/botaoX.js";
import { trocarNoLocalStorage } from "./utils/localStorage.js"

//Cria um pop-up que pede o valor total da barra e o altera (futuramente implementa mais utilidades pra barra)
const ListaBotaoConfig = document.querySelectorAll(".barra button");
ListaBotaoConfig.forEach((botao) =>
  botao.addEventListener("click", () => {
    const barra = botao.parentNode;

    const popUp = document.createElement("div");
    popUp.classList.add("pop-up-barra");
    popUp.innerHTML = `
    <button class="X"><img src="./assets/Icons/X.png" /></button>
    <p>Configurações da barra</p>
    <hr />
    <ul>
      <li>
        <p>Tamanho da barra:</p>

        <input type="number" />
      </li>
      <li><button>OK</button></li>
    </ul>`;
    barra.insertAdjacentElement("afterbegin", popUp);

    fecharOnFocusOut(popUp);

    const botaoX = popUp.querySelector(".X");
    deletarDiv(botaoX, popUp);

    const input = popUp.querySelector("input");
    LimitarInput(input, 3);

    const botaoOK = popUp.querySelector("li button");
    botaoOK.addEventListener("click", () => {
      const spans = barra.querySelectorAll("span");
      const inputValor = input.value;

      if (
        inputValor == 0 ||
        inputValor == null ||
        inputValor.includes(",") ||
        inputValor.includes(".")
      ) {
        popUp.remove();
        return;
      }

      spans.forEach((span) => {
        span.innerHTML = inputValor;
      });
      popUp.remove();
    });
  })
);

//Botões que alteram no valor temporario
const listaComponentesBarra = document.querySelectorAll(".componente-barra");
listaComponentesBarra.forEach((cBarra) => {
  const botoes = cBarra.querySelectorAll(".componente-barra > button");

  botoes.forEach((botao) => {
    const cheia = cBarra.querySelector(".cheia");
    const spanTemporario = cheia.firstChild;

    botao.addEventListener("click", () => {
      const valorAtribuido = parseInt(botao.innerHTML);
      const valorTemporario = parseInt(spanTemporario.innerHTML);

      const novoValor = valorAtribuido + valorTemporario;
      spanTemporario.innerHTML = novoValor;
      
      atualizarCheia(cheia);
    });
  });
});

//Função para nao permitir que o input receba mais de 3 algarismos
function LimitarInput(input, valor) {
  input.addEventListener("input", () => {
    if (input.value.length > valor) {
      input.value = input.value.slice(0, valor);
    }
  });
}

// Fazer largura da .cheia responsiva ao valor do teporario
function atualizarCheia(barra) {
  const span1 = barra.querySelectorAll("span")[0];
  const span2 = barra.querySelectorAll("span")[1];

  let decimal = span1.innerHTML / span2.innerHTML;
  decimal *= 100;

  if (decimal < 0) {
    span1.style.color = ""
    barra.style.width = "0%";
  }
  if (decimal > 100) {
    span1.style.color = "yellow";
    barra.style.width = "100%";
  } else {
    span1.style.color = ""
    barra.style.width = `${decimal}%`;
  }
}

// Salvar no LS
const spans = document.querySelectorAll(".cheia span");
spans.forEach((span, index) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      trocarNoLocalStorage(`barra-span-${index}`, m.target.innerHTML)
    });
  });
  observer.observe(span, {childList: true, subtree: true,});

  span.innerHTML = trocarNoLocalStorage(`barra-span-${index}`)
});


const cheias = document.querySelectorAll(".cheia");
cheias.forEach((cheia) => {
  atualizarCheia(cheia)
})
