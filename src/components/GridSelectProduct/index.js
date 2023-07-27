import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";
import { Grid, GridItem, Image, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const GridSelectProduct = ({ data, onClick, isStay }) => {
  const { convertPrice } = useFunctionsGeneral();

  return (
    <SimpleGrid cursor={"pointer"} columns={{base:3, md:5, lg:5}} gap={3}>
      {data?.map((element, index) => (
        <motion.div whileHover={{ translateY: -5 }} key={index}>
          <GridItem
            _hover={{ shadow: "xl", border: "0.5px solid grey" }}
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
            w={"90px"}
            h={"90px"}
            rowSpan={1}
            colSpan={1}
            bg={"white"}
          >
            <Image
              fill={true}
              style={{ objectFit: "contain" }}
              maxW={{ base: "100%", sm: "200px" }}
              h="full"
              w="full"
              src={element.image}
              alt="ProductImage"
            />
          </GridItem>
        </motion.div>
      ))}
    </SimpleGrid>
  );
};
