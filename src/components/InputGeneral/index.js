import {
  Box,
  FormControl,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ButtonGeneral } from "../ButtonGeneral";
import { BiSearchAlt } from "react-icons/bi";

export const InputGeneral = ({
  onSubmit = () => {},
  initialValues = {},
  icon,
  placeholder,
  required = false,
  autoFocus=false
}) => {
  return (
    <Box
      boxShadow={"xl"}
      margin={2}
      border={"0.9px solid"}
      p={4}
      borderRadius={9}
    >
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {() => (
          <Form>
            <Grid gap={2}>
              <FormControl id="name">
                <InputGroup>
                  <Field
                    autoFocus={autoFocus}
                    name="name"
                    as={Input}
                    type="text"
                    placeholder={placeholder}
                    required={required}
                  />
                  <InputRightElement>
                    <ButtonGeneral
                      title={icon}
                      colorA={"green.400"}
                      colorB={"green.500"}
                      type={"submit"}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
