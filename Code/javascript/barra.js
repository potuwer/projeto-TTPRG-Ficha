//Cria um pop-up que pede o valor total da barra e o altera (futuramente imlementa mais utilidades pra barra)

const componentesBarra = document.querySelectorAll(".componente-barra");
const configsBarra = document.querySelectorAll(".barra button");

configsBarra.forEach((botao) =>
  botao.addEventListener("click", (e) => {
    const barra = botao.parentNode;
    
    const popUp =  
})
);

//Botões que alteram no valor temporario

componentesBarra.forEach((cBarra) => {
  const botoesSujo = cBarra.querySelectorAll("button");
  const botoes = Array.from(botoesSujo).filter((b) => {
    return b.parentNode === cBarra;
  });

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const barra = cBarra.querySelector(".cheia");
      const spanTemporario = barra.firstChild;

      const valorAtribuido = parseInt(botao.innerHTML);
      const valorTemporario = parseInt(spanTemporario.innerHTML);

      const novoValor = valorAtribuido + valorTemporario;
      spanTemporario.innerHTML = novoValor;

      atualizarCheia(barra, novoValor);
    });
  });
});

// Fazer largura da .cheia responsiva ao valor do teporario

function atualizarCheia(barra, valor) {
  const valorTotal = parseInt(barra.lastChild.innerHTML);

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
