
# 🔑 Login de Acesso

**Usuário:** `canguru.festo`  
**Senha:** `fiap123`

---

# Sensor API – App Twin 🚀

API REST desenvolvida em **Java com Spring Boot** para simular e armazenar leituras de sensores de um robô pneumático inspirado no projeto **BionicKangaroo – FESTO**.

---

## 👨‍💻 Integrantes da Equipe

| Nome                                   | RM     |
|----------------------------------------|--------|
| Ana Julia Oliveira da Silva            | 552578 |
| Cléo Victtor Leal                      | 552571 |
| Letícia Naomi Wakai                    | 99023  |
| Murilo Watanabe Lympius                | 550454 |
| Renê Stachetti Damasceno               | 98596  |
| Vitor Rodrigues da Silva Oliveira      | 558849 |

---

## 🏗️ Tecnologias Utilizadas

- Java 17
- Spring Boot 3
- Spring Data JPA
- H2 Database (modo file)
- Maven

---

## 🗄️ Localização do Banco de Dados

O banco de dados H2 é persistido no modo file e fica salvo no seguinte caminho dentro do projeto:

```
./data/readings.mv.db
```

---

## 🔧 Configurações do H2

Arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:h2:file:./data/readings
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos:
- Java 17 instalado
- Maven instalado

### Passos:

1. Clone o repositório:
```bash
git clone https://github.com/wakaileticia/app_twin/tree/entrega-2
cd sensor-api
```

2. Execute o backend:
```bash
./mvnw spring-boot:run
```

3. Acesse a API em:
```
http://localhost:8080/api
```

4. Console do H2 disponível em:
```
http://localhost:8080/h2-console
```
- JDBC URL: `jdbc:h2:file:./data/readings`

---

## 🔗 Endpoints Disponíveis

### 📦 CRUD de Leituras (Readings)

| Método | Endpoint                       | Descrição                             |
|--------|---------------------------------|----------------------------------------|
| `GET`  | `/api/readings`                | Lista todas as leituras                |
| `GET`  | `/api/readings/{sensorId}`     | Lista leituras de um sensor específico |
| `POST` | `/api/readings/{sensorId}`     | Adiciona nova leitura a um sensor      |

**Exemplo de corpo JSON para POST:**
```json
{
  "value": 42.5
}
```

---

### 🔧 CRUD de Sensores

| Método | Endpoint                      | Descrição                      |
|--------|--------------------------------|---------------------------------|
| `GET`  | `/api/sensors`                | Lista todos os sensores         |
| `GET`  | `/api/sensors/{id}`           | Dados de um sensor específico   |
| `POST` | `/api/sensors`                | Cadastra um novo sensor         |
| `PUT`  | `/api/sensors/{id}`           | Atualiza dados de um sensor     |
| `DELETE`| `/api/sensors/{id}`          | Deleta um sensor                |

**Exemplo de JSON para criar um sensor:**
```json
{
  "id": "123",
  "name": "Sensor de Pressão",
  "unit": "bar",
  "status": "OK"
}
```

---

## 📑 Exemplo de requisição CURL

### 🔸 Adicionar leitura:
```bash
curl -X POST http://localhost:8080/api/readings/1 -H "Content-Type: application/json" -d '{"value": 55.3}'
```

### 🔸 Listar leituras do sensor:
```bash
curl http://localhost:8080/api/readings/1
```

---

## 🏁 Observações

- O backend persiste os dados no banco H2 em arquivo (`./data/readings.mv.db`), portanto os dados são mantidos mesmo após encerrar a aplicação.
- CORS está habilitado para permitir consumo pelo aplicativo mobile.
- Interface web do H2 acessível em `/h2-console`.

---
