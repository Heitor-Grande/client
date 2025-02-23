# Gerenciamento para Produtores Rurais

O **Gerenciamento para Produtores Rurais** é uma aplicação web que permite cadastrar produtores agrícolas e suas fazendas, vincular safra às fazendas e cadastrar culturas nas safra, proporcionando uma gestão eficiente para o produtor rural.

## Tecnologias Utilizadas

- **React.js** com TypeScript
- **Bootstrap** para o layout responsivo
- **Material UI** para componentes visuais modernos
- **Axios** para realizar requisições à API
- **react-router-dom** para gerenciamento de rotas do cliente

## Estrutura do Projeto

- **/.env**: Contém as variáveis de ambiente necessárias para o funcionamento da aplicação.
- **/src/app.tsx**: Arquivo principal que controla as rotas da aplicação utilizando `react-router-dom`.
- **/src/pages**: Contém os arquivos principais das páginas da aplicação.
  - **/src/pages/principal.tsx**: Arquivo de grande importância, pois é responsável pela renderização das páginas através de rotas.
  - **/src/pages/components**: Contém os componentes HTML específicos das páginas, como "Visão Geral", "Produtores", etc.
  - **/src/pages/components/components**: Contém componentes auxiliares que são utilizados nas páginas dentro de "/src/pages/components".


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
