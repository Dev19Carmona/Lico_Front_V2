import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ButtonGeneral } from "../ButtonGeneral";
import { useRegisterLogin } from "@/hooks/useRegisterLogin";

export const LoginForm = ({ buttonExtra }) => {
  const { initialValLogin, handleUserLogin } = useRegisterLogin();
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
                title={"Enter"}
                colorA={"green.400"}
                colorB={"green.500"}
                type={"submit"}
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
