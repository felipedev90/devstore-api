import { app } from "./app";
import { env } from "./env";

async function start() {
  try {
    await app.listen({ port: Number(env.PORT), host: "0.0.0.0" });
    console.log(`Server is running on port ${env.PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
    // encerra o processo com código de erro. O 1 é convenção universal pra "terminou com falha". 0 seria "terminou com sucesso"
    process.exit(1);
  }
}

start();
