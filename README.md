
# Poker API

## Descrição

aplicação que permite gerenciar mesas de poker, realizar simulações de resultados entre jogadores e manter um histórico de rodadas. Foi desenvolvida utilizando o framework **NestJS** com **TypeORM**, seguindo os princípios de **DDD (Domain-Driven Design)** para uma arquitetura modular e escalável.

---

## **Requisitos Técnicos**

- **Node.js** (v18 ou superior)
- **PostgreSQL** (v15 ou superior)
- **Docker** (para rodar o ambiente facilmente)
- **JWT** para autenticação
- Arquitetura baseada em **DDD**
- Suporte a documentação interativa com **Swagger**

---

## **Requisitos Não Técnicos**

- Seguir boas práticas de desenvolvimento e segurança.
- Assegurar modularidade e desacoplamento das dependências.
- Utilizar uma arquitetura escalável para manutenção futura.
- Garantir acessibilidade a partir de ferramentas como Postman, cURL e Swagger.

---

## **Arquitetura**

O projeto foi desenvolvido utilizando **DDD (Domain-Driven Design)**, organizado em camadas:

1. **Domain**:
   - Contém as entidades, interfaces de repositórios e objetos essenciais.
   - Exemplo: `User`, `Table`, `UserHistory`.

2. **Application**:
   - Contém os casos de uso (regras de negócio).
   - Exemplo: `AddPlayerUseCase`, `SimulateResultUseCase`.

3. **Infrastructure**:
   - Contém os repositórios concretos, configuração de banco de dados e integrações externas.
   - Exemplo: `TypeORMUserRepository`.

4. **Presentation**:
   - Contém os controladores (endpoints HTTP), DTOs e interceptors.
   - Exemplo: `TablesController`, `AddPlayerDto`.

---

## **Tecnologias Utilizadas**

- **Node.js** e **NestJS**
- **Jest**
- **TypeORM**
- **PostgreSQL**
- **JWT**
- **Swagger**
- **Docker** e **Docker Compose**

---

## **Endpoints Principais**

### **Usuários**
- **POST `/api/users`**: Criar um novo usuário.
- **GET `/api/users`**: Listar todos os usuários.
- **GET `/api/users/:id/history`**: Listar o histórico de um usuário.

### **Mesas**
- **POST `/api/tables`**: Criar uma nova mesa.
- **GET `/api/tables`**: Listar todas as mesas.
- **POST `/api/tables/:id/players`**: Adicionar um jogador à mesa.
- **POST `/api/tables/:id/simulate`**: Simular o resultado de uma rodada.

### **Autenticação**
- **POST `/api/auth/login`**: Realizar login e obter um token JWT.

### **Swagger**
Acesse [http://localhost:3000/api/docs](http://localhost:3000/api/docs) para visualizar a documentação completa e interativa.

---

## **Como Rodar o Projeto**

### **1. Configuração**

#### Arquivo `.env`
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=postgres://postgres:postgres@db:5432/postgres
JWT_SECRET=*******
```

### **2. Subir o Ambiente com Docker**

Execute o seguinte comando na raiz do projeto:

```bash
docker-compose up --build
```

- A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)
- O Swagger estará disponível em: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

### **Rodar os testes unitarios**

```bash
npm run test
```

## **Estrutura do Projeto**

```plaintext
src
├── auth
├── application
│   ├── use-cases
│   │   ├── table  
│   │   └── user
├── domain
│   ├── entities
│   └── repositories
├── infrastructure
│   └── repositories
│   └── config
│   └── jwt
├── presentation
│   ├── controllers
│   ├── dto
│   └── decorators
│   └── guards
│   └── interceptors
├── main.ts
└── app.module.ts
├── test
│   │   ├── table  
│   │   └── user
```

---

