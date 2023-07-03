import { ChatButton } from "@/components/ChatButton";
import { ChatWindow } from "@/components/ChatWindow";
import { useChat } from "@/hooks/useChat";
import { Flex } from "@chakra-ui/react";

export const ChatContainer = () => {
  const {
    showChat,
    handleShowChat,
    localSession,
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
  } = useChat();
  return (
    <>
      {localSession && showChat && (
        <ChatWindow
          chats={chats}
          handleCreateChat={handleCreateChat}
          handleNavOptions={handleNavOptions}
          navOptions={navOptions}
          handleGoChat={handleGoChat}
          chat={chat}
          handleAddMessage={handleAddMessage}
          initialValAddMessage={initialValAddMessage}
          notification={notification}
          newMessage={newMessage}
        />
      )}
      {localSession && (
        <Flex justifyContent="center" alignItems="center">
          <ChatButton handleShowChat={handleShowChat} />
        </Flex>
      )}
    </>
  );
};
