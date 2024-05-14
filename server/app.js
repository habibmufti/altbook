import "dotenv/config.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { bookSchema, followSchema, postSchema, userSchema } from "./schema/index.js";
import { bookResolver, followResolver, postResolver, userResolver } from "./resolver/index.js";
import { constraintDirective, constraintDirectiveTypeDefs } from "graphql-constraint-directive";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLError } from "graphql";
import jwt from "./helper/jwt.js";

let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, bookSchema, userSchema, postSchema, followSchema],
  resolvers: [bookResolver, userResolver, postResolver, followResolver],
});
schema = constraintDirective()(schema);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema,
  introspection: true,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
  context: async ({ req }) => {
    return {
      authentication: () => {
        const authHeaders = req.headers.authorization || "";
        const token = authHeaders.split(" ")[1];
        if (!token)
          throw new GraphQLError("invalid access token", {
            extensions: { code: "NOT_AUTHORIZED" },
          });
        const payload = jwt.verifyToken(token);
        return payload;
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
