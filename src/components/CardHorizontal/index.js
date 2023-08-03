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
import { SubtitleGeneral } from "../SubtitleGeneral";
export const CardHorizontal = ({
  onDelete = () => {},
  onClick = () => {},
  onImage = () => {},
  parameter,
  data = {
    image:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    head: "Heading",
    body: "Body",
    title: "Title",
    secondTitle: "Second Title",
    rigthComponent: "",
  },
  showButtons = true,
}) => {
  const { image, head, body, title, secondTitle, rigthComponent } = data;

  return (
    <Container mb={3}>
      <motion.div whileHover={{ translateY: -5 }}>
        <Flex
          cursor={showButtons ? "auto" : "pointer"}
          rounded="md"
          boxShadow={useColorModeValue(
            "0 4px 6px rgba(160, 174, 192, 0.6)",
            "2px 4px 6px rgba(9, 17, 28, 0.9)"
          )}
          textAlign="left"
          align="start"
          role="group"
          overflow="hidden"
        >
          <HStack
            py={2}
            px={2}
            spacing={0}
            as={Flex}
            justifyContent={"space-between"}
            bg={useColorModeValue("gray.100", "gray.800")}
            w="100%"
          >
            <Flex
              onClick={() => {
                onImage();
              }}
              justifyContent="space-around"
              justify="center"
              alignItems="center"
              rounded="lg"
              bg="#fff"
              position="relative"
              w={{ base: 10, md: 20, lg: 20 }}
              h={{ base: 10, md: 20, lg: 20 }}
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
            <VStack spacing={0} align="center" maxW="sm" h="100%">
              <Text
                as="h2"
                fontSize="sm"
                fontWeight="extrabold"
                letterSpacing={1}
              >
                {head}
              </Text>
              <Flex justifyContent="space-between" gap={10} mt={1}>
                <Text as="h3" fontSize="sm" noOfLines={2} color="gray.500">
                  {title}
                </Text>

                <Text color="#b32821">{secondTitle}</Text>
              </Flex>
            </VStack>
            {!showButtons && (
              <Box
                bg="blue.400"
                display={"inline-block"}
                px={2}
                py={1}
                color="white"
                mr={5}
              >
                <SubtitleGeneral size="xs" data={rigthComponent} />
              </Box>
            )}
            {showButtons && (
              <Flex direction={"column"} justifyContent={"end"} gap={1}>
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
                      onDelete();
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
            )}
          </HStack>
        </Flex>
      </motion.div>
    </Container>
  );
};
