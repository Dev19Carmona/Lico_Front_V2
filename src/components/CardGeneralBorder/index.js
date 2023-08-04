import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Grid,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import Link from "next/link";
import { SubtitleGeneral } from "../SubtitleGeneral";
import { motion } from "framer-motion";

export const CardGeneralBorder = ({
  data = {},
  onClick = () => {},
  onDelete = () => {},
  src = "https://media.istockphoto.com/id/1294603953/es/vector/parte-diagonal-de-las-rayas-negras-abstractas.jpg?s=612x612&w=0&k=20&c=X03bsGgJqAhik-P5OOreFc4eNIrDHUF2sswozJQ97qE=",
  imageSize = "50px",
  imageType = "none",
  href = "",
  firstIcon = <FaEdit fontSize={20} />,
  disguiseBack = false,
}) => {
  const { firstPlace, secondPlace, thirdPlace, fourthPlace } = data;

  return (
    <motion.div whileHover={{ translateY: -5 }}>
      <Center py={6}>
        <Box
          w="90%" // Ajusta el ancho del contenedor principal según tus necesidades
          h="100%" // Ajusta la altura del contenedor principal según tus necesidades
          rounded={"sm"}
          my={5}
          mx={[0, 5]}
          overflow={"hidden"}
          bg="white"
          border={"1px"}
          borderColor="black"
          boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        >
          <Link href={href}>
            <Box
              cursor={"pointer"}
              h={imageSize}
              borderBottom={"1px"}
              borderColor="black"
            >
              <Img
                src={src}
                fill={true}
                style={{ objectFit: imageType }}
                h="full"
                w="full"
                roundedTop={"sm"}
                alt={"Blog Image"}
              />
            </Box>
          </Link>
          <Box p={4}>
            <Box
              bg="black"
              display={"inline-block"}
              px={2}
              py={1}
              color="white"
              mb={2}
            >
              <Text letterSpacing={2} fontSize={"xl"} fontWeight="medium">
                {firstPlace}
              </Text>
            </Box>
            <SubtitleGeneral data={secondPlace} />

            <Box mt={3} color={"black.500"} noOfLines={2}>
              {thirdPlace}
            </Box>
          </Box>
          {!disguiseBack && (
            <HStack borderTop={"1px"} color="black">
              <Flex
                onClick={onClick}
                p={4}
                alignItems="center"
                justifyContent={"space-between"}
                roundedBottom={"sm"}
                cursor={"pointer"}
                w="full"
              >
                <Grid fontSize={"md"} fontWeight={"semibold"}>
                  {fourthPlace}
                </Grid>

                {firstIcon}
              </Flex>

              <Flex
                p={4}
                alignItems="center"
                justifyContent={"space-between"}
                roundedBottom={"sm"}
                borderLeft={"1px"}
                cursor="pointer"
              >
                <Box
                  onClick={() => {
                    onDelete();
                  }}
                >
                  <FiDelete fontSize={"24px"} />
                </Box>
              </Flex>
            </HStack>
          )}
        </Box>
      </Center>
    </motion.div>
  );
};
