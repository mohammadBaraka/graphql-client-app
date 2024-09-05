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
  query getUser($id: String!) {
    getUser(id: $id) {
      id
      name
      email
      token
      createdAt
      updatedAt
    }
  }
`;

export const GetAllUsers = () => {
  const { data, error, loading } = useQuery(GET_ALL_USERS, {
    pollInterval: 5000,
  });
  return { data, error, loading };
};
