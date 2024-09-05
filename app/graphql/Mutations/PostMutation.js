import { GET_ALL_POSTS } from "../Queris/Post";

const { gql, useMutation } = require("@apollo/client");
const CREATE_POST = gql`
  mutation createPost(
    $title: String
    $desc: String
    $usersId: String
    $img: Upload
    $categoryId: [String]
  ) {
    createPost(
      title: $title
      desc: $desc
      usersId: $usersId
      img: $img
      categoryId: $categoryId
    ) {
      id
      title
      img
      Users {
        id
        name
      }
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost(
    $id: String!
    $title: String
    $desc: String
    $usersId: String
    $img: Upload
    $categoryId: [String]
  ) {
    updatePost(
      id: $id
      title: $title
      desc: $desc
      usersId: $usersId
      img: $img
      categoryId: $categoryId
    ) {
      id
      title
      img
      Users {
        id
        name
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id)
  }
`;

export const CreatePostMutation = (inputs) => {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
    update(cash, data) {
      console.log(data);
    },
    variables: inputs,
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });
  return { createPost, data, loading, error };
};

export const UpdatePostMutation = () => {
  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST, {
    update(cash, data) {
      console.log(data);
    },

    refetchQueries: [{ query: GET_ALL_POSTS }],
  });
  return { updatePost, data, loading, error };
};

export const DeltePostMutation = () => {
  const [deletePost, { data, loading, error }] = useMutation(DELETE_POST, {
    update(cash, data) {
      console.log(data);
    },
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });
  return {
    deletePost,
    data,
    loading,
    error,
  };
};
