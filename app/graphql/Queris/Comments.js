import { gql, useQuery } from "@apollo/client";
export const GET_ALL_COMMENTS = gql`
  query {
    getAllComments {
      id
      title
      user {
        id
        name
        img
      }
    }
  }
`;

export const GetAllComments = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMMENTS);

  return { loading, error, data };
};
