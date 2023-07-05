import { gql } from "@apollo/client";
export const SubCategories = gql`
  query Query($filters: Filters_subcategory, $options: Options) {
    SubCategories(filters: $filters, options: $options) {
      _id
      category {
        name
      }
      name
    }
  }
`;

export const SubCategory_save = gql`
  mutation Mutation($subCategoryData: Property_data_subCategory) {
    SubCategory_save(subCategoryData: $subCategoryData)
  }
`;

export const subCategoriesTotal = gql`
  query Query {
    subCategoriesTotal
  }
`;

export const SubCategory_delete = gql`
  mutation Mutation($_id: String!) {
    SubCategory_delete(_id: $_id)
  }
`;
