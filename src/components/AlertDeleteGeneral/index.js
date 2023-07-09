import { Box, Grid, Heading, Spinner, Text } from "@chakra-ui/react";
import { AiFillWarning } from "react-icons/ai";
import { ButtonGeneral } from "../ButtonGeneral";
import { AlertGeneral } from "../AlertGeneral";
export const AlertDeleteGeneral = ({ title, description, onSubmit = () => {}, load, alertSaveFalse, alertSaveTrue }) => {
  return (
    <Grid m={7} gap={5} py={10} px={6}>
      <Box>
        <AiFillWarning  fontSize={40} color="#F56565"/>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {title}
      </Heading>
      <Text color="gray.500">{description}</Text>
      <ButtonGeneral onClick={onSubmit} title = {load ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="black"
                      size="md"
                    />
                  ) : (
                    "Eliminar"
                  )} colorA="#F56565" colorB="#C53030"/>
                  {
                alertSaveTrue && (
                  <AlertGeneral 
                  status={'success'}
                  title={'Accion eliminar realizada con exito!'}
                  description={'Los datos se eliminaron Correctamente'}
                  />
                )
              }
              {
                alertSaveFalse && (
                  <AlertGeneral status={'error'}
                  title={'Ocurrio un error'}
                  description={'No se pudo eliminar...'}
                  />
                )
              }
    </Grid>
  );
};
