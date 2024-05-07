import { fecharOnFocusOut } from "./utils/focusOut.js";

const containerInventario = document.querySelector(".inventario");
const btnBuy = containerInventario.querySelector(".item-add")

btnBuy.addEventListener("click", () => abrirMercado())

//Abrir Mercado
function abrirMercado() {
    const loja = document.createElement("div")
    loja.classList.add("loja")
    loja.innerHTML = ``
    containerInventario.insertAdjacentElement("afterbegin", loja)
    fecharOnFocusOut(loja)
}
