export function fecharOnFocusOut(item) {
  item.focus();
  item.addEventListener("focusout", (e) => {
    if (!item.contains(e.relatedTarget)) {
      item.remove();
    }
  });
}
