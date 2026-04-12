import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "../env";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Extrai o token JWT do cabeçalho de autorização da requisição
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    // Se o cabeçalho de autorização não estiver presente, retorna um erro 401 (Unauthorized) com uma mensagem apropriada
    return reply.status(401).send({ error: "Token não fornecido" });
  }

  // O token JWT geralmente é enviado no formato "Bearer <token>", então extraímos apenas a parte do token
  const token = authHeader.split(" ")[1];
  if (!token) {
    return reply.status(401).send({ error: "Token não fornecido" });
  }

  try {
    // Verifica a validade do token JWT usando a chave secreta definida nas variáveis de ambiente
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    request.userId = decoded.userId;
    
  } catch (err) {
    return reply.status(401).send({ error: "Token inválido" });
  }

  // Se o token for válido, a função de middleware permite que a requisição prossiga para o próximo manipulador de rota
  return;
}
