import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
export const CardHorizontal = ({
  onDelete = () => {},
  onClick = () => {},
  parameter,
  data = {
    image:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    head: "Heading",
    body: "Body",
    title: "Title",
    secondTitle: "",
  },
}) => {
  const { image, head, body, title, secondTitle } = data;
  return (
    <Container mb={3}>
      <motion.div whileHover={{ translateY: -5 }}>
        <Flex
          rounded="md"
          boxShadow={useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "2px 4px 6px rgba(9, 17, 28, 0.9)"
          )}
          textAlign="left"
          align="start"
          role="group"
          overflow="hidden"
          ml={-9}
        >
          <HStack
            py={6}
            px={5}
            spacing={4}
            as={Flex}
            justifyContent={"space-between"}
            bg={useColorModeValue("gray.100", "gray.800")}
            w="100%"
          >
            <Flex
              justifyContent="space-around"
              justify="center"
              alignItems="center"
              rounded="lg"
              bg="#fff"
              position="relative"
              w={20}
              h={20}
              overflow="hidden"
              lineHeight={0}
              boxShadow="inset 0 0 1px 1px rgba(0, 0, 0, 0.015)"
            >
              <Image
                fill={true}
                style={{ objectFit: "contain" }}
                maxW={{ base: "100%", sm: "200px" }}
                h="full"
                w="full"
                src={image}
                alt="ProductImage"
              />
            </Flex>
            <VStack spacing={0} align="start" maxW="lg" h="100%">
              <Text
                as="h2"
                fontSize="lg"
                fontWeight="extrabold"
                letterSpacing={1}
              >
                {head}
              </Text>
              <Flex justifyContent="space-between" gap={100} mt={3}>
                <Text as="h3" fontSize="md" noOfLines={2} color="gray.500">
                  {title}
                </Text>

                <Text color="#b32821">{secondTitle}</Text>
              </Flex>
            </VStack>
            <Flex direction={"column"} justifyContent={"end"} gap={3}>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={9}
                w={"100%"}
                bg="blue.700"
                _hover={{ background: "blue.800" }}
              >
                <Text color={"white"}>{body}</Text>
              </Flex>
              <Flex gap={2}>
                <Button
                  onClick={() => {
                    if (body > 1) {
                      parameter.amount = -1;
                      onClick(parameter);
                    }
                  }}
                  bg="blue.400"
                  _hover={{ background: "blue.500" }}
                >
                  <CiSquareMinus color="white" fontSize={24} />
                </Button>
                <Button
                  onClick={() => {
                    onClick(parameter);
                  }}
                  bg="blue.400"
                  _hover={{ background: "blue.500" }}
                >
                  <CiSquarePlus color="white" fontSize={24} />
                </Button>
              </Flex>
              <Flex>
                <Button
                  onClick={() => {
                    onDelete()
                  }}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={9}
                  w={"100%"}
                  bg="red.400"
                  _hover={{ background: "red.500" }}
                >
                  <BsTrash color="white" fontSize={25} />
                </Button>
              </Flex>
            </Flex>
          </HStack>
        </Flex>
      </motion.div>
    </Container>
  );
};
