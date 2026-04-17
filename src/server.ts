// src/server.ts esse componente é responsável por iniciar o servidor, ele importa o app do arquivo app.ts e as variáveis de ambiente do arquivo env.ts.
// Ele tenta iniciar o servidor na porta especificada nas variáveis de ambiente e,
// se houver um erro, ele loga o erro e encerra o processo com um código de erro.

import { app } from "./app";
import { env } from "./env";

async function start() {
  try {
    await app.listen({ port: Number(env.PORT), host: "0.0.0.0" });
    console.log(`Server is running on port ${env.PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

start();
