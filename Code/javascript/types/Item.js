export const ListaItens = [];

function adicionarItem(i) {
  ListaItens.push(i);
}

export class Item {
  nome;
  foto;
  poder;
  tempo;
  desc;

  constructor(nome, foto, poder, tempo, desc) {
    this.nome = nome;
    this.foto = foto;
    this.poder = poder;
    this.tempo = tempo;
    this.desc = desc;
    adicionarItem(this);
  }
}
