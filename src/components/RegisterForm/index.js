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
import { FormField } from "@codecraftkit/core";
export const RegisterForm = () => {
  const { genders, handleUserRegister, initialValRegister } =
    useRegisterLogin();
  return (
    <Box margin={4} border={"1px solid"} p={4} borderRadius={9}>
      <Formik onSubmit={handleUserRegister} initialValues={initialValRegister}>
        {() => (
          <Form>
            <Grid gap={2}>
              <Heading>Register</Heading>
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
                title={"Register"}
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
