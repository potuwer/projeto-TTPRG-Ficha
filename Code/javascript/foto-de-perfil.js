const inputImagem = document.querySelector(".foto-de-perfil input");
const fotoDePerfil = document.querySelector(".container-foto-de-perfil img");

inputImagem.addEventListener("change", (e) => {
  const inputTarget = e.target;
  const arquivo = inputTarget.files[0];

  if (arquivo) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const imgResult = readerTarget.result;

      fotoDePerfil.src = imgResult;
    });
    reader.readAsDataURL(arquivo);
  }
});

//transformar em função essa recebimento de imagem e aplicala pra imagem do corpo tb,
// uma funcao q recebe um input e um <img> e faz tudo isso
