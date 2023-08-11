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
import { COLOR_BUTTON } from "../../../config/Constants";

export const LoginForm = ({initialValLogin, handleUserLogin}) => {
  // const {
  //   initialValLogin,
  //   handleUserLogin,
  //   alertLogInTrue,
  //   alertLogInFalse,
  //   loadLogin,
  // } = useRegisterLogin();
  return (
      <Box>
        <Formik onSubmit={handleUserLogin} initialValues={initialValLogin}>
          {() => (
            <Form>
              <Grid gap={3}>
                <FormControl id="email">
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="your-email@example.com"
                  />
                </FormControl>
                <FormControl id="password">
                  <Field
                    name="password"
                    as={Input}
                    type="password"
                    placeholder="********"
                  />
                </FormControl>
                <ButtonGeneral
                  title={"Entrar"}
                  colorA={COLOR_BUTTON}
                  colorB={COLOR_BUTTON}
                  type={"submit"}
                />
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
      
  );
};
