// env.ts é responsável por carregar e validar as variáveis de ambiente do projeto usando a biblioteca zod
// para garantir que todas as variáveis necessárias estejam presentes e sejam do tipo correto.

import { z } from "zod";
import "dotenv/config";

// Define o schema para as variáveis de ambiente usando zod
const schema = z.object({
  PORT: z.string(), // "PORT" é uma variável de ambiente obrigatória do tipo string
  DATABASE_URL: z.string(), // "DATABASE_URL" é uma variável de ambiente obrigatória do tipo string
  JWT_SECRET: z.string(), // "JWT_SECRET" é uma variável de ambiente obrigatória do tipo string
});

// Faz o parse das variáveis de ambiente usando o schema definido
// Se as variáveis de ambiente não estiverem de acordo com o schema, um erro será lançado
export const env = schema.parse(process.env);
