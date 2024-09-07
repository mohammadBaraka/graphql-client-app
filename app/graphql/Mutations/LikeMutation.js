import { gql, useMutation } from "@apollo/client";
import { GET_ALL_POSTS } from "../Queris/Post";
const TOGGLE_COMMENT = gql`
  mutation toggleLike($usersId: String, $postsId: String) {
    toggleLike(input: { usersId: $usersId, postsId: $postsId })
  }
`;

export const ToggleLike = () => {
  const [toggleLike, data, error, loading] = useMutation(TOGGLE_COMMENT, {
    update(cashe, data) {
      console.log(data);
    },
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  return { toggleLike, data, error, loading };
};
