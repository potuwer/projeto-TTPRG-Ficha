export function bordaSumir(lista, cor, comecaSem = false, tamanho = false) {
  const bordaTamanho = tamanho ? tamanho : 1;
  if (comecaSem) {
    lista.forEach((input) => {
      input.style.border = "none";
    });
  } else {
    lista.forEach((input) => {
      if (input.value == "") {
        input.style.border = `${bordaTamanho}px dashed ${cor}`;
      }
    });
  }

lista.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value != "") {
      input.style.border = "none";
    } else {
      input.style.border = `${bordaTamanho}px dashed ${cor}`;
    }
  });
});
}

//Aplicando essa função em elementos que nao compensa criar um arquivo separado pra isso

const listaAtributos = document.querySelectorAll(".container-atributos input"); //Atributos
bordaSumir(listaAtributos, "#091c4e", false);

const listaPericias = document.querySelectorAll(".container-pericias input");
bordaSumir(listaPericias, "#F00");

const listaCorpo = document.querySelectorAll(".altura-peso input");
bordaSumir(listaCorpo, "#281a04");

const pesoInventario = document.querySelectorAll(".capacidade input");
bordaSumir(pesoInventario, "#3a230e", false, 3);
