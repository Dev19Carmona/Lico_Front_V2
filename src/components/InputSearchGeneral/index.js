import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import { FormField } from "@codecraftkit/core";
import { Form, Formik } from "formik";

export const InputSearchGeneral = ({
  initialValues,
  formFieldProps = {},
  onInputChange = () => {},
  onSubmit = () => {}
}) => {
  const { name, labelField, valueField, data } = formFieldProps;
  return (
    <Box margin={4} border={"1px solid"} p={4} borderRadius={9}>
      <Formik initialValues={initialValues}>
        {() => (
          <Form>
            <Grid gap={2}>
              <Heading textAlign="center">Buscar Productos</Heading>

              <FormField
                name={name}
                type="select"
                labelField={labelField}
                valueField={valueField}
                data={data}
                onInputChange={(e) => {
                  onInputChange(e,1);
                }}
              />
              <Button hidden type="submit"/>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
