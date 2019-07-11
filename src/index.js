import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";
import path from "path";

import { resolvers } from "./resolvers";

import { prisma } from "./generated/prisma-client";

const typeDefs = importSchema(path.resolve("src/schema.graphql"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    req,
    prisma
  }),
  formatError: err => {
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }
    return err;
  }
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
