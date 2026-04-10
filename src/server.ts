import { app } from "./app";

async function start() {
  try {
    // await app.listen({ port: 3333, host: '0.0.0.0' }); => para aceitar conexões de fora do localhost
    await app.listen({ port: 3333 });
    console.log("Server is running on port 3333");
  } catch (err) {
    console.error("Error starting server:", err);
    // encerra o processo com código de erro. O 1 é convenção universal pra "terminou com falha". 0 seria "terminou com sucesso"
    process.exit(1);
  }
}

start();
