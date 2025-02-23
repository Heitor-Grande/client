# Gerenciamento para Produtores Rurais

O **Gerenciamento para Produtores Rurais** é uma aplicação web que permite cadastrar produtores agrícolas e suas fazendas, vincular safra às fazendas e cadastrar culturas nas safra, proporcionando uma gestão eficiente para o produtor rural.

## Tecnologias Utilizadas

- **React.js** com TypeScript
- **Bootstrap** para o layout responsivo
- **Material UI** para componentes visuais modernos
- **Axios** para realizar requisições à API
- **react-router-dom** para gerenciamento de rotas do cliente

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:
/client
├── .env                  # Variáveis de ambiente
├── /src
│   ├── app.tsx           # Controle das rotas do sistema utilizando react-router-dom
│   ├── /pages            # Contém as páginas da aplicação
│   │   ├── principal.tsx # Arquivo de grande importância que gerencia a renderização das Pages
│   │   ├── /components   # Contém os componentes HTML das páginas, como "Visão Geral", "Produtores", etc.
│   │   │   ├── /components # Componentes utilizados nas Pages dentro de "/src/pages/components"


## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Heitor-Grande/client-testeExperian.git
2. Instale as dependências
   ```bash
   npm install
3. Rode em modo de desenvolvimento:
   ```bash
   npm start
