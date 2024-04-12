//Function que deleta a div pai de uma div: div > div
function deletar(div) {
  const divPai = div.parentNode;
  divPai.remove();
}

//Cria um pop-up que pede o valor total da barra e o altera (futuramente imlementa mais utilidades pra barra)

const componentesBarra = document.querySelectorAll(".componente-barra");
const configsBarra = document.querySelectorAll(".barra button");

configsBarra.forEach((botao) =>
  botao.addEventListener("click", () => {
    const barra = botao.parentNode;

    const popUpHTML = `<div class="pop-up-barra" tabindex="0">
    <button class="X"></button>
    <p>Configurações da barra</p>
    <hr />
    <ul>
      <li>
        <p>Tamanho da barra:</p>

        <input type="number" />
      </li>
      <li><button>OK</button></li>
    </ul>
  </div>`;

    const popUp = document.createElement("div");
    popUp.innerHTML = popUpHTML;
    barra.insertAdjacentElement("afterbegin", popUp);
    const divPopUp = document.querySelector(".pop-up-barra");

    divPopUp.focus();

    fecharOnFocusOut(divPopUp);

    const botoes = document.querySelectorAll(".pop-up-barra button");

    botoes.forEach((botao) => {
      botao.addEventListener("click", () => {
        if (botao.className == "X") {
          deletar(divPopUp);
        } else {
          const spans = barra.querySelectorAll("span");
          const inputValor = divPopUp.querySelector("input").value;

          if (
            inputValor == 0 ||
            inputValor == null ||
            inputValor.includes(",") ||
            inputValor.includes(".")
          )
            return deletar(divPopUp);

          spans.forEach((span) => {
            span.innerHTML = inputValor;
          });
          deletar(divPopUp);
        }
      });
    });
  })
);

//Botões que alteram no valor temporario

componentesBarra.forEach((cBarra) => {
  const botoesSujo = cBarra.querySelectorAll("button");
  const botoes = Array.from(botoesSujo).filter((b) => {
    return b.parentNode === cBarra;
  });

  botoes.forEach((botao) => {
    const barra = cBarra.querySelector(".cheia");
    const spanTemporario = barra.firstChild;
    const spanFinal = barra.lastChild;

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

      atualizarCheia(barra, novoValor, valorTotal);
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

//fechar pop up on focus out

function fecharOnFocusOut(popUp) {
  popUp.addEventListener("focusout", (e) => {
    if (!popUp.contains(e.relatedTarget)) {
      deletar(popUp);
    }
  });
}
