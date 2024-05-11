export const ListaItens = [];

function adicionarItem(i) {
  ListaItens.push(i);
}

function adicionarItemArmadura(i) {
  ListaArmadura.push(i);
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


export const ListaArmadura = []

export class ItemArmadura {
  id;

  constructor(id) {
    this.id = id;

    adicionarItemArmadura(this)
  }
}
