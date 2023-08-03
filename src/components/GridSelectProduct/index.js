import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";
import { Box, Divider, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SubtitleGeneral } from "../SubtitleGeneral";

export const GridSelectProduct = ({ data, onClick, isStay }) => {
  const { convertPrice } = useFunctionsGeneral();
  return (
    <SimpleGrid
      mt={{ base: 2, md: 5, lg: 5 }}
      cursor={"pointer"}
      columns={{ base: 3, md: 4, lg: 4 }}
      gap={7}
    >
      {data?.map((element, index) => (
        <motion.div whileHover={{ translateY: -5 }} key={index}>
          <Flex
            p={2}
            alignItems={"center"}
            _hover={{ shadow: "xl", border: "0.5px solid grey" }}
            bg={"white"}
            borderRadius={9}
            onClick={() => {
              onClick({
                _id: element._id,
                name: element.name,
                // price: isStay
                //   ? convertPrice(element.isStay, element.price)
                //   : convertPrice(element.isLeave, element.price),
                price: isStay
                ? element.priceB
                : element.priceA,
                amount: 1,
                image: element.image,
                remaining: element.amount,
              });
            }}
            h="full"
            w="full"
            flexDirection="column"
          >
            <Image
              w={"100px"}
              h={"90px"}
              fill={true}
              style={{ objectFit: "contain" }}
              maxW={{ base: "100%", sm: "200px" }}
              src={element.image}
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
                <SubtitleGeneral size="xs" data={element.amount} />
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
                <Text fontSize={"xs"}>
                  $
                  {/* {isStay
                    ? convertPrice(
                        element.isStay,
                        element.price
                      ).toLocaleString()
                    : convertPrice(
                        element.isLeave,
                        element.price
                      ).toLocaleString()
                      } */}
                      {isStay
                    ? Math.floor(element.priceB).toLocaleString()
                    : Math.floor(element.priceA).toLocaleString()
                      }
                </Text>
              </Box>
            </Flex>
            <Divider />
            <Box m={1}>
              <Text fontWeight={"semibold"} letterSpacing={1} fontSize={"xs"}>
                {element.name}
              </Text>
            </Box>
          </Flex>
        </motion.div>
      ))}
    </SimpleGrid>
  );
};
