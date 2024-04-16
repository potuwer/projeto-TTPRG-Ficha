export const ListaHabilidades = [];

function adicionarHabilidade(h) {
  ListaHabilidades.push(h);
}

export class Habilidade {
  nome;
  foto;
  tempo;
  custo;
  ganho;
  propriedade;
  descricao;

  constructor(nome, foto, tempo, custo, ganho, propriedade, descricao) {
    this.nome = nome;
    this.foto = foto;
    this.tempo = tempo;
    this.custo = custo;
    this.ganho = ganho;
    this.propriedade = propriedade;
    this.descricao = descricao;
    adicionarHabilidade(this);
  }
}
