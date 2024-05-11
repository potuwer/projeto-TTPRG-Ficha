import { fecharOnFocusOut } from "./utils/focusOut.js";
import { deletarDiv } from "./utils/botaoX.js";
import { trocarInventario } from "./armadura.js";
import { trocarNoLocalStorage } from "./utils/localStorage.js"

const containerItensDOM = document.querySelectorAll(".item");
const containerInventario = document.querySelector(".inventario");
const containerArmadurasDOM = document.querySelectorAll(
  ".itens-armadura .item"
);
const pesoInventario = document.querySelector(".peso-inventario");

export let verificadorInvOuArm = undefined;

//Busca os dados de itens da MockAPI
export async function carregarDados() {
  const resposta = await fetch("https://my-json-server.typicode.com/potuwer/projeto-TTPRG-Ficha/db");
  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os dados da MockAPI");
  }
  const dados = await resposta.json()
  return dados.itens;
}

import { ListaArmadura, ListaItens } from "./types/Item.js"; // Pegar do lista do local storage localstorage

//Procura um dado(mockAPI) que tem o mesmo ID que algum da lista(localstorage)
export async function carregarInventario() {
  const dados = await carregarDados();
  pesoInventario.innerHTML = 0;
  let valorPeso = 0;

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
  });
  pesoInventario.innerHTML = valorPeso;

  ListaArmadura.forEach((item) => {
    const itemObj = dados.find((dado) => dado.id == item.id);
    itemObj ? criarItemNoInventario(itemObj, true) : undefined;
  });

  trocarNoLocalStorage("lista-itens", ListaItens)
  trocarNoLocalStorage("lista-armadura", ListaArmadura)
}

// Procura um espaço no inventário vazio, cria o html do item baseado no item da API e no LS, e coloca-o no espaço vazio
export function criarItemNoInventario(item, armadura = false) {
  //item = obj do bd
  const novoItem = document.createElement("div");
  novoItem.id = item.id;
  novoItem.innerHTML = `<img src="${item.foto}" alt="${item.nome}" />`;

  if (!armadura) {
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
    if (itemDomVazio) itemDomVazio.appendChild(novoItem);

    // Ação do click no Item
    novoItem.addEventListener("click", () => {
      verificadorInvOuArm = true;
      criarPopUp(novoItem);
    });
  } else {
    const itemDomVazio = Array.from(containerArmadurasDOM).find(
      (itemDom) => itemDom.innerHTML == ""
    );
    if (itemDomVazio) itemDomVazio.appendChild(novoItem);

    // Ação do click no Item
    novoItem.addEventListener("click", () => {
      verificadorInvOuArm = false;
      criarPopUp(novoItem, false);
    });
  }
}

//Cria o PopUp do item quando clicado
export async function criarPopUp( itemDom, puxarLS = true, botoesAlt = true, localDoPopUp = containerInventario) {
  const dadosApi = await carregarDados();

  const itemDado = dadosApi.find((dado) => dado.id == itemDom.id);

  let quant = itemDado.qnt;
  let qntMultipla = "";
  let itemLocalStorage = "";
  if (puxarLS) {
    itemLocalStorage = ListaItens.find((itemLS) => itemLS.id == itemDom.id);
    quant = itemLocalStorage.qnt;
    itemLocalStorage.qnt > 1
      ? (qntMultipla = `(${itemLocalStorage.qnt * itemDado.peso}kg)`)
      : undefined;
  }

  const popUpItem = document.createElement("div");
  popUpItem.classList.add("popUpItem");
  popUpItem.id = itemDado.id;

  const btnsDOMAlt = `
  <button class="remover" style="bottom: 5px; right: 5px;"><img src="./assets/Icons/X.png"><p>REMOVER</p></button>
  <button class="mudar" style="bottom: 5px; right: 150px;"><img src="./assets/Icons/icon-mudar.png"><p>MUDAR</p></button>`;

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
  ${botoesAlt ? btnsDOMAlt : ``}
  `;

  localDoPopUp.insertAdjacentElement("afterbegin", popUpItem);

  botoesAlt ? removerItem(popUpItem, itemLocalStorage) : undefined;

  botoesAlt ? trocarInventario(popUpItem) : undefined;

  fecharOnFocusOut(popUpItem);

  const botaoX = popUpItem.querySelector(".X");
  deletarDiv(botaoX, popUpItem);
}

// Função que deleta os itens do inventário
function removerItem(popUp, itemLS) {
  const btnRemover = popUp.querySelector(".remover");
  btnRemover.addEventListener("click", () => {
    const quantidade = itemLS.qnt;
    if (quantidade == 1 || !quantidade) {
      if (verificadorInvOuArm) {
        const indexItem = ListaItens.findIndex(item => item.id == itemLS.id)
        ListaItens.splice(indexItem, 1);
      } else {
        const indexItem = ListaArmadura.findIndex(item => item.id == itemLS.id)
        ListaArmadura.splice(indexItem, 1);
      }
    } else {
      const valorMenos = prompt("Quantos itens deseja remover?");
      if (!valorMenos || parseInt(valorMenos) != parseFloat(valorMenos)) {
        alert("Valor irreconhecido.");
        return;
      } else {
        const valorMenorQuePossivel = itemLS.qnt - valorMenos;
        if (valorMenorQuePossivel < 0) {
          alert("Valor de subtração menor que o adquirido.");
          return;
        } else if (valorMenorQuePossivel == 0) {
          ListaItens.splice(itemLS, 1);
        } else {
          itemLS.qnt -= valorMenos;
        }
      }
    }

    carregarInventario();
    popUp.remove();
  });
}


//Pondo Listas do LS nas listas oficiais
const ListaItensLS = trocarNoLocalStorage("lista-itens")
if (ListaItensLS) ListaItensLS.forEach((itemLS) => ListaItens.push(itemLS))
const ListaArmaduraLS = trocarNoLocalStorage("lista-armadura")
if (ListaArmaduraLS) ListaArmaduraLS.forEach((itemArmLS) => ListaArmadura.push(itemArmLS))


carregarInventario();

// Guardar peso mochila no LS
const mochila = document.querySelector(".capacidade input")
mochila.value = trocarNoLocalStorage("peso-mochila")
mochila.addEventListener("change", () => trocarNoLocalStorage("peso-mochila", mochila.value))

