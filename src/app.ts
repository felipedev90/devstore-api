// app.ts é o arquivo principal do aplicativo, onde o servidor Fastify é configurado e as rotas são registradas.
// Ele é responsável por:
// - criar a instância do aplicativo,
// - Configurar o CORS,
// - Registrar as rotas para produtos, autenticação, pedidos e categorias.
// O arquivo src/server.ts é responsável por iniciar o servidor, enquanto src/env.ts é responsável por carregar e validar as variáveis de ambiente usando zod.

import fastify from "fastify";
import { productRoutes } from "./routes/products";
import { authRoutes } from "./routes/auth";
import { orderRoutes } from "./routes/orders";
import { categoryRoutes } from "./routes/categories";
import cors from "@fastify/cors";

// Cria uma instância do aplicativo Fastify
export const app = fastify();

// Define uma rota de saúde para verificar se o servidor está funcionando corretamente
app.get("/health", async (request, reply) => {
  return { status: "ok" };
});

// Configura o CORS para permitir requisições de qualquer origem
app.register(cors, {
  origin: true,
});

// Registra as rotas do produto, autenticação, pedidos e categorias no aplicativo Fastify
app.register(productRoutes);
app.register(authRoutes);
app.register(orderRoutes);
app.register(categoryRoutes);
