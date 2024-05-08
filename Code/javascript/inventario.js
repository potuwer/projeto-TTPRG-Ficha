import { fecharOnFocusOut } from "./utils/focusOut.js";
import { deletarDiv } from "./utils/botaoX.js";

const containerItensDOM = document.querySelectorAll(".item");
const containerInventario = document.querySelector(".inventario");

//Busca os dados de itens da MockAPI
async function carregarDados() {
  const resposta = await fetch("../../db.json") //https://my-json-server.typicode.com/potuwer/projeto-TTPRG-Ficha/itens
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os dados da MockAPI")
  }
  const dados = await resposta.json()
  return dados.itens
}

import { ListaItens } from "./types/Item.js"; // Pegar do lista do local storage localstorage

//Procura um dado(mockAPI) que tem o mesmo ID que algum da lista(localstorage)
async function adicionarAoInventatio() {
  const dados = await carregarDados()
  ListaItens.forEach((item) => {
    const itemObj = dados.find((dado) => dado.id === item.id);
    itemObj ? criarItemNoInventario(itemObj) : undefined;
  });
}

// Procura um espaço no inventário vazio, cria o html do item baseado no item da API e no LS, e coloca-o no espaço vazio
function criarItemNoInventario(item) {
  const itemLS = ListaItens.find(i => i.id == item.id)
  const novoItem = document.createElement("div");
  novoItem.id = item.id
  novoItem.innerHTML = `
    <img src="${item.foto}" alt="${item.nome}" />
    <div><span>${itemLS.qnt}x</span></div>`;

  const itemDomVazio = Array.from(containerItensDOM).find(
    (item) => item.innerHTML == ""
  );
  itemDomVazio.appendChild(novoItem);

  // Ação do click no Item
  novoItem.addEventListener("click", () => criarPopUp(novoItem));
}

//Cria o PopUp do item quando clicado
async function criarPopUp(itemDom) {
  const dadosApi = await carregarDados()

  const itemDado = dadosApi.find((dado) => dado.id == itemDom.id)
  const itemLocalStorage = ListaItens.find((itemLS) => itemLS.id == itemDom.id)

  const popUpItem = document.createElement("div");
  popUpItem.classList.add("popUpItem");
  let qntMultipla = ""
  itemLocalStorage.qnt > 1 ? qntMultipla =  `(${itemLocalStorage.qnt * itemDado.peso}kg)` : undefined

  popUpItem.innerHTML = `
  <button class="X"><img src="./assets/Icons/X.png" /></button>      
  <ul class="container1">
    <li>
      <div><img src="${itemDado.foto}" alt="${itemDado.nome}" /></label>
    </li>
    <li>
    <span>Quant:<p id="quant">${itemLocalStorage.qnt}</p></span>
    <span>Peso:<p id="peso">${itemDado.peso}kg ${qntMultipla}</p></span>
    </li>
  </ul>
  <div class="container2">
    <p id="nome">${itemDado.nome}</p>
    <span>Descrição:<p id="desc">${itemDado.desc}</p></span>
  </div>
  `;

  containerInventario.insertAdjacentElement("beforebegin", popUpItem)

  fecharOnFocusOut(popUpItem)

  const botaoX = popUpItem.querySelector(".X")
  deletarDiv(botaoX, popUpItem)
}

adicionarAoInventatio();