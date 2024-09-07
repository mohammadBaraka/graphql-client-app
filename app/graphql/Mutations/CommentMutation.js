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
const DELETE_COMMENT = gql`
  mutation deleteComment($id: String) {
    deleteComment(id: $id)
  }
`;

const UPDATE_COMMENT = gql`
  mutation updateComment(
    $id: String
    $title: String
    $postsId: String
    $usersId: String
  ) {
    updateComment(
      input: { id: $id, title: $title, postsId: $postsId, usersId: $usersId }
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

export const UpdateCommentMutation = () => {
  const [updateComment, { data, error, loading }] = useMutation(
    UPDATE_COMMENT,
    {
      refetchQueries: [{ query: GET_ALL_POSTS }],
      update(cache, { data }) {
        if (data) {
          console.log("Comment updated:", data);
        } else {
          console.error("Failed to update comment");
        }
      },
    }
  );
  return {
    updateComment,
    data,
    error,
    loading,
  };
};

export const DeleteComeent = () => {
  const [deleteComment, { data, error, loading }] = useMutation(
    DELETE_COMMENT,
    {
      refetchQueries: [{ query: GET_ALL_POSTS }],
      update(cache, { data }) {
        console.log("Comment deleted:", data);
      },
    }
  );
  return {
    deleteComment,
    data,
    error,
    loading,
  };
};
