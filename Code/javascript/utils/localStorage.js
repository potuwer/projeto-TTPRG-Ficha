export function trocarNoLocalStorage(objetoNome, objeto) {
  if (objeto) {
    const objetoSerializado = JSON.stringify(objeto);
    localStorage.setItem(objetoNome, objetoSerializado);
  } else {
    const objetoColetado = JSON.parse(localStorage.getItem(objetoNome));
    return objetoColetado;
  }
}

// Nome Personagem
const nomePerso = document.querySelector(".nome-do-perso");
const valorNome =  trocarNoLocalStorage("nome-perso");
const titulo = document.querySelector("title");
if (valorNome != null) {
  nomePerso.innerHTML = valorNome;
  titulo.innerHTML = valorNome;
}
nomePerso.addEventListener("change", () =>
  trocarNoLocalStorage("nome-perso", nomePerso.value)
);

// Atributos
const atributos = document.querySelectorAll(".container-atributos input")
atributos.forEach((atri, index) => {
    atri.value = trocarNoLocalStorage(`atributo-${index}`)
    atri.addEventListener("focusout", () => trocarNoLocalStorage(`atributo-${index}`, atri.value))
})

// Perícias
const pericias = document.querySelectorAll(".container-pericias input")
pericias.forEach((peri, index) => {
    peri.value = trocarNoLocalStorage(`atributo-${index}`)
    peri.addEventListener("focusout", () => trocarNoLocalStorage(`atributo-${index}`, peri.value))
})

//Peso e altura
const alturaPeso = document.querySelectorAll(".altura-peso input")
alturaPeso[0].value = trocarNoLocalStorage("peso")
alturaPeso[0].addEventListener("focusout", () => trocarNoLocalStorage("peso", alturaPeso[0].value))
alturaPeso[1].value = trocarNoLocalStorage("altura")
alturaPeso[1].addEventListener("focusout", () => trocarNoLocalStorage("altura", alturaPeso[1].value))
