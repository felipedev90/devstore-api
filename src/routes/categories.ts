import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function categoryRoutes(app: FastifyInstance) {
  app.get("/categories", async (request, reply) => {
    const categories = await prisma.category.findMany();
    return reply.send(categories);
  });

  app.get("/categories/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const category = await prisma.category.findUnique({ where: { slug } });

    if (!category) {
      return reply.status(404).send({ error: "Categoria não encontrada" });
    }
    return reply.send(category);
  });
}
