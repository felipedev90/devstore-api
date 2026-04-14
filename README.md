# DevStore API

API REST completa para e-commerce, desenvolvida como backend do projeto [DevStore](https://dev-store-zeta.vercel.app).

## 🚀 Deploy

**Base URL:** `https://devstore-api-production.up.railway.app`

---

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Fastify** — framework web
- **PostgreSQL** — banco de dados relacional
- **Prisma ORM** — queries tipadas e migrations
- **Zod** — validação de dados e variáveis de ambiente
- **JWT** — autenticação stateless
- **bcrypt** — hash de senhas
- **Railway** — deploy e banco em produção

---

## 📋 Endpoints

### Público

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /health | Status da API |
| GET | /products | Lista todos os produtos |
| GET | /products/:id | Busca produto por ID |
| GET | /categories | Lista todas as categorias |
| GET | /categories/:slug | Busca categoria por slug |
| POST | /register | Cadastro de usuário |
| POST | /login | Login — retorna token JWT |

### Autenticado (Bearer Token)

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /products | Cria produto |
| PATCH | /products/:id | Atualiza produto |
| DELETE | /products/:id | Remove produto |
| POST | /orders | Cria pedido |
| GET | /orders | Lista pedidos do usuário |
| GET | /orders/:id | Detalhe de um pedido |

---

## 🔐 Autenticação

Rotas protegidas exigem token JWT no header:

```
Authorization: Bearer <token>
```

Obtenha o token fazendo login em `POST /login`. O token expira em **1 hora**.

---

## ▶️ Rodando localmente

**Pré-requisitos:** Node.js 18+, PostgreSQL

```bash
# Clone o repositório
git clone https://github.com/felipedev90/devstore-api.git
cd devstore-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Execute as migrations
npx prisma migrate dev

# Popule o banco com produtos e categorias
npx prisma db seed

# Inicie o servidor
npm run dev
```

---

## ⚙️ Variáveis de ambiente

```env
PORT=3333
DATABASE_URL=postgresql://...
JWT_SECRET=sua-chave-secreta
```

---

## 📦 Exemplos de uso

### Cadastro

```http
POST /register
Content-Type: application/json

{
  "name": "Felipe",
  "email": "usuario@email.com",
  "password": "123456"
}
```

### Login

```http
POST /login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "123456"
}
```

### Criar pedido

```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    { "productId": "prod-001", "quantity": 2 },
    { "productId": "prod-004", "quantity": 1 }
  ]
}
```

### Listar pedidos

```http
GET /orders
Authorization: Bearer <token>
```

---

## 🗄️ Modelo de dados

```
Product     — id, slug, name, description, price, originalPrice,
              images, category, tags, rating, reviewCount,
              stock, features, createdAt

Category    — slug, name, description, image

User        — id, name, email, password, createdAt

Order       — id, userId, createdAt
OrderItem   — id, orderId, productId, quantity, price
```

---

## 👨‍💻 Autor

**Felipe Silva** - [LinkedIn](https://www.linkedin.com/in/felipesilva90) · [GitHub](https://github.com/felipedev90)