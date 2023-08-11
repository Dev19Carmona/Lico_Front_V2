import {
  Box,
  FormControl,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ButtonGeneral } from "../ButtonGeneral";
import { Field, Form, Formik } from "formik";
import { BiSearchAlt } from "react-icons/bi";

export const CreateGeneralProducts = ({
  titleTab = "Sin Titulo",
  initialValues,
  onSubmit,
}) => {
  return (
    <>
      <Box
        borderRadius={10}
        boxShadow={"xl"}
        justifyContent={"center"}
        key={1}
        p={4}
        display="flex"
        gridTemplateColumns="1fr"
      >
        <Box letterSpacing={10} fontSize={30}>
          {titleTab}
        </Box>
        
      </Box>
      <Box boxShadow={"xl"} margin={2} border={"0.9px solid"} p={4} borderRadius={9}>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {() => (
            <Form>
              <Grid gap={2}>
                <FormControl id="search">
                  <InputGroup>
                    <Field
                    autoFocus
                      name="search"
                      as={Input}
                      type="text"
                      placeholder="Buscar..."
                    />
                    <InputRightElement>
                      <ButtonGeneral
                        title={<BiSearchAlt fontSize={25}/>}
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
    </>
  );
};
