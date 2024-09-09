import { gql, makeVar, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "../Queris/UsersQuery";
import { SEND_TOKEN } from "../Queris/SenTokn";

export let isLoggedInVar = makeVar(false);

const REGISTER_MUTATION = gql`
  mutation register(
    $name: String
    $email: String
    $password: String
    $img: Upload
  ) {
    register(name: $name, email: $email, img: $img, password: $password) {
      name
      email
      img
      createdAt
      updatedAt
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      name
      email
      token
      createdAt
      updatedAt
    }
  }
`;
const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;

export const RegisterMutatin = () => {
  const [register, { data, error, loading }] = useMutation(REGISTER_MUTATION, {
    update(cash, data) {
      console.log("🚀 ~ update ~ data:", data);
    },
  });

  return { register, data, error, loading };
};

export const LoginMutation = (inputs) => {
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [{ query: SEND_TOKEN }],
    onCompleted: () => {
      isLoggedInVar(true);
    },
    update(cash, data) {
      console.log(data);
    },
    variables: inputs,
  });
  return {
    login,
    data,
    error,
    loading,
  };
};

export const LogoutMutation = () => {
  const [logout, { data, error, loading }] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [{ query: SEND_TOKEN }],

    update(cache, data) {
      console.log("🚀 ~ update ~ Logout:", data);
    },
  });
  return {
    logout,
    data,
    error,
    loading,
  };
};
