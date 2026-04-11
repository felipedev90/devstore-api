import fastify from "fastify";
import { productRoutes } from "./routes/products";

export const app = fastify();

app.get("/health", async (request, reply) => {
  return { status: "ok" };
});

app.register(productRoutes);
