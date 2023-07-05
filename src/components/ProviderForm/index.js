import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ButtonGeneral } from "../ButtonGeneral";
import { AlertGeneral } from "../AlertGeneral";

export const ProviderForm = ({
  onSubmit,
  initialValues,
  loadRegisterProvider,
  alertSaveTrue,
  alertSaveFalse,
}) => {
  return (
    <Box margin={4} border={"1px solid"} p={4} borderRadius={9}>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {() => (
          <Form>
            <Grid gap={2}>
              <Heading textAlign="center">Proveedores</Heading>
              <FormControl id="name">
                <FormLabel>Nombre</FormLabel>
                <Field
                  name="name"
                  as={Input}
                  type="text"
                  placeholder="Nombre del Proveedor"
                  required={true}
                />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Telefono</FormLabel>
                <Field
                  name="phone"
                  as={Input}
                  type="text"
                  placeholder="Telefono"
                />
              </FormControl>
              <FormControl id="address">
                <FormLabel>Direccion</FormLabel>
                <Field
                  name="address"
                  as={Input}
                  type="text"
                  placeholder=" Direccion"
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Correo Electrónico</FormLabel>
                <Field
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="your-email@example.com"
                />
              </FormControl>

              <ButtonGeneral
                title={
                  loadRegisterProvider ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="black"
                      size="md"
                    />
                  ) : (
                    "Registrar"
                  )
                }
                colorA={"blue.400"}
                colorB={"blue.500"}
                type={"submit"}
              />
              {
                alertSaveTrue && (
                  <AlertGeneral 
                  status={'success'}
                  title={'Accion realizada con Exito!'}
                  description={'Los datos fueron agregados o actualizados correctamente.'}
                  />
                )
              }
              {
                alertSaveFalse && (
                  <AlertGeneral status={'error'}
                  title={'Ocurrio un error'}
                  description={'Vuelve a ingresar los datos correctamente.'}
                  />
                )
              }
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
