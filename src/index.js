import { GraphQLServer } from "graphql-yoga";

import { resolvers } from "./resolvers";

import { prisma } from "./generated/prisma-client";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(req) {
    return {
      prisma,
      req
    };
  }
});

server.start(() =>
  console.log("Graphql API Server is running on localhost:4000")
);
