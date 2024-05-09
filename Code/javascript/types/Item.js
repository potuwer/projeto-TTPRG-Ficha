export const ListaItens = [];

function adicionarItem(i) {
  ListaItens.push(i);
}

export class Item {
  id;
  qnt;

  aumentarQnt(compra){
    this.qnt += compra
  }

  constructor(id, qnt) {
    this.id = id;
    this.qnt = qnt
    adicionarItem(this)
  }
}
