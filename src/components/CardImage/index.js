import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

export const CardImage = ({
  data = {
    image:
      "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    title: "Titulo",
    subTitle: "Subtitulo",
    bodyBold: "Bold",
    bodySimple: "BodySimple",
  },
}) => {
  return (
    <Center py={12}>
      <Box
        w="100%" // Ajusta el ancho del contenedor principal según tus necesidades
        h="100%" // Ajusta la altura del contenedor principal según tus necesidades
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        cursor={'pointer'}
      >
        <Box
          rounded={"lg"}
          
        >
          <Image
            fill={true}
            style={{ objectFit: "contain" }}
            maxW={{ base: "100%", sm: "200px" }}
            rounded={"lg"}
            h="100px"
            w="full"
            src={data.image}
            alt="Image"
          />
        </Box>
        <Stack align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {data.title}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {data.subTitle}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              {data.bodyBold}
            </Text>
            <Text textDecoration={"line-through"} color={"gray.600"}>
              {data.bodySimple}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
