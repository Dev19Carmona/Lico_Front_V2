import { Box, Grid, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const CardSelectionGeneral = ({ icono, texto }) => {
  return (
    <motion.div whileHover={{ translateY: -5 }} animate={{ opacity: 1 }}>
      <Grid
        cursor={"pointer"}
        m={"auto"}
        p={20}
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <motion.div whileHover={{ translateY: -5 }}>
          <Box justifySelf={"center"}>{icono}</Box>
        </motion.div>
        <Box
          fontSize={30}
          letterSpacing={2}
          w={"100%"}
          p={10}
          borderTop={"1px solid"}
          justifySelf={"center"}
        >
          {texto}
        </Box>
      </Grid>
    </motion.div>
  );
};
