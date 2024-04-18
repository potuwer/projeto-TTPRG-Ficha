import { Habilidade, ListaHabilidades } from "./Habilidade.js";
import { porImagemNaTela } from "./porImagemNaTela.js";
import { deletarDiv } from "./botaoX.js";
import { bordaSumir } from "./bordaSumir.js";

const body = document.querySelector("body");
const containerHabilidade = document.querySelector(".container-habilidades");
const botaoAddHabilidade = containerHabilidade.querySelector(".add-habilidade");

//Criar Pop Up que recebe habilidade e envia para array
botaoAddHabilidade.addEventListener("click", () => {
  botaoAddHabilidade.disabled = true;
  botaoAddHabilidade.style.cursor = "no-drop";

  const popUp = document.createElement("div");
  popUp.classList.add("fundo-verde");
  popUp.setAttribute("tabindex", "0");
  popUp.innerHTML = `
  <div class="info-habilidade">
          <button class="X"><img src="./assets/Icons/X.png" /></button>
          <div class="principal">
          <div class="container-foto-habilidade">
            <img src="/img/Habilidade 1.png" alt="Foto Habilidade" />
            <label class="foto-habilidade"
              ><input type="file" accept="image/*" />
            </label>
          </div>
          <ul>
            <li>
              Tempo:
              <input type="text" placeholder="Duração..." maxlength="10" id="tempo"></input>
            </li>
            <li>
              Custo:
              <input type="text" placeholder="Preço..." maxlength="5" id="custo"></input>
            </li>
            <li>
              Ganho:
              <input type="text" placeholder="Ganha..." maxlength="5" id="ganho"></input>
            </li>
          </ul>
          </div>
          <div class="propriedades">
          <textarea class="habilidade-nome" spellcheck="false" maxlength="25"></textarea>
          <hr />
          <p>Propriedade:</p>
            <textarea rows="4" maxlength="165" spellcheck="false" id="propriedade"></textarea>
          
          <p>Descrição:</p>
            <textarea rows="4" maxlength="165" spellcheck="false" id="descricao"></textarea>
          </div>
          <button class="ok" style="bottom: 5px; right: 5px;"><img src="./assets/Icons/icon-ok.png"><p>OK</p></button>
        </div>
  </div>`;

  body.insertAdjacentElement("afterbegin", popUp);

  //Para aumentar a altura do NOME, caso os caracteres sejam demais
  const nome = popUp.querySelector(".habilidade-nome");
  nome.addEventListener("input", () => {
    if (nome.value.length > 17) {
      nome.style.height = "150px";
    } else {
      nome.style.height = "30px";
    }
  });

  //Para adicionar uma borda nas textearea
  const texteareas = popUp.querySelectorAll("textarea");
  bordaSumir(texteareas, "#281a04");

  //Tornar o foto habilidade interativo pra upload de imagens
  const inputImagem = popUp.querySelector(".container-foto-habilidade input");
  const fotoHabilidade = popUp.querySelector(".container-foto-habilidade img");
  const promiseUrlFoto = porImagemNaTela(inputImagem, fotoHabilidade);

  //Função para pegar todos os valores da habilidade e criar um objeto
  const inputTempo = popUp.querySelector("#tempo");
  const inputCusto = popUp.querySelector("#custo");
  const inputGanho = popUp.querySelector("#ganho");
  const inputPropriedade = popUp.querySelector("#propriedade");
  const inputDescricao = popUp.querySelector("#descricao");

  let url;
  promiseUrlFoto.then((resultado) => {
    url = resultado;
  });

  const botaoOK = popUp.querySelector(".ok");
  botaoOK.addEventListener("click", () => {
    const valorNome = nome.value;
    const valorFoto = url;
    const valorTempo = inputTempo.value;
    const valorCusto = inputCusto.value;
    const valorGanho = inputGanho.value;
    const valorPropriedade = inputPropriedade.value;
    const valorDescricao = inputDescricao.value;

    if (
      !valorNome ||
      !valorTempo ||
      !valorCusto ||
      !valorGanho ||
      !valorPropriedade ||
      !valorDescricao ||
      !valorFoto
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    new Habilidade(
      valorNome,
      valorFoto,
      valorTempo,
      valorCusto,
      valorGanho,
      valorPropriedade,
      valorDescricao
    );

    popUp.remove();
    botaoAddHabilidade.disabled = false;
    botaoAddHabilidade.style.cursor = "pointer";

    atualizarHabilidades();
  });

  //Deletar pop up
  const botaoX = popUp.querySelector(".X");
  deletarDiv(botaoX, popUp, "Deseja descartar a criação dessa habilidade?");
  botaoAddHabilidade.disabled = false;
  botaoAddHabilidade.style.cursor = "pointer";
});

// Criar, no container-habilidade, mini habilidade puxando pela array
function atualizarHabilidades() {
  const habilidadesCaixa = document.querySelectorAll("div.habilidade");
  habilidadesCaixa.forEach((caixa) => {
    caixa.remove();
  });
  ListaHabilidades.forEach((habi) => {
    const div = document.createElement("div");
    div.classList.add("habilidade");
    div.innerHTML = `
    <img src="${habi.foto}" alt="Foto Hablidade" />
    <ul>
      <li>
        <span>${habi.nome}</span>
        <div class="detalhes">
          <u>${habi.custo}</u>
          <u>${habi.ganho}</u>
        </div>
      </li>
      <li>
        <p>
          ${habi.propriedade}
        </p>
      </li>
    </ul>
        `;

    containerHabilidade.insertBefore(div, botaoAddHabilidade);
    abrirHabilidade();
  });
}
atualizarHabilidades();

//Cria pop up da habilidade quando clica no card dela
function abrirHabilidade() {
  const habilidadesCaixa = document.querySelectorAll("div.habilidade");

  habilidadesCaixa.forEach((caixaHabilidade) => {
    caixaHabilidade.addEventListener("click", () => {
      const { popUp, habi } = criarPopUpInfoHabi(caixaHabilidade);

      body.insertAdjacentElement("afterbegin", popUp);

      //Criação do botaoOK
      const botaoOK = document.createElement("button");
      botaoOK.setAttribute("style", "bottom: 5px; right: 150px;");
      botaoOK.classList.add("ok");
      botaoOK.innerHTML = `<img src="./assets/Icons/icon-ok.png"><p>OK</p>`;

      const texteareas = popUp.querySelectorAll("textarea");
      const inputImg = popUp.querySelector(".container-foto-habilidade input");
      const imagem = popUp.querySelector(".container-foto-habilidade img");

      porImagemNaTela(inputImg, imagem);
      inputImg.addEventListener("input", () => {
        popUp.appendChild(botaoOK);
      });

      bordaSumir(texteareas, "#281a04", true);

      verificarAlteracaoInput(popUp, habi, botaoOK, imagem);
    });
  });
}

//Função que cria o pop up InfoHabilidade ao clicar num card
function criarPopUpInfoHabi(caixaHabilidade) {
  const popUp = document.createElement("div");
  popUp.classList.add("fundo-verde");

  const nomeHabi = caixaHabilidade.querySelector("span").innerText;

  const habi = ListaHabilidades.find((habi) => habi.nome === nomeHabi);

  popUp.innerHTML = `<div class="info-habilidade">
      <button class="X"><img src="./assets/Icons/X.png" /></button>
      <div class="principal">
      <div class="container-foto-habilidade">
        <img src="${habi.foto}" alt="Foto Habilidade" />
        <label class="foto-habilidade"
          ><input type="file" accept="image/*" />
        </label>
      </div>
      <ul>
        <li>
          Tempo:
          <textarea maxlength="10" id="tempo">${habi.tempo}</textarea>
        </li>
        <li>
          Custo:
          <textarea maxlength="5" id="custo">${habi.custo}</textarea>
        </li>
        <li>
          Ganho:
          <textarea maxlength="5" id="ganho">${habi.ganho}</textarea>
        </li>
      </ul>
      </div>
      <div class="propriedades">
      <textarea class="habilidade-nome" spellcheck="false" maxlength="25" id="nome">${habi.nome}</textarea>
      <hr />
      <p>Propriedade:</p>
        <textarea rows="4" maxlength="165" spellcheck="false" id="propriedade">${habi.propriedade}</textarea>
      
      <p>Descrição:</p>
        <textarea rows="4" maxlength="165" spellcheck="false" id="descricao">${habi.descricao}</textarea>
      </div>
      <button class="remover" style="bottom: 5px; right: 5px;"><img src="./assets/Icons/X.png"><p>REMOVER</p></button>
    </div>
</div>
      `;

  const btnRemover = popUp.querySelector(".remover");
  removerLista(btnRemover, nomeHabi, popUp);

  const botaoX = popUp.querySelector(".X");
  deletarDiv(botaoX, popUp);
  return { popUp, habi };
}

function removerLista(btn, nome, popUp) {
  btn.addEventListener("click", () => {
    const resposta = confirm("Deseja deletar essa habilidade?");
    if (resposta) {
      const indice = ListaHabilidades.findIndex((habi) => habi.nome === nome);
      indice !== -1 ? ListaHabilidades.splice(indice, 1) : undefined;
      atualizarHabilidades();
      popUp.remove();
    }
  });
}

// Pear lista de inputs
function criarListaInputs(popUp) {
  const valorNome = popUp.querySelector("#nome").value;
  const valorTempo = popUp.querySelector("#tempo").value;
  const valorCusto = popUp.querySelector("#custo").value;
  const valorGanho = popUp.querySelector("#ganho").value;
  const valorPropriedade = popUp.querySelector("#propriedade").value;
  const valorDescricao = popUp.querySelector("#descricao").value;

  let listaDevolver = [];

  return (listaDevolver = [
    valorNome,
    valorTempo,
    valorCusto,
    valorGanho,
    valorPropriedade,
    valorDescricao,
  ]);
}

//Função para fazer o botaoOK aparecer caso algum dos valores seja alterado
function verificarAlteracaoInput(popUp, habi, botaoOK, image) {
  const inputs = popUp.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const lista = criarListaInputs(popUp);

      if (
        lista[0] != habi.nome ||
        lista[1] != habi.tempo ||
        lista[2] != habi.custo ||
        lista[3] != habi.ganho ||
        lista[4] != habi.propriedade ||
        lista[5] != habi.descricao
      ) {
        popUp.appendChild(botaoOK);
        atualizarItemNaArray(botaoOK, habi, image, popUp);
      } else {
        botaoOK.remove();
      }
    });
  });
}

//Função que atualiza os atributos de um item na ListaHabilidade (botaoOK)
function atualizarItemNaArray(btnOk, habi, imagem, popUp) {
  const lista = criarListaInputs(popUp);

  btnOk.addEventListener("click", () => {
    habi.foto = imagem.src;
    habi.nome = lista[0];
    habi.tempo = lista[1];
    habi.custo = lista[2];
    habi.ganho = lista[3];
    habi.propriedade = lista[4];
    habi.descricao = lista[5];

    atualizarHabilidades();
    popUp.remove();
  });
}
