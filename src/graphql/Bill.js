import { gql } from "@apollo/client";

export const Bills = gql`
  query Query($filters: Filters_bills) {
    Bills(filters: $filters) {
      _id
      isPaid
      isRemove
      tableId
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
      total
    }
  }
`;
export const Bill_save = gql`
  mutation Mutation($billData: Bill_data) {
    Bill_save(billData: $billData)
  }
`;
export const Bill_delete = gql`
  mutation Mutation($_id: String!) {
    Bill_delete(_id: $_id)
  }
`;
