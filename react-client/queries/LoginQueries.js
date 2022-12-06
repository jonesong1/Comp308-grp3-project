import { gql } from "@apollo/client";

const QUERY_USER = gql`
  query User($id: String!) {
    user(id: $id) {
      _id
    }
  }
`;

const loginMutationGQL = gql`
  mutation login($username: String!, $password: String!, $userType: String!) {
    login(username: $username, password: $password, userType: $userType) {
      token
      userId
      userType
    }
  }
`;

export { QUERY_USER, loginMutationGQL };
