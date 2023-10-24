const axios = require("axios");
const redis = require("../configs");

const SECOND_SERVER_URL =
  process.env.SECOND_SERVER_URL || "http://server-user:4001";

const typeDefinitionUser = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type User {
    _id: ID,
    username: String,
    email: String
  }

  type UserResponse {
    statusCode: Int,
    data: [User]
  }

  type UserDeleteResponse {
    statusCode: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: UserResponse,
    user(userId: String): User
  }

  type Mutation {
    postUser(email: String!, username: String!): User

    deleteUser(userId: String): UserDeleteResponse
  }
`;

const resolversUser = {
  Query: {
    users: async () => {
      let usersCache = await redis.get("user:get");

      if (usersCache) {
        let userResult = JSON.parse(usersCache);
        return userResult;
      }

      const { data: response } = await axios.get(`${SECOND_SERVER_URL}/users`);

      redis.set("user:get", JSON.stringify(response), "EX", 900);
      return response;
    },
    user: async (_, { userId: id }) => {
      const { data: response } = await axios.get(
        `${SECOND_SERVER_URL}/users/${id}`
      );

      return response.data;
    },
  },
  Mutation: {
    postUser: async (_, { email, username }) => {
      const { data: response } = await axios.post(
        `${SECOND_SERVER_URL}/users`,
        {
          email,
          username,
        }
      );

      response._id = response.id;
      delete response.id;

      const keys = await redis.keys("user:*");
      if (keys.length > 0) {
        await redis.del(keys);
      }

      return response;
    },
    deleteUser: async (_, { userId: id }) => {
      const { data } = await axios.delete(`${SECOND_SERVER_URL}/users/${id}`);
      const keys = await redis.keys("user:*");
      if (keys.length > 0) {
        await redis.del(keys);
      }
      return data;
    },
  },
};

module.exports = { typeDefinitionUser, resolversUser };
