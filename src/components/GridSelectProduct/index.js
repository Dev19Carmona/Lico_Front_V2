import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";
import { Box, Divider, Flex, Grid, GridItem, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SubtitleGeneral } from "../SubtitleGeneral";

export const GridSelectProduct = ({ data, onClick, isStay }) => {
  const { convertPrice } = useFunctionsGeneral();

  return (
    <SimpleGrid
      
      cursor={"pointer"}
      columns={{ base: 3, md: 5, lg: 5 }}
      gap={7}
    >
      {data?.map((element, index) => (
        <motion.div whileHover={{ translateY: -5 }} key={index}>
          <Flex
          _hover={{ shadow: "xl", border: "0.5px solid grey" }}
            bg={"white"}
            borderRadius={9}
            onClick={() => {
              onClick({
                _id: element._id,
                name: element.name,
                price: isStay
                  ? convertPrice(element.isStay, element.price)
                  : convertPrice(element.isLeave, element.price),
                amount: 1,
                image: element.image,
                remaining: element.amount,
              });
            }}
            h="full"
              w="full"
            rowSpan={1}
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
            <Flex p={2} justifyContent={'space-between'}>
              <Text fontSize={'sm'}>{element.name}</Text>
              <SubtitleGeneral data={element.amount} />
            </Flex>
          </Flex>
        </motion.div>
      ))}
    </SimpleGrid>
  );
};
