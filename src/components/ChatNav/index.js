import { useChat } from "@/hooks/useChat";
import { Box, Flex } from "@chakra-ui/react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

export const ChatNav = ({ handleNavOptions }) => {
  return (
    <Flex
      p={1}
      borderRadius={9}
      border={"1px solid"}
      justifyContent={"space-around"}
      alignItems={'center'}
      h={50}
      w={'100%'}
    >
      <Box
        onClick={() => {
          handleNavOptions("messages");
        }}
        cursor={"pointer"}
      >
        <BsFillChatDotsFill fontSize={25} />
      </Box>
      <Box
        onClick={() => {
          handleNavOptions("friends");
        }}
        cursor={"pointer"}
      >
        <FaUserFriends fontSize={25} />
      </Box>
    </Flex>
  );
};
