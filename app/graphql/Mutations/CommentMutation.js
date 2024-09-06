import { gql, useMutation } from "@apollo/client";
import { GET_ALL_COMMENTS } from "../Queris/Comments";
import { GET_ALL_POSTS } from "../Queris/Post";

const CREATE_COMMENT = gql`
  mutation createComment($title: String, $postsId: String, $usersId: String) {
    createComment(
      input: { title: $title, postsId: $postsId, usersId: $usersId }
    )
  }
`;

export const CreateCommentMutation = () => {
  const [createComment, { data, error, loading }] = useMutation(
    CREATE_COMMENT,
    {
      refetchQueries: [{ query: GET_ALL_POSTS }],
      update(cache, { data }) {
        if (data) {
          console.log("Comment created:", data);
        } else {
          console.error("Failed to create comment");
        }
      },
    }
  );
  return {
    createComment,
    data,
    error,
    loading,
  };
};
