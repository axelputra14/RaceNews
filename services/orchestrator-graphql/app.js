const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefinitionUser, resolversUser } = require("./schemas/user");
const { typeDefinitionPost, resolversPost } = require("./schemas/post");

(async () => {
  const server = new ApolloServer({
    typeDefs: [typeDefinitionUser, typeDefinitionPost],
    resolvers: [resolversUser, resolversPost],
    introspection: true, // supaya bisa debug di production. In real world don't do this
  });

  const { url } = await startStandaloneServer(server, {
    listen: 80,
  });
  console.log(`Race distance is ${url} kms`);
})();
