import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { env } from "../env";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    // Valida os dados de registro usando o Zod
    const { name, email, password } = registerSchema.parse(request.body);

    // Verifica se o email já está em uso
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      // Se o email já estiver em uso, retorna um erro 400 com uma mensagem apropriada
      return reply.status(400).send({ error: "Esse email já está em uso" });
    }

    // Hash a senha usando bcrypt antes de armazená-la no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);
    // Cria um novo usuário no banco de dados usando o Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Remove a senha do objeto de usuário antes de enviá-lo na resposta
    const { password: _, ...userWithoutPassword } = user;
    // Retorna o usuário criado (sem a senha) com um status 201 (Created)
    return reply.status(201).send(userWithoutPassword);
  });

  app.post("/login", async (request, reply) => {
    const { email, password } = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.status(400).send({ error: "Email ou senha inválidos" });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.status(401).send({ error: "Email ou senha inválidos" });
    }

    // Gera um token JWT contendo o ID do usuário como payload, usando a chave secreta definida nas variáveis de ambiente e configurando o token para expirar em 1 hora
    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // Retorna o token JWT gerado para o cliente
    return reply.send({ token });
  });
}
