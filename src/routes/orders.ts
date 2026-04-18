import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { authenticate } from "../middlewares/authenticate";
import z from "zod";
import { error } from "node:console";

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export async function orderRoutes(app: FastifyInstance) {
  app.post("/orders", { preHandler: authenticate }, async (request, reply) => {
    // Validação dos dados de entrada usando Zod
    // O método safeParse retorna um objeto com a propriedade success indicando se a validação foi bem-sucedida ou não
    const result = createOrderSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({ error: result.error.format() });
    }

    const order = await prisma.order.create({
      data: {
        userId: request.userId,
      },
    });

    // Extrai os IDs dos produtos dos itens do pedido
    const productsIds = result.data.items.map((item) => item.productId);

    // Busca os produtos no banco de dados para obter os preços
    const products = await prisma.product.findMany({
      where: { id: { in: productsIds } },
    });

    // Cria os itens do pedido associando o ID do pedido, ID do produto, quantidade e preço
    const orderItemsData = await prisma.orderItem.createMany({
      data: result.data.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: products.find((p) => p.id === item.productId)?.price ?? 0,
      })),
    });

    return reply.status(201).send(order);
  });

  app.get("/orders", { preHandler: authenticate }, async (request, reply) => {
    const orders = await prisma.order.findMany({
      where: { userId: request.userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return reply.send(orders);
  });

  app.get(
    "/orders/:id",
    { preHandler: authenticate },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      const order = await prisma.order.findUnique({
        where: { id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order || order.userId !== request.userId) {
        return reply.status(404).send({ error: "Pedido não encontrado" });
      }

      return reply.send(order);
    },
  );
}
