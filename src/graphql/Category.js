import { gql } from "@apollo/client";
export const Categories = gql`
  query Query {
    Categories {
      name
      _id
    }
  }
`;

export const Category_save = gql`
  mutation Mutation($categoryData: Property_data) {
    Category_save(categoryData: $categoryData)
  }
`;
