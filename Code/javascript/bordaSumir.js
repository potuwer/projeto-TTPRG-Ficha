export function bordaSumir(lista, cor, comecaSem = false) {
  if (comecaSem) {
    lista.forEach((input) => {
      input.style.border = "none";
    });
  }
  lista.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value != "") {
        input.style.border = "none";
      } else {
        input.style.border = `1px dashed ${cor}`;
      }
    });
  });
}

//Aplicando essa função em elementos que nao compensa criar um arquivo separado pra isso

const listaAtributos = document.querySelectorAll(".container-atributos input"); //Atributos
bordaSumir(listaAtributos, "#091c4e");

const listaPericias = document.querySelectorAll(".container-pericias input");
bordaSumir(listaPericias, "#F00");
