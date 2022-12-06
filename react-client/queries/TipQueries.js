import { gql } from "@apollo/client";

const QUERY_TIPS = gql`
  query GetTips {
    tips {
      _id
      title
      videoLink
    }
  }
`;

const ADD_TIP = gql`
  mutation AddTip($title: String!, $videoLink: String!) {
    addTip(title: $title, videoLink: $videoLink) {
      _id
    }
  }
`;

export { QUERY_TIPS, ADD_TIP };
