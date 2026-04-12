import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { authenticate } from "../middlewares/authenticate";
import z from "zod";

const createProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  stock: z.number().int(),
});

const updateProductSchema = createProductSchema.partial();

export async function productRoutes(app: FastifyInstance) {
  app.get("/products", async (request, reply) => {
    const products = await prisma.product.findMany();
    return reply.send(products);
  });

  app.post(
    "/products",
    { preHandler: authenticate },
    async (request, reply) => {
      // Valida os dados de criação do produto usando o Zod
      // safeParse é usado para validar os dados e retornar um resultado que indica se a validação foi bem-sucedida ou não
      const result = createProductSchema.safeParse(request.body);

      if (!result.success) {
        return reply.status(400).send({ error: result.error.format() });
      }

      const product = await prisma.product.create({ data: result.data });
      return reply.status(201).send(product);
    },
  );

  app.get("/products/:id", async (request, reply) => {
    // Extrai o ID do produto dos parâmetros da rota
    const { id } = request.params as { id: string };

    // Busca o produto no banco de dados usando o Prisma
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return reply.status(404).send({ error: "Product not found" });
    }
    return reply.send(product);
  });

  app.patch(
    "/products/:id",
    { preHandler: authenticate },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });
      if (!existingProduct) {
        return reply.status(404).send({ error: "Product not found" });
      }

      // Valida os dados de atualização usando o Zod
      const result = updateProductSchema.safeParse(request.body);

      if (!result.success) {
        return reply.status(400).send({ error: result.error.format() });
      }

      // Atualiza o produto no banco de dados usando o Prisma
      const product = await prisma.product.update({
        where: { id },
        data: result.data,
      });

      return reply.send(product);
    },
  );

  app.delete(
    "/products/:id",
    { preHandler: authenticate },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });
      if (!existingProduct) {
        return reply.status(404).send({ error: "Product not found" });
      }

      await prisma.product.delete({ where: { id } });
      return reply.status(204).send();
    },
  );
}
