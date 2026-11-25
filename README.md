# Minha estante de anime

Site para organizar os animes que já assisti, os que estou assistindo e os que ainda quero ver. Trabalho da disciplina de SEU_CURSO_OU_DISCIPLINA.

**Aluno:** Ronicarlos Ferreira (37012676)
**Framework:** React 18 (com Vite e React Router)

## Propósito

Eu assisto bastante anime e sempre esquecia em que episódio tinha parado, ou ficava sem saber o que ver depois. O site resolve isso: tem um catálogo com quase 100 títulos, eu marco o que já vi, acompanho o episódio dos que estou vendo e recebo sugestões de acordo com os gêneros que mais assisto.

O público é quem assiste anime e quer manter uma lista simples, sem precisar criar conta em lugar nenhum. Tudo fica salvo no próprio navegador.

## Por que React

- Foi o framework em que me senti mais à vontade no semestre, principalmente pela ideia de componente como função e pelo JSX, que deixa o HTML junto da lógica que mexe nele.
- O site é basicamente uma lista de cartões que mudam de lugar conforme o status do anime. No React isso sai quase de graça: eu mudo o estado e a tela se atualiza sozinha, sem eu ter que mexer no DOM.
- O cartão do anime aparece em quatro páginas diferentes. Com componentes eu escrevi uma vez só e reaproveitei.
- O React Router resolve a navegação sem recarregar a página, que era requisito do trabalho.
- Usei o Vite porque o projeto sobe em um segundo e a configuração é um arquivo de cinco linhas.

## Funcionalidades

- **Catálogo** com busca por nome, filtro por gênero, filtro de dublados e ordenação.
- **Assistindo**: botão de +1 episódio e ajuste de temporada/episódio.
- **Assisti**: lista de vistos (com favoritos) e de dropados, mais um formulário para adicionar animes que não estão no catálogo.
- **Sugestões** calculadas a partir dos gêneros da minha estante, com botão para embaralhar.
- **Página de cada anime** com sinopse, gêneros clicáveis e formulário de avaliação (nota de 1 a 5 e comentário).
- Aviso com **desfazer** depois de cada ação.
- Tema claro e escuro.
- Layout responsivo: no celular o menu vai para a parte de baixo da tela e os cartões ficam deitados.
- Os dados ficam no `localStorage`, então a lista continua lá quando eu volto.

## Como rodar

Precisa do Node 18 ou mais novo.

```bash
npm install
npm run dev
```

Depois é só abrir o endereço que aparece no terminal (normalmente http://localhost:5173).

Para gerar a versão final: `npm run build`. Os arquivos saem na pasta `dist`.

## Organização do código

```
src/
  main.jsx              ponto de entrada, liga o roteador e o contexto
  App.jsx               rotas e tema
  components/           peças reaproveitadas (cartão, capa, filtros, cabeçalho...)
  pages/                uma por rota
  context/              EstanteContext: estado da estante e as ações
  hooks/                useLocalStorage
  utils/                cálculo das sugestões
  data/                 catálogo de animes
  styles/               cores, botões e o que é comum ao site todo
```

### Rotas

| Endereço       | Página                         |
| -------------- | ------------------------------ |
| `/`            | Catálogo                       |
| `/assistindo`  | O que estou vendo              |
| `/assisti`     | Vistos e dropados              |
| `/sugestoes`   | Sugestões                      |
| `/anime/:id`   | Detalhes e avaliação do anime  |

### Onde está cada requisito

- **Componentização:** `CartaoAnime` é usado no catálogo, em assistindo, em assisti e nas sugestões. `Capa`, `AcoesAnime` e `Progresso` aparecem tanto no cartão quanto na página de detalhes.
- **Estado e eventos:** o estado principal fica em `EstanteContext.jsx`. Cada página tem seus `useState` locais (busca, ordenação, formulários).
- **Formulários:** adicionar anime fora do catálogo (`Assisti.jsx`, com validação) e avaliação (`Detalhe.jsx`).
- **Navegação SPA:** `App.jsx`, com `NavLink` no cabeçalho e parâmetro de rota na página do anime.

## Como as sugestões funcionam

Cada gênero ganha pontos conforme o que está na estante: anime visto ou em andamento vale 1, favorito vale 2 e dropado tira 1. Os animes que ainda não vi recebem a soma dos pontos dos seus gêneros, e os mais bem colocados entram em "Na sua linha". Os piores colocados, de gêneros diferentes entre si, entram em "Fora da sua zona de conforto". O código está em `src/utils/sugestoes.js`.

## Observações

As capas são desenhadas em CSS (cor pelo gênero e título em japonês), porque não quis usar imagens oficiais sem autorização. As informações de dublagem foram conferidas por mim e podem ter mudado.
