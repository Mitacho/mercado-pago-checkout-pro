import "module-alias/register";
import "reflect-metadata";
import "dotenv/config";

import fastify from "fastify";
import mercadopago from "mercadopago";
import fastifyCors from "fastify-cors";
import fastifySession from "fastify-secure-session";
import { ApolloServer } from "apollo-server-fastify";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { buildSchema } from "type-graphql";

import { ProductResolver, UserResolver } from "./resolvers";

import type { FastifyInstance } from "fastify";
import type { ApolloServerPlugin } from "apollo-server-plugin-base";

import {
  ACCESS_TOKEN,
  COOKIE_NAME,
  CORS_ORIGIN_URL,
  PROD,
  SESSION_SECRET,
  SESSION_TTL,
} from "./constants";

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

(async function main(): Promise<void> {
  const app = fastify();
  mercadopago.configure({
    access_token: ACCESS_TOKEN as string,
    integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
  });

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, UserResolver],
    }),
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
    context: ({ request, reply }) => ({ request, reply }),
  });

  await server.start();
  app.register(
    server.createHandler({
      cors: false,
    })
  );
  app.register(fastifyCors, {
    origin: [CORS_ORIGIN_URL as string, "https://studio.apollographql.com"],
    credentials: true,
  });
  app.register(fastifySession, {
    secret: SESSION_SECRET as string,
    salt: (SESSION_SECRET as string).substring(3, 19),
    cookieName: COOKIE_NAME,
    cookie: {
      secure: PROD,
      httpOnly: true,
      sameSite: "lax",
      maxAge: SESSION_TTL,
    },
  });
  const serverUrl = await app.listen(process.env.PORT || 4000, "0.0.0.0");
  console.log(`Server ready at port ${serverUrl}${server.graphqlPath}`);
})().catch((error) => console.error(error));
