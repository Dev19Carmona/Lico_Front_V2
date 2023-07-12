import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ButtonGeneral } from "../ButtonGeneral";
import { AlertGeneral } from "../AlertGeneral";

export const SubCategoryForm = ({
  onSubmit,
  initialValues,
  loadRegisterSubCategory,
   alertSaveTrue,
   alertSaveFalse,
  categories,
}) => {
  return (
    <Box margin={4} border={"1px solid"} p={4} borderRadius={9}>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {() => (
          <Form>
            <Grid gap={2}>
              <Heading textAlign="center">Sub Categorias</Heading>
              <FormControl id="name">
                <FormLabel>Nombre</FormLabel>
                <Field
                  name="name"
                  as={Input}
                  type="text"
                  placeholder="Nombre de la Sub Categoria"
                  required={true}
                />
              </FormControl>
              {/* <FormField
                name="categoryId"
                type="select"
                labelField="name"
                valueField="_id"
                data={categories?.Categories}
              /> */}
              <FormControl id="categoryId">
                <FormLabel>Categorias</FormLabel>
                <Field
                  name="categoryId"
                  as={Select}
                  type="text"
                  placeholder="----"
                >
                  {
                    categories?.Categories.map((category,i)=>(
                      <option key={i} value={category._id}>{category.name}</option>
                    ))
                  }
                </Field>
              </FormControl>
              <ButtonGeneral
                title={
                  loadRegisterSubCategory ? (
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
              {alertSaveTrue && (
                <AlertGeneral
                  status={"success"}
                  title={"Sub Categoria creada o actualizada con exito"}
                  description={
                    "Tienes una nueva Sub Categoria creada, ahora puedes añadirlas a los productos"
                  }
                />
              )}
              {alertSaveFalse && (
                <AlertGeneral
                  status={"error"}
                  title={"Ocurrio un error"}
                  description={"Vuelve a ingresar los datos correctamente."}
                />
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
