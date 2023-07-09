import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export const CardHorizontal = ({
  data = {
    image:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    head: "Heading",
    body: "Body",
    button: "Button",
  },
}) => {
  const { image, head, body, button } = data;
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      w="100%" // Ajusta el ancho del contenedor principal según tus necesidades
      h="100px" // Ajusta la altura del contenedor principal según tus necesidades
      rounded={"sm"}
    >
      <Image
        fill={true}
        style={{ objectFit: "contain" }}
        maxW={{ base: "100%", sm: "200px" }}
        h="full"
        w="full"
        src={image}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{head}</Heading>

          <Text py="2">{body}</Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            {button}
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};
