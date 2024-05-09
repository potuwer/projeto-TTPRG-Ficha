import { ListaItens, ListaArmadura, Item } from "./types/Item.js"
import { carregarInventario, verificadorInvOuArm } from "./inventario.js"

export function trocarInventario(popUp) {
    popUp.querySelector(".mudar").addEventListener("click", () => {
        debugger
        if (verificadorInvOuArm) {
            const itemLista = ListaItens.find(obj => obj.id == popUp.id)
            const indexSare = ListaItens.findIndex(obj => obj.id == itemLista.id)
            itemLista.qnt > 1 ? itemLista.qnt -= 1 : ListaItens.splice(indexSare, 1)

            ListaArmadura.push(itemLista)
        } else {
            const itemArmadura = ListaArmadura.find(obj => obj.id == popUp.id)
            const indexItem = ListaArmadura.findIndex(obj => obj.id == itemArmadura)
            ListaArmadura.splice(indexItem, 1)

            const itemJaExistente = ListaItens.find(
                (item) => item.id == itemArmadura.id
              );
        
              if (!itemJaExistente) {
                new Item(itemArmadura.id, parseInt(itemArmadura.qnt));
              } else {
                itemJaExistente.aumentarQnt(parseInt(itemArmadura.qnt));
              }
        }

        console.log("ITENS:", ListaItens)
        console.log("ARMADURA:", ListaArmadura)
        carregarInventario() 
        popUp.remove()
    })
}