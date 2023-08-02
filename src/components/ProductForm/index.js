import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ButtonGeneral } from "../ButtonGeneral";
import { AlertGeneral } from "../AlertGeneral";
import Image from "next/image";
import { BiImageAdd } from "react-icons/bi";

export const ProductForm = ({
  loadRegister,
  categories,
  subCategories,
  providers,
  initialValues,
  handleSelect,
  selectCategory,
  handleSaveImageProduct,
  imageProduct,
  alertSaveFalse,
  alertSaveTrue,
  onSubmit = () => {},
}) => {
  return (
    <Box margin={4} border={"1px solid"} p={4} borderRadius={9}>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {() => (
          <Form>
            <Grid gap={2}>
              <Heading textAlign="center">Productos</Heading>

              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                <FormControl id="name">
                  <FormLabel>Nombre</FormLabel>
                  <Field
                    name="name"
                    as={Input}
                    type="text"
                    placeholder="Nombre"
                    required={true}
                  />
                </FormControl>
                <FormControl id="amount">
                  <FormLabel>Cantidad</FormLabel>
                  <Field
                    name="amount"
                    as={Input}
                    type="number"
                    placeholder="Cantidad"
                  />
                </FormControl>
              </Grid>

              <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                <FormControl id="price">
                  <FormLabel>Precio</FormLabel>
                  <Field
                    name="price"
                    as={Input}
                    type="number"
                    placeholder="$$$"
                  />
                </FormControl>

                <FormControl id="isLeave">
                  <FormLabel>Venta 1</FormLabel>
                  <Field
                    name="isLeave"
                    as={Input}
                    type="number"
                    placeholder="%"
                  />
                </FormControl>

                <FormControl id="isStay">
                  <FormLabel>Venta 2</FormLabel>
                  <Field
                    name="isStay"
                    as={Input}
                    type="number"
                    placeholder="%"
                  />
                </FormControl>
              </Grid>
              {/* <SelectFormik 
              label={"Selecciona el proveedor"}
              data={providers?.providers}
              name={"providerId"}
              labelField={"name"}
              valueField={"_id"}

              /> */}
              <FormControl id="providerId">
                <FormLabel>Proveedor</FormLabel>
                <Field
                  name="providerId"
                  as={Select}
                  type="text"
                  placeholder="----"
                >
                  {providers?.providers.map((provider, i) => (
                    <option key={i} value={provider._id}>
                      {provider.name}
                    </option>
                  ))}
                </Field>
              </FormControl>
              <FormControl id="categoryId">
                <FormLabel>Categoria</FormLabel>
                <Field
                  name="categoryId"
                  as={Select}
                  value={selectCategory}
                  type="select"
                  placeholder="-----"
                  onChange={(e) => {
                    handleSelect(e);
                  }}
                >
                  {categories?.Categories.map((category, i) => (
                    <option key={i} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </FormControl>
              {selectCategory !== "" && (
                <>
                  <FormControl id="subCategoryId">
                    <FormLabel>Sub Categorias</FormLabel>
                    <Field
                      name="subCategoryId"
                      as={Select}
                      type="text"
                      placeholder="-----"
                    >
                      {subCategories?.SubCategories.map((subCategory, i) => (
                        <option key={i} value={subCategory._id}>
                          {subCategory.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>
                </>
              )}
              <Flex className="product-container" mt={5}>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    handleSaveImageProduct(e);
                  }}
                  style={{ display: "none" }}
                />
                <label htmlFor="image" className="product-label">
                  <BiImageAdd fontSize={24} style={{ marginRight: "5px" }} />
                  Subir imagen
                </label>
              </Flex>
              {imageProduct && (
                <Grid gap={2} p={2} className="product-preview">
                  <Text
                    fontWeight="bold"
                    textAlign="center"
                    fontSize={16}
                    color="#A569BD"
                  >
                    Vista Previa
                  </Text>
                  <Image
                    src={URL.createObjectURL(imageProduct)}
                    alt="brandPreview"
                    objectFit="contain"
                    width={180}
                    height={180}
                  />
                </Grid>
              )}
              <ButtonGeneral
                title={
                  loadRegister ? (
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
                  title={"Producto creado o actualizado con exito"}
                  description={
                    "Tienes un nuevo producto creado, ahora puedes comenzar a comercializarlo."
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
