# App Twin – Monitoramento de Sensores Pneumáticos

Aplicativo mobile desenvolvido com **React Native + Expo** para simular a leitura e acompanhamento de sensores de um robô pneumático da empresa **Festo**, inspirado no projeto **BionicKangaroo**.

## 👩‍💻 Integrantes da Equipe

| Nome                                   | RM     |
|----------------------------------------|--------|
| Ana Julia Oliveira da Silva            | 552578 |
| Cléo Victtor Leal                      | 552571 |
| Letícia Naomi Wakai                    | 99023  |
| Murilo Watanabe Lympius                | 550454 |
| Renê Stachetti Damasceno               | 98596  |
| Vitor Rodrigues da Silva Oliveira      | 558849 |


## 📱 Funcionalidades Implementadas

### 🦿 Lista de Sensores (FlatList)
- Apresenta sensores como: **pressão**, **fluxo**, **eficiência de recuperação**, **velocidade**, entre outros.
- Cada item mostra:
  - Nome do sensor
  - Valor atual
  - Status (OK ou Alerta)
  - Ícone representativo

### 📊 Detalhes do Sensor
- Tela com nome, valor, status e histórico do sensor.
- Histórico exibido em lista.
- Botão “Atualizar” simula nova leitura via mock.

### ⚙️ Tela de Configuração
- Permite informar a URL da API (simulada).
- Valor armazenado localmente (futuro: persistência com AsyncStorage).

---

## 🧪 Mock de Dados
- Mock disponível em: `mock/sensors.json`
- Simula sensores reais com histórico, status e valores variáveis.

---

## 💡 Tecnologias Utilizadas

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
- Fetch nativo (sem Axios)

---

## 🚀 Como Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/app-twin.git
cd app-twin
