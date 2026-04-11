import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod";

const createProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  stock: z.number().int(),
});

export async function productRoutes(app: FastifyInstance) {
  app.get("/products", async (request, reply) => {
    const products = await prisma.product.findMany();
    return reply.send(products);
  });

  app.post("/products", async (request, reply) => {
    const result = createProductSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({ error: result.error.format() });
    }

    const product = await prisma.product.create({ data: result.data });
    return reply.status(201).send(product);
  });

  app.get("/products/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    
    const product = await prisma.product.findUnique({ where: { id } });
    
    if (!product) {
      return reply.status(404).send({ error: "Product not found" });
    }
    return reply.send(product);
  });
}
