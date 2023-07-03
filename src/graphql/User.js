import { gql } from "@apollo/client";
export const User_save = gql`
  mutation Mutation($userData: User_data) {
    User_save(userData: $userData)
  }
`;

export const User_login = gql`
  query Query($userLogin: User_login) {
    User_login(userLogin: $userLogin)
  }
`;

export const Users = gql`
  query Query($filters: User_filters) {
    Users(filters: $filters) {
      _id
      address
      avatar
      createdAt
      email
      fullName
      rolId
      gender {
        name
      }
      nit
      phone
      rol {
        name
      }
    }
  }
`;
