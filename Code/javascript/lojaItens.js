import { desativarFecharOnFocusOut, fecharOnFocusOut } from "./utils/focusOut.js";
import { deletarDiv } from "./utils/botaoX.js";
import { carregarDados, carregarInventario, criarPopUp } from "./inventario.js";
import { Item, ListaItens } from "./types/Item.js";

const containerInventario = document.querySelector(".inventario");
const btnBuy = containerInventario.querySelector(".item-add");
let carrinhoLista = [];

btnBuy.addEventListener("click", () => abrirMercado());

//Abrir Mercado
function abrirMercado() {
  carrinhoLista = [];
  const loja = document.createElement("div");
  loja.classList.add("loja");
  loja.innerHTML = `
    <button class="X X-loja"><img src="./assets/Icons/X.png" /></button>
    <div class="cabecalho-loja">
      <p>Itens</p>
      <div class="carrinho"></div>
    </div>
    <hr>
    <div class="mostruario-loja"></div>
    <button class="add">ADICIONAR</button>
    `;
  containerInventario.insertAdjacentElement("beforebegin", loja);
  fecharOnFocusOut(loja);

  deletarDiv(loja.querySelector(".X"), loja);

  abastecerLoja(loja);

  comprarDoCarrinho(loja.querySelector(".add"), loja);
}

async function abastecerLoja(loja) {
  const dados = await carregarDados();
  const mostruario = loja.querySelector(".mostruario-loja");
  const carrinho = loja.querySelector(".carrinho");

  //Cria o produto baseado na MockAPI
  dados.forEach((dado) => {
    const produto = document.createElement("div");
    produto.id = dado.id;
    produto.classList.add("item-loja");
    produto.innerHTML = `
    <img src="${dado.foto}"/>
    <button><img src="./assets/Icons/icon-3points.png"/></button>`;

    mostruario.appendChild(produto);

    produto.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      criarPopUp(produto, false, false, loja);
    });
    adicionarAoCarrinho(produto, carrinho, loja);
  });
}

//Add o item ao carrinho
function adicionarAoCarrinho(item, carrinho, loja) {
  item.addEventListener("click", () => {
    if (carrinhoLista.length < 13) {
      carrinho.appendChild(item.cloneNode(true));
      carrinhoLista.push(item);
      tirarDocarrinho(item.id);
    } else {
      desativarFecharOnFocusOut(loja);
      alert("O carrinho está cheio!");
      //fecharOnFocusOut(loja)
    }
  });
}

// Função que adiciona as compras do carrinho ao inventário
async function comprarDoCarrinho(btnAdd, loja) {
  const dados = await carregarDados();

  btnAdd.addEventListener("click", () => {
    let pesoCarrinho = 0;
    let listaCompra = [];

    for (let i = 0; i < carrinhoLista.length; i++) {
      const produto = carrinhoLista[i];
      const itemApi = dados.find((obj) => obj.id == produto.id);

      listaCompra.push(itemApi);
      pesoCarrinho += parseInt(itemApi.peso);
    }
    const pesoInventarioMaximo = document.querySelector(".capacidade input").value;
    const pesoInventarioAtual = parseInt(document.querySelector(".peso-inventario").innerHTML);

    if (pesoCarrinho + pesoInventarioAtual > pesoInventarioMaximo) {
      alert("Seu inventário não tem capacidade para isso!");
      return;
    }

    listaCompra.forEach((item) => {
      const itemJaExistente = ListaItens.find(
        (itemLista) => itemLista.id == item.id
      );

      if (!itemJaExistente) {
        new Item(item.id, parseInt(item.qnt));
      } else {
        itemJaExistente.aumentarQnt(parseInt(item.qnt));
      }
    });

    carregarInventario();
    loja.remove()
  });
}

//tira a compra do carrinho no DOM e depois na carrinho lista
function tirarDocarrinho(idItem) {
  const carrinho = document.querySelector(".carrinho");
  const listaItemCarrinho = carrinho.querySelectorAll(`#${idItem}`);

  const item = listaItemCarrinho[listaItemCarrinho.length - 1];
  item.addEventListener("click", () => {
    item.remove();

    const index = carrinhoLista.findIndex((produto) => produto.id === item.id);
    if (index != -1) carrinhoLista.splice(index, 1);
  });
}
