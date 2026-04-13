import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { authenticate } from "../middlewares/authenticate";
import z from "zod";

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
    const result = createOrderSchema.safeParse(request.body);

    if (!result.success) {
      return reply.status(400).send({ error: result.error.format() });
    }

    const order = await prisma.order.create({
      data: {
        userId: request.userId,
      },
    });

    const productsIds = result.data.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productsIds } },
    });

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
}
