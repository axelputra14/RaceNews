import { gql } from "@apollo/client";

export const GET_NEWS = gql`
  query GetNewsQuery {
    posts {
      data {
        id
        title
        slug
        content
        imgUrl
        createdAt
        Category {
          name
        }
      }
    }
  }
`;

export const GET_NEWS_BY_ID = gql`
  query GetPostById($postId: Int) {
    post(postId: $postId) {
      id
      title
      slug
      content
      imgUrl
      authorId
      createdAt
      Category {
        name
      }
      Tags {
        name
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: String) {
    user(userId: $userId) {
      _id
      email
      username
    }
  }
`;
