import { gql, useQuery } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      name
      email
      token
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: String) {
    getUser(id: $id) {
      id
      name
      img
      posts {
        id
        title
        desc
        img
        comments {
          id
        }
        likes {
          id
          usersId
        }
      }
    }
  }
`;

export const GetAllUsers = () => {
  const { data, error, loading } = useQuery(GET_ALL_USERS, {
    pollInterval: 5000,
  });
  return { data, error, loading };
};

export const GetUser = (id) => {
  const { data, error, loading } = useQuery(
    GET_USER,

    {
      variables: { id },
      pollInterval: 5000,
    }
  );
  return { data, error, loading };
};
