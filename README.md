# Vacation planner

<img align="center" height="300px" src="./client/public/images/pensando_ferias.jpg" alt="Ferias" />

## Conteúdo

- [Status](#status)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
  - [Frontend](#frontend)
  - [Backend](#backend-opcional)

## Sobre

O Vacation Planner é uma aplicação Web cujo foco é proporcionar um melhor planejamento das férias do usuário, podendo desde inserir o período desejado até criar eventos neste período e compartilhando com outras pessoas.

## Tecnologias

Para a criação foi utilizado:

<div align="center" style="display: inline_block">
  <br>
  <img align="left" alt="Jeni-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg">
  <img align="left" alt="Jeni-Reactjs" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
  <img align="left" alt="Jeni-Nodejs" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg">
  <img align="left" alt="Jeni-Expressjs" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg">
  <img align="left" alt="Jeni-SQLite" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg">
</div>

<br>

## Status

Hoje, dia 23/03/2024, o `vacation-planner` está em perfeito funcionamento, podendo ser acessado e testado através do link [vacation-planner.jenifferlaila.dev](https://vacation-planner.jenifferlaila.dev)

## Pré-requisitos

Para rodar o `vacation-planner` em sua máquina, é necessário:

- Possuir `node` instalado em sua máquina, com uma versão igual ou superior à `20.11`
- Possuir `npm` instalado em sua máquina, com uma versão igual ou superior à `10.2`

Para realizar o **deploy** do `vacation-planner` em seu servidor, você deve:

- Possuir todos os pré-requisitos anteriores
- Possuir `docker-engine` e suas dependências instalados em sua máquina

## Instalação

Para poder rodar a aplicação na sua máquina clone esse repositório e siga os passos abaixo.

### Frontend

1. Em seu terminal, navegue até o diretório `client/`
2. Execute `npm install` e aguarde o fim da instalação
3. Execute `npm run dev`

### Backend (opcional)

Por padrão, o app redirecionará suas requisições a api que se encontra em cloud, mas caso opte por rodar o backend localmente:

1. Em seu terminal, navegue até o diretório `api/`
2. Execute `npm install` e aguarde o fim da instalação
3. Navegue até o diretório `client/`
4. Substitua o conteúdo valor da variável `VITE_USE_LOCAL_API` no arquivo `.env` para `true`:
5. Retorne ao diretório `api/`
6. Execute `npm run dev`
