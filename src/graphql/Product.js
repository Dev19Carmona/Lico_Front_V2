import { gql } from "@apollo/client";
export const Products = gql`
  query Query($filters: Product_filters, $options: Options) {
    Products(filters: $filters, options: $options) {
      _id
      amount
      provider {
        _id
        address
        email
        name
        phone
        salesManager
      }
      category {
        _id
        name
      }
      createdAt
      description
      image
      isRemove
      iva
      name
      price
      categoryId
      providerId
      subCategoryId
      soldCount
      isLeave
      isStay
      subCategory {
        _id
        name
      }
      updatedAt
      priceA
      priceB
    }
  }
`;

export const productsTotal = gql`
  query Query {
    productsTotal
  }
`;

export const Product_save = gql`
  mutation Mutation($productData: Product_data) {
    Product_save(productData: $productData)
  }
`;

export const Product_delete = gql`
  mutation Product_delete($_id: String!) {
    Product_delete(_id: $_id)
  }
`;
