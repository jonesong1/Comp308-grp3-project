import { gql } from "@apollo/client";

const QUERY_NURSE = gql`
  query GetNurse($id: String!) {
    nurse(id: $id) {
      _id
      firstName
      lastName
      username
    }
  }
`;

const QUERY_NURSES = gql`
  query GetNurse {
    nurses {
      _id
      firstName
      lastName
      username
    }
  }
`;

const ADD_NURSE = gql`
  mutation AddNurse(
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
  ) {
    AddNurse(
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
    ) {
      _id
    }
  }
`;

const UPDATE_NURSE = gql`
  mutation UpdateNurse(
    $id: String!
    $firstName: String!
    $lastName: String!
    $username: String!
    $password: String!
  ) {
    updateNurse(
      id: $id
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
    ) {
      _id
    }
  }
`;

const DELETE_NURSE = gql`
  mutation DeleteNurse($id: String!) {
    deleteNurse(id: $id) {
      _id
    }
  }
`;

export {
  QUERY_NURSE,
  QUERY_NURSES,
  ADD_NURSE,
  UPDATE_NURSE,
  DELETE_NURSE,
};
