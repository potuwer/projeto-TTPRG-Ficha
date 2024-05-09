let focusOutHandler; // Variável para armazenar o manipulador de evento de focusout

export function fecharOnFocusOut(item) {
  item.setAttribute("tabindex", "0");
  item.focus();
  focusOutHandler = remocaoItem(item); // Armazena a função de manipulador de evento
  item.addEventListener("focusout", focusOutHandler);
}

function remocaoItem(item) {
  return (e) => {
    if (!item.contains(e.relatedTarget)) {
      item.remove();
    }
  };
}

export function desativarFecharOnFocusOut(item) {
  item.removeEventListener("focusout", focusOutHandler); // Remove o manipulador de evento armazenado
}