import { gql } from "@apollo/client";
export const Genders = gql`
  query Query {
    Genders {
      _id
      name
    }
  }
`;
