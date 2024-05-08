import { fecharOnFocusOut } from "./utils/focusOut.js";
import { deletarDiv } from "./utils/botaoX.js"

const containerInventario = document.querySelector(".inventario");
const btnBuy = containerInventario.querySelector(".item-add")

btnBuy.addEventListener("click", () => abrirMercado())

//Abrir Mercado
function abrirMercado() {
    const loja = document.createElement("div")
    loja.classList.add("loja")
    loja.innerHTML = `
    <button class="X X-loja"><img src="./assets/Icons/X.png" /></button>
    <div class="cabecalho-loja">
      <p>Itens</p>
      <div class="carrinho"></div>
    </div>
    <hr>
    <div class="mostruario-loja"></div>
    <button class="add">ADICIONAR</button>
    `
    containerInventario.insertAdjacentElement("beforebegin", loja)
    fecharOnFocusOut(loja)
    const botaoX = loja.querySelector(".X")
    deletarDiv(botaoX, loja)
}
