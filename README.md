# App Twin - Projeto Final

Este projeto é uma aplicação React Native utilizando Expo que exibe dados de sensores de um Digital Twin. A aplicação permite visualizar uma lista de sensores e seus detalhes, além de permitir a configuração de uma URL de API.

## Como Rodar o Projeto

### Pré-requisitos

Antes de começar, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

## Passo a Passo

1. **Clone o repositório**:

   git clone https://github.com/usuario/app_twin.git

2. **Instale as dependências**:
   No diretório do projeto, execute:

   npm install

3. **Inicie o projeto no Expo**:
   Execute o seguinte comando para iniciar o servidor de desenvolvimento do Expo:

   npx expo start

   Isso abrirá uma interface no navegador com o QR code. Você pode escanear o código com o **Expo Go** no seu celular Android ou iOS para testar no dispositivo físico.

   Alternativamente, você pode executar o projeto diretamente no emulador/simulador:

   - Para Android:

     npx expo start --android

   - Para iOS (somente em macOS):

     npx expo start --ios

4. **Acesse a aplicação**:
   Após o servidor de desenvolvimento iniciar, a aplicação será carregada automaticamente no emulador ou dispositivo físico.

## Mock de Dados

O projeto utiliza um mock de dados localizado em `mock/sensors.json`. Esses dados simulam a resposta da API para exibir informações dos sensores no aplicativo sem a necessidade de um backend.

Exemplo do conteúdo de `mock/sensors.json`:

[
  {
    "id": 1,
    "name": "Sensor 1",
    "type": "Temperatura",
    "value": "23°C"
  },
  {
    "id": 2,
    "name": "Sensor 2",
    "type": "Pressão",
    "value": "1.5 atm"
  }
]

## Integrantes do Projeto

- **Nome Completo**: Ana Julia Oliveira da Silva  
  **RM**: 552578
- **Nome Completo**: Cleo Victtor Leal  
  **RM**: 552571
- **Nome Completo**: Leticia Naomi Wakai 
  **RM**: 99023
- **Nome Completo**: Murilo Watanabe Lympius  
  **RM**: 550454
- **Nome Completo**: Rene Stacheti Damasceno 
  **RM**: 98596
- **Nome Completo**: Vitor Rodrigues da Silva Oliveira
  **RM**: 558849
    

## Tecnologias Utilizadas

- **React Native**: Framework para construção de aplicativos móveis.
- **Expo**: Plataforma que facilita o desenvolvimento de aplicativos React Native.
- **TypeScript**: Linguagem utilizada para o desenvolvimento.
- **React Navigation**: Biblioteca para navegação dentro da aplicação.

## Contribuições

Se você gostaria de contribuir para o projeto, fique à vontade para fazer um fork e enviar um pull request. Certifique-se de seguir as melhores práticas de codificação.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.
