# Digital Twin - Robô Canguru (Entrega 2) USUARIO = canguru.festo SENHA = fiap123

Este projeto simula sensores de um robô pneumático (baseado no canguru da Festo) com backend em Java Spring Boot e frontend em React Native, focando na eficiência energética e manutenção preditiva.

---

## 📦 Backend (Java + Spring Boot)

### 🔧 Como rodar

```bash
cd sensor-api
./mvnw spring-boot:run
```

> 🔸 Requer Java 17+ e Maven Wrapper

---

### 🛢️ Banco de Dados H2 (modo "file")

O arquivo de persistência está localizado em:

```
./sensor-api/data/readings.mv.db
```

---

### 🔗 Endpoints disponíveis

| Método | Endpoint                     | Descrição                           |
|--------|------------------------------|-------------------------------------|
| POST   | /api/readings                | Cria uma nova leitura               |
| GET    | /api/readings                | Lista última leitura de cada sensor |
| GET    | /api/readings/{sensorId}     | Lista todas as leituras do sensor   |
| POST   | /api/login                   | Autenticação simples por usuário    |

---

### 📫 Exemplo de requisição via `curl`

```bash
curl -X POST http://localhost:8080/api/readings \
  -H "Content-Type: application/json" \
  -d '{"sensorId": "1", "sensorValue": 72.5, "timestamp": "2025-06-09T12:30:00"}'
```

---

## 💻 Frontend (React Native com Expo)

- Tela de login com validação
- Lista de sensores em grade visual
- Cadastro de novo sensor (com nome, unidade e status)
- Exclusão de sensores
- Integração com API Spring Boot

> ⚙️ Base URL configurada: `http://localhost:8080/api`

---

## 👥 Integrantes

| Nome Completo                        | RM     |
|-------------------------------------|--------|
| Ana Julia Oliveira da Silva         | 552578 |
| Cléo Victtor Leal                   | 552571 |
| Letícia Naomi Wakai                 | 99023  |
| Murilo Watanabe Lympius             | 550454 |
| Renê Stachetti Damasceno            | 98596  |
| Vitor Rodrigues da Silva Oliveira   | 558849 |

---

## 🧠 Observações

- O projeto atende os requisitos de modelagem da entidade `Reading` com `sensorId`, `value` e `timestamp`.
- O CORS está habilitado globalmente.
- H2 console acessível via `/h2-console`.
