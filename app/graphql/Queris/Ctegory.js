import { gql, useQuery } from "@apollo/client";
// dfdsf
export const GET_ALL_CATEGORIES = gql`
  query {
    getAllCategories {
      id
      title
    }
  }
`;

export const GetAllCategories = () => {
  const { data, error, loading } = useQuery(GET_ALL_CATEGORIES);

  return { data, error, loading };
};
