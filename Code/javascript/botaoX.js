export function deletarDiv(botao, div, alerta) {
  botao.addEventListener("click", () => {
    if (alerta) {
      const resposta = confirm(alerta);
      resposta ? div.remove() : undefined;
    } else {
      div.remove();
    }
  });
}
