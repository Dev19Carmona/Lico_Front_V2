import { gql } from "@apollo/client";

export const Companies = gql`
  query Query {
    Companies {
      _id
      address
      email
      image
      isRemove
      name
      passwords
    }
  }
`;
