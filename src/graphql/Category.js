import { gql } from "@apollo/client";
export const Categories = gql`
  query Query($filters: Property_data, $options: Options) {
    Categories(filters: $filters, options: $options) {
      name
      _id
      subCategories {
      _id
      name
    }
    }
  }
`;

export const Category_save = gql`
  mutation Mutation($categoryData: Property_data) {
    Category_save(categoryData: $categoryData)
  }
`;

export const categoriesTotal = gql`
  query Query {
    categoriesTotal
  }
`;

export const Category_delete = gql`
  mutation Mutation($_id: String!) {
    Category_delete(_id: $_id)
  }
`;
