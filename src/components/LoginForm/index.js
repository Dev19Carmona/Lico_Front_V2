import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spinner,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ButtonGeneral } from "../ButtonGeneral";
import { useRegisterLogin } from "@/hooks/useRegisterLogin";
import { AlertGeneral } from "../AlertGeneral";
import { LoadingGeneral } from "../LoadingGeneral";

export const LoginForm = () => {
  const {
    initialValLogin,
    handleUserLogin,
    alertLogInTrue,
    alertLogInFalse,
    loadLogin,
  } = useRegisterLogin();
  return (
    <Box margin={4} border={"1px solid"} p={4} borderRadius={9}>
      <Formik onSubmit={handleUserLogin} initialValues={initialValLogin}>
        {() => (
          <Form>
            <Grid gap={5}>
              <Heading>Log In</Heading>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Field
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="your-email@example.com"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Field
                  name="password"
                  as={Input}
                  type="password"
                  placeholder="********"
                />
              </FormControl>
              <ButtonGeneral
                title={
                  "Entrar"
                }
                colorA={"green.400"}
                colorB={"green.500"}
                type={"submit"}
              />
            </Grid>
          </Form>
        )}
      </Formik>
      {
        loadLogin&&
        <LoadingGeneral/>

      }
      {alertLogInTrue && (
        <AlertGeneral
          status={"success"}
          title={"Inicio de session correcto"}
          description={
            "Ya puedes darle click al boton LogIn para iniciar session. Nos vemos!"
          }
        />
      )}
      {alertLogInFalse && (
        <AlertGeneral
          status={"error"}
          title={"Ocurrio un error"}
          description={"Vuelve a ingresar los datos correctamente."}
        />
      )}
    </Box>
  );
};
