import { gql } from "@apollo/client";

export const Tables = gql`
  query Query {
    Tables {
      _id
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
