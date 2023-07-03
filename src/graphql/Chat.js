import { gql } from "@apollo/client";

export const createChat = gql`
  mutation Mutation($participants: [String!]!) {
    createChat(participants: $participants)
  }
`;

export const getChats = gql`
  query Query($filters: filters_Chat) {
    getChats(filters: $filters) {
      _id
      participants
      messages {
        content
        sender
        timestamp
        _id
      }
    }
  }
`;

export const addMessage = gql`
  mutation Mutation($chatId: ID!, $sender: String!, $content: String!) {
    addMessage(chatId: $chatId, sender: $sender, content: $content) {
      content
    }
  }
`;

export const messageAdded = gql`
  subscription Subscription($chatId: ID!) {
    messageAdded(chatId: $chatId) {
      content
      sender
    }
  }
`;
