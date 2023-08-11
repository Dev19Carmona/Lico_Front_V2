
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BLUE_BG_IMAGE } from "../../../config/Constants";

export const CardMiniNice = ({onClick = () =>{}, data={image:BLUE_BG_IMAGE, firstBox:"First", secondBox:"Second", title:"Title"}}) => {
    const {image, firstBox, secondBox, title} = data;
    return(
        <motion.div whileHover={{ translateY: -5 }}>
          <Flex
          p={2}
          cursor={'pointer'}
            _hover={{ shadow: "xl", border: "0.5px solid grey" }}
            bg={"white"}
            borderRadius={9}
            onClick={() => {
              onClick();
            }}
            h="full"
            w="full"
            flexDirection="column"
            alignItems={'center'}
          >
            <Image
              w={"100px"}
              h={"90px"}
              fill={true}
              style={{ objectFit: "contain" }}
              maxW={{ base: "100%", sm: "200px" }}
              src={image}
              alt="ProductImage"
            />
            {/* <Divider/> */}
            <Flex p={2} justifyContent={"space-between"}>
              <Box
                bg="black"
                display={"inline-block"}
                px={2}
                py={1}
                color="white"
                mb={2}
                borderRadius={2}
              >
                <Text fontSize={'xs'}>
              {firstBox}
                </Text>
              </Box>
              <Box
                bg="gray.200"
                display={"inline-block"}
                px={2}
                py={1}
                color="black"
                mb={2}
                borderRadius={2}
              >
                <Text fontSize={'xs'}>
              {secondBox}
                </Text>
                  
                
                
              </Box>
            </Flex>
            <Divider />
            <Box m={1}>
              <Text fontWeight={"semibold"} letterSpacing={1} fontSize={"xs"}>
                {title}
              </Text>
            </Box>
          </Flex>
        </motion.div>
    )
}