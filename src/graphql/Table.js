import { gql } from "@apollo/client";

export const Tables = gql`
  query Query($filters: Filters_table, $options: Options) {
  Tables(filters: $filters, options: $options) {
    _id
    isStay
    bills {
      isPaid
      _id
      products {
        _id
        amount
        image
        name
        price
        soldCount
        isStay
        isLeave
        isRemove
      }
    }
    name
  }
}
`;
export const Table_save = gql`
  mutation Mutation($tableData: Property_data) {
    Table_save(tableData: $tableData)
  }
`;
export const Table_delete = gql`
  mutation Mutation($_id: String!) {
    Table_delete(_id: $_id)
  }
`;
