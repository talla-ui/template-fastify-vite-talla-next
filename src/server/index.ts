import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import * as path from "path";
import { api } from "./api.js";

const fastify = Fastify({ logger: true });

fastify.register(fastifyStatic, {
  root: path.resolve("dist"),
});

fastify.register(api, { prefix: "/api" });

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) throw err;
  console.log("Server is now listening at " + address);
});
