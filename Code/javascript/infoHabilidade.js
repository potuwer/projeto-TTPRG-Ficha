import { Habilidade, ListaHabilidades } from "./Habilidade.js";
import { porImagemNaTela } from "./porImagemNaTela.js";
import { deletarDiv } from "./botaoX.js";

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

  //Para adicionar uma borda nas textearea, caso nao haja nada dentro (FUTURAMENTE, adicionar isso para tudo que é editavel no site)
  const texteareas = popUp.querySelectorAll("textarea");
  texteareas.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value != "") {
        input.style.border = "none";
      } else {
        input.style.border = "2px dotted #281a04";
      }
    });
  });

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

      //Add borda para as textarea caso elas nao tenham conteudo -- Add botao 'OK' caso algum atributo seja alterado
      const texteareas = popUp.querySelectorAll("textarea");
      const inputImg = popUp.querySelector(".container-foto-habilidade input");
      const imagem = popUp.querySelector(".container-foto-habilidade img");

      porImagemNaTela(inputImg, imagem);
      inputImg.addEventListener("input", () => {
        popUp.appendChild(botaoOK);
      });

      texteareas.forEach((input) => {
        bordaSumir(input, true);
        const listaInputs = criarListaInputs(popUp);
        const verificador = verificarAlteracaoInput(
          popUp,
          habi,
          botaoOK,
          listaInputs
        );
        if (verificador) {
          atualizarListaHabilidade(botaoOK, habi, listaInputs, imagem, popUp);
        }
      });
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

  const botaoX = popUp.querySelector(".X");
  deletarDiv(botaoX, popUp);
  return { popUp, habi };
}

//Mudar borda dos input caso algum deles fique sem conteudo
function bordaSumir(input, comecaOff = false) {
  if (comecaOff) {
    input.style.border = "none";
  }
  input.addEventListener("input", () => {
    if (input.value != "") {
      input.style.border = "none";
    } else {
      input.style.border = "2px dotted #281a04";
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
function verificarAlteracaoInput(popUp, habi, botaoOK, lista) {
  if (
    lista[0] != habi.nome ||
    lista[1] != habi.tempo ||
    lista[2] != habi.custo ||
    lista[3] != habi.ganho ||
    lista[4] != habi.propriedade ||
    lista[5] != habi.descricao
  ) {
    popUp.appendChild(botaoOK);
    return true;
  } else {
    botaoOK.remove();
    return false;
  }
}

//Função que atualiza a ListaHabilidade quando o inofhabilidae é alterado e confimado(botaoOK)
function atualizarListaHabilidade(btnOk, habi, lista, imagem, popUp) {
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
