export function trocarNoLocalStorage(objetoNome, objeto) {
    if (objeto) {
        const objetoSerializado = JSON.stringify(objeto)
        localStorage.setItem(objetoNome, objetoSerializado)
    } else {
        const objetoColetado = JSON.parse(localStorage.getItem(objetoNome))
        return objetoColetado
    }
}


// Nome Personagem
const nomePerso = document.querySelector(".nome-do-perso")
trocarNoLocalStorage("nome-perso", nomePerso.innerHTML)
nomePerso.innerHTML = trocarNoLocalStorage("nome-perso")
nomePerso.addEventListener("change", () => trocarNoLocalStorage("nome-perso", nomePerso.value))

