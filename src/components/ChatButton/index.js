import { Button } from "@chakra-ui/react";
import { BsChatSquareText } from "react-icons/bs";

export const ChatButton = ({handleShowChat}) => {
  return (
    <Button
      onClick={() => {
        handleShowChat();
      }}
      position="fixed"
      bottom="20px"
      right="50%"
      zIndex="9999"
      rounded={"full"}
      px={4}
      fontSize={"sm"}
      bg={"blue.600"}
      color={"white"}
      boxShadow={
        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
      }
      _hover={{
        bg: "blue.700",
      }}
      _focus={{
        bg: "blue.700",
      }}
    >
      <BsChatSquareText />
    </Button>
  );
};
