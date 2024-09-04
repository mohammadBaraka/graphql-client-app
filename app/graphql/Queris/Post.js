import { gql, useQuery } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      id
      title
      desc
      img
      createdAt
      Users {
        id
        name
      }
    }
  }
`;

const GET_Post = gql`
  query getPost($id: String) {
    getOnePost(id: $id) {
      id
      title
      desc
      img
      usersId
      Users {
        name
        img
      }
    }
  }
`;

export const GtAllPosts = () => {
  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  return { data, error, loading };
};

export const GetPost = (id) => {
  const { data, error, loading } = useQuery(GET_Post, {
    variables: { id },
  });
  return { data, error, loading };
};
