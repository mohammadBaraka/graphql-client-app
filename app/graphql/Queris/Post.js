import { gql, useQuery } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      id
      title
      desc
      img
      Users {
        id
        name
        img
      }
      comments {
        id
        title
        usersId
        postsId
        user {
          id
          name
          img
        }
      }
      likes {
        id
        usersId
      }
      Users {
        id
        name
      }
      createdAt
    }
  }
`;

const GET_POST_BY_CATEGOYR = gql`
  query getPostByCategory($id: String) {
    getPostByCategory(id: $id) {
      id
      title
      desc
      img
      comments {
        id
      }
      likes {
        id
        usersId
      }
    }
  }
`;

const GET_POST_BY_TITLE = gql`
  query getPostByTitle($title: String) {
    getPostByTitle(title: $title) {
      id
      title
      desc
      img
      usersId
    }
  }
`;

const GET_Post = gql`
  query getPost($id: String) {
    getOnePost(id: $id) {
      id
      title
      desc
      img
      comments {
        id
        title
      }
      categories {
        id
      }
      usersId
      Users {
        id
        name
        img
      }
    }
  }
`;

export const GtAllPosts = () => {
  const { data, error, loading } = useQuery(GET_ALL_POSTS);

  return { data, error, loading };
};

export const GetPost = (id) => {
  const { data, error, loading } = useQuery(GET_Post, {
    variables: { id },
  });
  return { data, error, loading };
};

export const GetPostByTitle = (title) => {
  const { data, error, loading } = useQuery(GET_POST_BY_TITLE, {
    variables: { title },
  });
  return { data, error, loading };
};

export const GetPostByCategory = (id) => {
  const { data, error, loading } = useQuery(GET_POST_BY_CATEGOYR, {
    variables: { id },
  });
  return { data, error, loading };
};
