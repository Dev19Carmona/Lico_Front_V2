import { Box, Center, Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";

export const CardGeneralBorderAdd = ({ onClick = () => {} }) => {
  return (
    <motion.div whileHover={{ translateY: -5 }}>
      <Flex
        w={"80%"}
        h={"70%"}
        rounded={"sm"}
        my={12}
        mx={[0, 12]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        cursor={"pointer"}
        onClick={() => {
          onClick();
        }}
        justifyContent={"center"}
        alignItems={"center"}
        //py={6}
      >
        <Flex>
          <AiOutlinePlus fontSize={100} />
        </Flex>
      </Flex>
    </motion.div>
  );
};
