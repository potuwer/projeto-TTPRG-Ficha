import { fecharOnFocusOut } from "./utils/focusOut.js";
import { deletarDiv } from "./utils/botaoX.js";

const containerItensDOM = document.querySelectorAll(".item");
const containerInventario = document.querySelector(".inventario");
const pesoInventario = document.querySelector(".peso-inventario")

//Busca os dados de itens da MockAPI
export async function carregarDados() {
  const resposta = await fetch("../../db.json"); //https://my-json-server.typicode.com/potuwer/projeto-TTPRG-Ficha/itens
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os dados da MockAPI");
  }
  const dados = await resposta.json();
  return dados.itens;
}

import { ListaItens } from "./types/Item.js"; // Pegar do lista do local storage localstorage

//Procura um dado(mockAPI) que tem o mesmo ID que algum da lista(localstorage)
export async function carregarInventario() {
  const dados = await carregarDados();

  //deleta todos os itens ja existentes antes de carregar
  containerItensDOM.forEach((container) => {
    const itemAntigo = container.querySelector("div");
    itemAntigo ? itemAntigo.remove() : undefined;
  });

  ListaItens.forEach((item) => {
    const itemObj = dados.find((dado) => dado.id == item.id);
    pesoInventario.innerHTML =+ parseInt(itemObj.peso * item.qnt);
    itemObj ? criarItemNoInventario(itemObj) : undefined;
  });
}

//Verificador de peso

// Procura um espaço no inventário vazio, cria o html do item baseado no item da API e no LS, e coloca-o no espaço vazio
export function criarItemNoInventario(item) {
  //item = obj do bd
  const novoItem = document.createElement("div");
  novoItem.id = item.id;
  novoItem.innerHTML = `<img src="${item.foto}" alt="${item.nome}" />`;

  const itemLS = ListaItens.find((i) => i.id == item.id);
  itemLS.qnt > 1
    ? novoItem.insertAdjacentHTML(
        "beforeend",
        `<div><span>${itemLS.qnt}x</span></div>`
      )
    : undefined;

  const itemDomVazio = Array.from(containerItensDOM).find(
    (itemDom) => itemDom.innerHTML == ""
  );
  itemDomVazio.appendChild(novoItem);

  // Ação do click no Item
  novoItem.addEventListener("click", () => criarPopUp(novoItem));
}

//Cria o PopUp do item quando clicado
export async function criarPopUp(itemDom, puxarLS = true) {
  const dadosApi = await carregarDados();

  const itemDado = dadosApi.find((dado) => dado.id == itemDom.id);

  let quant = itemDado.qnt;
  let qntMultipla = "";
  if (puxarLS) {
    const itemLocalStorage = ListaItens.find(
      (itemLS) => itemLS.id == itemDom.id
    );
    quant = itemLocalStorage.qnt;
    itemLocalStorage.qnt > 1
      ? (qntMultipla = `(${itemLocalStorage.qnt * itemDado.peso}kg)`)
      : undefined;
  }

  const popUpItem = document.createElement("div");
  popUpItem.classList.add("popUpItem");

  popUpItem.innerHTML = `
  <button class="X"><img src="./assets/Icons/X.png" /></button>      
  <ul class="container1">
    <li>
      <div><img src="${itemDado.foto}" alt="${itemDado.nome}" /></label>
    </li>
    <li>
    <span>Quant:<p id="quant">${quant}</p></span>
    <span>Peso:<p id="peso">${itemDado.peso}kg ${qntMultipla}</p></span>
    </li>
  </ul>
  <div class="container2">
    <p id="nome">${itemDado.nome}</p>
    <span>Descrição:<p id="desc">${itemDado.desc}</p></span>
  </div>
  <button class="remover" style="bottom: 5px; right: 5px;"><img src="./assets/Icons/X.png"><p>REMOVER</p></button>
  <button class="mudar" style="bottom: 5px; right: 150px;"><img src="./assets/Icons/icon-mudar.png"><p>MUDAR</p></button>
  `;

  containerInventario.insertAdjacentElement("beforebegin", popUpItem);

  //fecharOnFocusOut(popUpItem);

  const botaoX = popUpItem.querySelector(".X");
  deletarDiv(botaoX, popUpItem);
}

carregarInventario();
