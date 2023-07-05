import { gql } from "@apollo/client";
export const Providers = gql`
  query Providers($filters: Providers_Filters, $options: Options) {
    providers(filters: $filters, options: $options) {
      _id
      name
      address
      email
      phone
    }
  }
`;

export const Provider_save = gql`
  mutation Mutation($providersData: Providers_Data) {
    Provider_save(providersData: $providersData)
  }
`;

export const Provider_delete = gql`
  mutation Mutation($_id: String!) {
    Provider_delete(_id: $_id)
  }
`;

export const providersTotal = gql`
  query Query {
    providersTotal
  }
`;
