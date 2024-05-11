export function deletarDiv(botao, div, alerta) {
  botao.addEventListener("click", () => {
    div.parentNode.focus() //Foca no elemento pai para não fecha-lo caso tenha fecharOnFocusout e de quebra ainda deleta a div caso ela tenha fecharOnFocusOut
    if (alerta) {
      const resposta = confirm(alerta);
      resposta ? div.remove() : undefined;
    } else {
      div.remove();
    }
  });
}
