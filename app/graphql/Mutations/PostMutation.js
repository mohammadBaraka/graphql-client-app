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

export const CreatePostMutation = () => {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
    update(cash, data) {
      console.log(data);
    },
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });
  return { createPost, data, loading, error };
};
