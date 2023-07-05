import { Box, Heading, Text } from "@chakra-ui/react";
import { AiFillWarning } from "react-icons/ai";
import { ButtonGeneral } from "../ButtonGeneral";
export const AlertDeleteGeneral = ({ title, description, onSubmit = () => {} }) => {
  return (
    <Box gap={2} py={10} px={6}>
      <Box textAlign="center">
        <AiFillWarning fontSize={40} color="#F56565"/>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {title}
      </Heading>
      <Text color="gray.500">{description}</Text>
      <ButtonGeneral onClick={onSubmit} title = {'Eliminar'} colorA="#F56565" colorB="#C53030"/>
    </Box>
  );
};
