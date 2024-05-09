import { fecharOnFocusOut } from "./utils/focusOut.js";
import { deletarDiv } from "./utils/botaoX.js";
import { trocarInventario } from "./armadura.js";

const containerItensDOM = document.querySelectorAll(".item");
const containerInventario = document.querySelector(".inventario");
const containerArmadurasDOM = document.querySelectorAll(".itens-armadura .item");
const pesoInventario = document.querySelector(".peso-inventario");

export let verificadorInvOuArm = undefined;

//Busca os dados de itens da MockAPI
export async function carregarDados() {
  const resposta = await fetch("../../db.json"); //https://my-json-server.typicode.com/potuwer/projeto-TTPRG-Ficha/itens
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os dados da MockAPI");
  }
  const dados = await resposta.json();
  return dados.itens;
}

import { ListaArmadura, ListaItens } from "./types/Item.js"; // Pegar do lista do local storage localstorage

//Procura um dado(mockAPI) que tem o mesmo ID que algum da lista(localstorage)
export async function carregarInventario() {
  const dados = await carregarDados();
  console.log("Antes:", pesoInventario.innerHTML)
  pesoInventario.innerHTML = 0;
  let valorPeso = 0

  //deleta todos os itens ja existentes antes de carregar
  containerItensDOM.forEach((container) => {
    const itemAntigo = container.querySelector("div");
    itemAntigo ? itemAntigo.remove() : undefined;
  });
  containerArmadurasDOM.forEach((container) => {
    const itemAntigo = container.querySelector("div");
    itemAntigo ? itemAntigo.remove() : undefined;
  });

  //Cria os itens no espaço vazio
  ListaItens.forEach((item) => {
    const itemObj = dados.find((dado) => dado.id == item.id);
    valorPeso += parseInt(itemObj.peso * item.qnt);
    itemObj ? criarItemNoInventario(itemObj) : undefined;
    console.log(valorPeso)
  });
  pesoInventario.innerHTML = valorPeso

  ListaArmadura.forEach((item) => {
    const itemObj = dados.find((dado) => dado.id == item.id);
    itemObj ? criarItemNoInventario(itemObj, true) : undefined;
  });
}

// Procura um espaço no inventário vazio, cria o html do item baseado no item da API e no LS, e coloca-o no espaço vazio
export function criarItemNoInventario(item, armadura = false) {
  //item = obj do bd
  const novoItem = document.createElement("div");
  novoItem.id = item.id;
  novoItem.innerHTML = `<img src="${item.foto}" alt="${item.nome}" />`;

  if (!armadura) {
    const itemLS = ListaItens.find((i) => i.id == item.id);
    itemLS.qnt > 1 ? novoItem.insertAdjacentHTML(
          "beforeend",
          `<div><span>${itemLS.qnt}x</span></div>`
        )
      : undefined;

    const itemDomVazio = Array.from(containerItensDOM).find(
      (itemDom) => itemDom.innerHTML == ""
    );
    if (itemDomVazio) itemDomVazio.appendChild(novoItem);

    // Ação do click no Item
    novoItem.addEventListener("click", () => {
      verificadorInvOuArm = true
      criarPopUp(novoItem)
    });
  } else {
    const itemDomVazio = Array.from(containerArmadurasDOM).find(
      (itemDom) => itemDom.innerHTML == ""
    );
    if (itemDomVazio) itemDomVazio.appendChild(novoItem);

    // Ação do click no Item
    novoItem.addEventListener("click", () => {
      verificadorInvOuArm = false
      criarPopUp(novoItem, false)
    });
  }
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
    itemLocalStorage.qnt > 1 ? (qntMultipla = `(${itemLocalStorage.qnt * itemDado.peso}kg)`)
      : undefined;
  }

  const popUpItem = document.createElement("div");
  popUpItem.classList.add("popUpItem");
  popUpItem.id = itemDado.id;

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
  trocarInventario(popUpItem);

  fecharOnFocusOut(popUpItem);

  const botaoX = popUpItem.querySelector(".X");
  deletarDiv(botaoX, popUpItem);
}

carregarInventario();
