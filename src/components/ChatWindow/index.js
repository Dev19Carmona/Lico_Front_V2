import { Button, Flex, Grid, Input, Textarea } from "@chakra-ui/react";
import { ChatFriendList } from "../ChatFriendList";
import { ChatNav } from "../ChatNav";
import { ChatMessagesList } from "../ChatMessagesList";
import { MessagesWindow } from "../MessagesWindow";

export const ChatWindow = ({
  navOptions,
  handleNavOptions,
  handleCreateChat,
  chats,
  handleGoChat,
  chat,
  handleAddMessage,
  initialValAddMessage,
  notification,
  newMessage,
}) => {
  return (
    <Grid
      gap={10}
      position="fixed"
      bottom="70px"
      right="40%"
      zIndex="9999"
      p="20px"
      bg="black"
      borderRadius={9}
      alignItems={"center"}

      /* Estilos adicionales para el grid */
    >
      {navOptions === "friends" && (
        <ChatFriendList handleCreateChat={handleCreateChat} />
      )}
      {navOptions === "messages" && (
        <ChatMessagesList
          handleNavOptions={handleNavOptions}
          handleGoChat={handleGoChat}
          chats={chats}
        />
      )}
      {navOptions === chat?._id && <MessagesWindow newMessage={newMessage} notification={notification} handleAddMessage={handleAddMessage} initialValAddMessage={initialValAddMessage} chat={chat} />}
      <Flex>
        <ChatNav handleNavOptions={handleNavOptions} />
      </Flex>
    </Grid>
  );
};
