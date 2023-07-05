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
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ButtonGeneral } from "../ButtonGeneral";
import { useRegisterLogin } from "@/hooks/useRegisterLogin";
import { FormField } from "@codecraftkit/core";
import { AlertGeneral } from "../AlertGeneral";

export const RegisterForm = () => {
  const { genders, handleUserRegister, initialValRegister, alertSaveTrue, alertSaveFalse, loadRegister } =
    useRegisterLogin();
  return (
    <Box margin={4} border={"1px solid"} p={4} borderRadius={9}>
      <Formik onSubmit={handleUserRegister} initialValues={initialValRegister}>
        {() => (
          <Form>
            <Grid gap={2}>
              <Heading>Register</Heading>
              <FormControl id="rolPassword">
                <FormLabel>Rol password</FormLabel>
                <Field
                  name="rolPassword"
                  as={Input}
                  type="password"
                  placeholder="********"
                />
              </FormControl>
              <FormControl id="fullName">
                <FormLabel>Name</FormLabel>
                <Field
                  name="fullName"
                  as={Input}
                  type="text"
                  placeholder="Your Name"
                />
              </FormControl>
              <FormField
                label="Gender"
                type="select"
                name="genderId"
                placeholder="Select a gender"
                noFilter
                labelField="name"
                valueField="_id"
                data={genders?.Genders}
              />
              <FormControl id="address">
                <FormLabel>Address</FormLabel>
                <Field
                  name="address"
                  as={Input}
                  type="text"
                  placeholder=" Address"
                />
              </FormControl>
              <FormControl id="nit">
                <FormLabel>Nit</FormLabel>
                <Field name="nit" as={Input} type="text" placeholder=" Nit" />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone</FormLabel>
                <Field
                  name="phone"
                  as={Input}
                  type="text"
                  placeholder=" Phone"
                />
              </FormControl>
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
              <FormControl id="confirmPassword">
                <FormLabel>Confirm password</FormLabel>
                <Field
                  name="confirmPassword"
                  as={Input}
                  type="password"
                  placeholder="********"
                />
              </FormControl>
              <ButtonGeneral
                title={loadRegister ?
                  <Spinner 
                  thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='black'
                    size='md' />
                  : "Register Account"}
                colorA={"blue.400"}
                colorB={"blue.500"}
                type={"submit"}
              />
              {
                alertSaveTrue && (
                  <AlertGeneral 
                  status={'success'}
                  title={'Cuenta creada con exito'}
                  description={'Ya puedes darle click al boton LogIn para iniciar session. Nos vemos!'}
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
