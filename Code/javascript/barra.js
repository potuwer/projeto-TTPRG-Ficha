const componentesBarra = document.querySelectorAll(".componente-barra");
const configsBarra = document.querySelectorAll(".barra button");

configsBarra.forEach((botao) =>
  botao.addEventListener("click", (e) => {
    const barra = botao.parentNode;

    //Criar um pop up dentro da barra que pede um numero nukm input, e ao clicar em ok ele atribui o valor maximo e valor temporario da barra para isso
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

      spanTemporario.innerHTML = valorAtribuido + valorTemporario;

      atualizarCheia(barra);
    });
  });
});

// Fazer largura da .cheia responsiva ao valor do teporario

function atualizarCheia(barra, valor) {
  const valorTotal = parseInt(barra.lastChild.innerHTML);
  console.log(valorTotal);
}
