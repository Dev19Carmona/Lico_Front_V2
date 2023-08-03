import { gql } from "@apollo/client";

export const Bills = gql`
  query Bills(
    $filters: [Filters_bills]
    $options: Options
    $filtersDate: Filters_bills_date
  ) {
    Bills(filters: $filters, options: $options, filters_Date: $filtersDate) {
      _id
      isPaid
      isRemove
      paymentMethod
      billNumber
      products {
        _id
        name
        price
        amount
      }
      seller {
        _id
        fullName
      }
      tableId
      total
      type
      company {
        name
        address
        email
      }
      createdAt
      dateInfo {
        datetime
        day
        hours
        minuts
        month
        seconds
        year
        dayName
        monthName
        weekNumber
      }
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
export const billsTotal = gql`
  query Query($filters: [Filters_bills]) {
    billsTotal(filters: $filters)
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
