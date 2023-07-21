import { gql } from "@apollo/client";

export const Bills = gql`
  query Query($filters: Filters_bills) {
    Bills(filters: $filters) {
      _id
      isPaid
      isRemove
      tableId
      table {
        _id
        isStay
        name
      }
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

export const subNewBill = gql`
  subscription Subscription {
    subNewBill {
      _id
      isPaid
      isRemove
      paymentMethod
      products {
        amount
        name
        price
        soldCount
      }
      table {
        name
      }
      total

      tableId
      seller {
        _id
        email
        fullName
        rolId
      }
    }
  }
`;
