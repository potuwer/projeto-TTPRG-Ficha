# PROJETO FICHA TTRPG ONLINE

> Esse é um projeto pessoal desenvolvido interiamente por Arthur Bizordi.
> O objetivo desse projeto é auxiliar em sessões de TTRPG como uma ficha online customizável.
> > [Figma do projeto](https://www.figma.com/file/n9zXFlNAgvmvwz96YEFDI3/Rpg?type=design&node-id=0%3A1&mode=dev)

<h2>Funcionalidades</h4>
<ol>
  <li><h3>Interatividade com usuário:</h5>
  O site detém diversos campos interativos que podem ser alterados conforme o personagem do jogador: nome, barras(vida, etc), atributos, descrição, imagens(perfil e corpo), perícias, altura e peso.</li>
  <li><h3>Notas:</h3>
  Há um botão na descrição que permite o jogador alternar entre a descrição e as notas, onde pode tomar notas utéis sobre o jogo.</li>
  <li><h3>Habilidades:</h3>
  O jogador pode tomar adicionar, editar e remover habilidades/poderes que seu personagem tem. Essas habilidades guardam informações como: tempo de duração, o que consomem ao serem usadas, etc</li>
  <li><h3>Inventário:</h3>
  Os jogadores terão acesso há um inventário. Onde podem adicionar e remover itens, previamente criados pelo mestre, à ele.</li>
  <li><h3>Armazenamento local das informações dos personagens:</h3>
  Todas essas informações editáveis, fotos, habilidades, itens e suas quantidades serão armazenadas no localStorage do usuário. Futuramente, com o avanço do projeto essas informações serão guardadas num banco de dados.</li>
</ol>

## Tasklist
- [x] Criar Design do projeto no Figma.
- [x] Implementação desse design no HTML e CSS.
- [x] Possibilitar interetividade dos itens com usuário.
- [x] Criar funcionalidade das habilidades.
- [ ] Criar funcionalidade do inventário.
- [ ] Arquivo json dos itens e criação dinâmica deles.
- [ ] Criar funcionalidade que guarda todas as informações no localStorage

## Futuramente
- [ ] Criar página do mestre da sessão(que da acesso a todas as fichas)
- [ ] Criar funcionalidade de 'Sessão' para conectar os jogadores e mestre usando websocket(Nâo tenho conhecimento de outra ferramenta🤠)
- [ ] Criação de contas e tokens de autenticação
- [ ] ...
