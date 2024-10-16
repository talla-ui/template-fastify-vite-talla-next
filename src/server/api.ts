import { FastifyPluginAsync } from "fastify";

let count = 0;

export const api: FastifyPluginAsync = async (fastify) => {
  // GET /count: returns the current count
  // Response: { count: number }
  fastify.get("/count", async (request, reply) => {
    reply.send({ count });
  });

  // POST /count: updates the current count
  // Body: { count: number }
  fastify.post("/count", async (request, reply) => {
    if (typeof request.body === "object" && "count" in request.body!) {
      count = +(request.body.count || 0);
    }
    reply.status(204);
  });
};
