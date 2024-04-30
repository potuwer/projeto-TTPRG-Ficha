export const ListaItens = [];

function adicionarItem(i) {
  ListaItens.push(i);
}

export class Item {
  nome;
  foto;
  peso;
  quant;
  desc;

  constructor(nome, foto, peso, quant, desc) {
    this.nome = nome;
    this.foto = foto;
    this.peso = peso;
    this.quant = quant;
    this.desc = desc;
    adicionarItem(this);
  }
}
