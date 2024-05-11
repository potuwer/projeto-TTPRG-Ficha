import { trocarNoLocalStorage } from "./localStorage.js"

export function porImagemNaTela(input, img, nome) {
  return new Promise((resolve, reject) => {
    input.addEventListener("change", (e) => {
      const arquivo = e.target.files[0];

      if (arquivo) {
        const reader = new FileReader();

        reader.addEventListener("load", (e) => {
          const readerTarget = e.target;

          const imgResult = readerTarget.result;
          img.src = imgResult;

          resolve(reader.result);
          trocarNoLocalStorage(nome, reader.result)
        });

        reader.readAsDataURL(arquivo);
      } else {
        reject("Nenhum arquivo selecionado");
      }
    });
  });
}

// Elementos da foto-de-perfil
const inputFotoPerfil = document.querySelector(".foto-de-perfil input");
const fotoDePerfil = document.querySelector(".container-foto-de-perfil img");
//elementos da foto-do-dorpo
const inputFotoCorpo = document.querySelector(".container-foto-corpo input");
const fotoDoCorpo = document.querySelector(".container-foto-corpo img");

porImagemNaTela(inputFotoPerfil, fotoDePerfil, "foto-perfil");
fotoDePerfil.src = trocarNoLocalStorage("foto-perfil");

porImagemNaTela(inputFotoCorpo, fotoDoCorpo, "foto-corpo");
fotoDoCorpo.src = trocarNoLocalStorage("foto-corpo")
