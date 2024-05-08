export const ListaItens = [];

function adicionarItem(i) {
  ListaItens.push(i);
}

export class Item {
  id;
  qnt;

  constructor(id, qnt) {
    this.id = id;
    this.qnt = qnt
    adicionarItem(this)
  }
}

new Item(0, 3)
new Item(1, 1)
new Item(2, 1)
new Item(3, 2)
new Item(4, 1)
