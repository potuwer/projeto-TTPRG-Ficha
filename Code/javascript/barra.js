import { fecharOnFocusOut } from "./focusOut.js";

//Cria um pop-up que pede o valor total da barra e o altera (futuramente imlementa mais utilidades pra barra)
const ListaBotaoConfig = document.querySelectorAll(".barra button");

ListaBotaoConfig.forEach((botao) =>
  botao.addEventListener("click", () => {
    const barra = botao.parentNode;

    const popUp = document.createElement("div");
    popUp.classList.add("pop-up-barra");
    popUp.setAttribute("tabindex", "0");
    popUp.innerHTML = `
    <button class="X"></button>
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

    const botoesPopUp = popUp.querySelectorAll("button");

    botoesPopUp.forEach((botao) => {
      botao.addEventListener("click", () => {
        if (botao.className == "X") {
          popUp.remove();
          return;
        } else {
          const spans = barra.querySelectorAll("span");
          const inputValor = popUp.querySelector("input").value;

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
        }
      });
    });
  })
);

//Botões que alteram no valor temporario
const listaComponentesBarra = document.querySelectorAll(".componente-barra");

listaComponentesBarra.forEach((cBarra) => {
  const botoesSujo = cBarra.querySelectorAll("button");
  const botoes = Array.from(botoesSujo).filter((b) => {
    return b.parentNode === cBarra;
  });

  botoes.forEach((botao) => {
    const cheia = cBarra.querySelector(".cheia");
    const spanTemporario = cheia.firstChild;
    const spanFinal = cheia.lastChild;

    botao.addEventListener("click", () => {
      const valorMaximo = parseInt(spanFinal.innerHTML);
      const valorAtribuido = parseInt(botao.innerHTML);
      const valorTemporario = parseInt(spanTemporario.innerHTML);
      const valorTotal = parseInt(spanFinal.innerHTML);

      const novoValor = valorAtribuido + valorTemporario;
      spanTemporario.innerHTML = novoValor;
      if (novoValor > valorMaximo) {
        spanTemporario.style.color = "yellow";
      } else {
        spanTemporario.style.color = "";
      }

      atualizarCheia(cheia, novoValor, valorTotal);
    });
  });
});

// Fazer largura da .cheia responsiva ao valor do teporario

function atualizarCheia(barra, valor, valorTotal) {
  let decimal = valor / valorTotal;
  decimal *= 100;

  if (decimal < 0) {
    barra.style.width = "0%";
  }
  if (decimal > 100) {
    barra.style.width = "100%";
  } else {
    barra.style.width = `${decimal}%`;
  }
}
