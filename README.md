# Sistema de Ponto

Este projeto é uma aplicação Next.js que fornece um sistema de registro de frequência de funcionários baseado na localização do funcionário em relação à empresa. Ele utiliza dispositivos de GPS para identificar as coordenadas do funcionário e verificar se o funcionário está em um raio predefinido em relação à empresa.

## Requisitos

- Node.js v14.0.0 ou superior
- npm v6.0.0 ou superior

## Instalação

1. Clone o repositório:

    ```sh
    git clone https://github.com/seu-usuario/sistema-de-ponto.git
    ```

2. Navegue até o diretório do projeto:

    ```sh
    cd sistema-de-ponto
    ```

3. Instale as dependências:

    ```sh
    npm install
    ```

## Configuração

Para que o projeto funcione corretamente, você precisa configurar duas variáveis de ambiente: a chave de API do Google Maps e a URL de conexão com o backend.

1. Crie um arquivo `.env.local` na raiz do projeto.
2. Adicione as seguintes linhas ao arquivo `.env.local`, substituindo os valores de exemplo pelos valores reais:

    ```plaintext
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
    NEXT_PUBLIC_BACKEND_URL=YOUR_BACKEND_URL
    ```

## Rodando a Aplicação

Para o frontend funcionar corretamente, é necessário instalar e rodar o backend. Siga as instruções no repositório do backend:

[Repositório do Backend](https://github.com/DiogoAlberto0/SistemaDePonto_Back)

1. Inicie o servidor de desenvolvimento:

    ```sh
    npm run dev
    ```

2. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run start`: Inicia a aplicação em modo de produção.

## Estrutura do Projeto

- `pages/`: Contém as páginas da aplicação.
- `components/`: Contém os componentes reutilizáveis.
- `public/`: Contém arquivos estáticos como imagens e ícones.
- `styles/`: Contém arquivos de estilo.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Feito com ❤️ por [Seu Nome](https://seu-perfil.com)
