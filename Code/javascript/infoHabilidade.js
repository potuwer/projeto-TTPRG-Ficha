import { Habilidade, ListaHabilidades } from "./Habilidade.js";
import { porImagemNaTela } from "./porImagemNaTela.js";

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
              <input type="text" placeholder="Duração..." id="tempo"></input>
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
            <textarea rows="4" maxlength="170" spellcheck="false" id="propriedade"></textarea>
          
          <p>Descrição:</p>
            <textarea rows="4" maxlength="170" spellcheck="false" id="descricao"></textarea>
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
    console.log(url);
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
      !valorDescricao
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const h2 = new Habilidade(
      valorNome,
      valorFoto,
      valorTempo,
      valorCusto,
      valorGanho,
      valorPropriedade,
      valorDescricao
    );

    console.log(ListaHabilidades);
    popUp.remove();
    botaoAddHabilidade.disabled = false;
    botaoAddHabilidade.style.cursor = "pointer";

    atualizarHabilidades();
  });

  //Deletar pop up
  const botaoX = popUp.querySelector(".X");
  botaoX.addEventListener("click", () => {
    const resposta = confirm("Deseja descartar a criação dessa habilidade?");
    if (resposta) {
      popUp.remove();
    }
    botaoAddHabilidade.disabled = false;
    botaoAddHabilidade.style.cursor = "pointer";
  });
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
  });
}

//atualizarHabilidades();
// Abrir habilidade ja criada, puxando info ela array- possivel editar essa array, caso edite, ao fechar, confere-se se ha algm alteração, se houver um alerta pergunta se quer alterar
