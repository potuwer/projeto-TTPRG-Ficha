export const ListaItens = [];

function adicionarItem(i) {
  ListaItens.push(i);
}

export class Item {
  nome;
  foto;
  prop;
  tempo;
  desc;

  constructor(nome, foto, prop, tempo, desc) {
    this.nome = nome;
    this.foto = foto;
    this.prop = prop;
    this.tempo = tempo;
    this.desc = desc;
    adicionarItem(this);
  }
}
