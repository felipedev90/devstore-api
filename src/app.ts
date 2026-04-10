import fastify from "fastify";

export const app = fastify();

app.get("/health", async (request, reply) => {
  return { status: "ok" };
});
