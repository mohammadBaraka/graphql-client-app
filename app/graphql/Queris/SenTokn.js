import { gql, useQuery } from "@apollo/client";

export const SEND_TOKEN = gql`
  query {
    sendToken {
      id
      name
      img
    }
  }
`;

export const UseSendToken = () => {
  const { data, error, loading } = useQuery(SEND_TOKEN);
  return { data, error, loading };
};
