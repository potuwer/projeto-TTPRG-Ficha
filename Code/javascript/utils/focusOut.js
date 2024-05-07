export function fecharOnFocusOut(item) {
  item.setAttribute("tabindex", "0");
  item.focus();
  item.addEventListener("focusout", (e) => {
    if (!item.contains(e.relatedTarget)) {
      item.remove();
    }
  });
}
