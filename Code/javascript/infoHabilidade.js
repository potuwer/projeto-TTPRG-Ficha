const containerHabilidade = document.querySelector(".container-habilidades");
const botaoAddHabilidade = containerHabilidade.querySelector(".add-habilidade");

// Criar objetos(habilidades) e coloca-los numa array

class Habilidade {
  nome;
  foto;
  tempo;
  custo;
  ganho;
  propriedade;
  descricao;
}

const h1 = new Habilidade();
h1.nome = "Golpe vertical dos ventos";

// Criar habilidade e enviar para array- Caso feche o pop up, abre um alerta pergntando se quers descartar essa habilidade.

// Criar, no container-habilidade, mini habilidade puxando pela array

// Abrir habilidade ja criada, puxando info ela array- possivel editar essa array, caso edite, ao fechar, confere-se se ha algm alteração, se houver um alerta pergunta se quer alterar

console.log(h1);
