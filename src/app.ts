import fastify from "fastify";
import { productRoutes } from "./routes/products";
import { authRoutes } from "./routes/auth";
import { orderRoutes } from "./routes/orders";
import { categoryRoutes } from "./routes/categories";
import cors from "@fastify/cors";

export const app = fastify();

app.get("/health", async (request, reply) => {
  return { status: "ok" };
});

app.register(cors, {
  origin: true,
});

app.register(productRoutes);
app.register(authRoutes);
app.register(orderRoutes);
app.register(categoryRoutes);
