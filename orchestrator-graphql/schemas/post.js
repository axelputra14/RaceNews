// type definitionnya dan resolversnya
const axios = require("axios");
const redis = require("../configs");

const FIRST_SERVER_URL =
  process.env.FIRST_SERVER_URL || "http://server-product:4000";

const typeDefinitionPost = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Category{
    name: String
  }

  type Tag{
    name: String
  }

  type Post {
    id: ID,
    title: String,
    slug: String,
    content: String,
    imgUrl: String,
    authorId: String,
    createdAt: String,
    Category: Category,
    Tags: [Tag]
  }

  type PostResponse {
    message: String,
    data: [Post]
  }
  
  type PostUpdateDeleteResponse {
    statusCode: Int
    message: String,
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    posts: PostResponse
    post(postId: Int): Post
  }

  type Mutation {
    postPost(        
        title: String!,
        content: String!,
        imgUrl: String!,
        categoryId: Int!,
        authorId: String!
    ): Post

    deletePost(postId: Int!): PostUpdateDeleteResponse

    updatePost(
        postId: Int!, 
        title: String!,
        content: String!,
        imgUrl: String!,
        categoryId: Int!,
        authorId: String!): PostUpdateDeleteResponse
    }
`;

const resolversPost = {
  Query: {
    posts: async () => {
      try {
        let postsCache = await redis.get("post:get");
        if (postsCache) {
          // if there is cache, use cache

          // redis data is always stored in string
          let postsResult = JSON.parse(postsCache);
          return postsResult;
        }

        const { data: response } = await axios.get(`${FIRST_SERVER_URL}/post`);
        // console.log(response);
        redis.set("post:get", JSON.stringify(response), "EX", 900);
        return response;
      } catch (err) {
        console.log(err);
      }
    },
    post: async (_, { postId: id }) => {
      const { data: response } = await axios.get(
        `${FIRST_SERVER_URL}/post/${id}`
      );

      return response.response;
    },
  },
  Mutation: {
    postPost: async (_, { title, content, imgUrl, categoryId, authorId }) => {
      const { data: response } = await axios.post(`${FIRST_SERVER_URL}/post`, {
        title,
        content,
        imgUrl,
        categoryId,
        authorId,
      });

      const keys = await redis.keys("post:*");
      if (keys.length > 0) {
        await redis.del(keys);
      }

      return response.data;
    },
    updatePost: async (
      _,
      { postId: id, title, content, imgUrl, categoryId, authorId }
    ) => {
      const { data: response } = await axios.put(
        `${FIRST_SERVER_URL}/post/${id}`,
        {
          title,
          content,
          imgUrl,
          categoryId,
          authorId,
        }
      );

      const keys = await redis.keys("post:*");
      if (keys.length > 0) {
        await redis.del(keys);
      }

      return response;
    },
    deletePost: async (_, { postId: id }) => {
      const { data } = await axios.delete(`${FIRST_SERVER_URL}/post/${id}`);
      // console.log(data);

      const keys = await redis.keys("post:*");
      if (keys.length > 0) {
        await redis.del(keys);
      }

      return data;
    },
  },
};

module.exports = { typeDefinitionPost, resolversPost };
