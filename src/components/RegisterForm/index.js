import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Spinner,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ButtonGeneral } from "../ButtonGeneral";
import { useRegisterLogin } from "@/hooks/useRegisterLogin";
import { AlertGeneral } from "../AlertGeneral";
import { COLOR_BUTTON } from "../../../config/Constants";

export const RegisterForm = () => {
  const {
    genders,
    handleUserRegister,
    initialValRegister,
    alertSaveTrue,
    alertSaveFalse,
    loadRegister,
    loadLogin,
  } = useRegisterLogin();
  return (
    <Box>
      <Formik  onSubmit={handleUserRegister} initialValues={initialValRegister}>
        {() => (
          <Form>
            <Grid gap={2}>
              <Tooltip
                label={"Esta contraseña es la que registraste para crear usuarios de Administrador o Vendedor."}
                hasArrow
                placement="left-start"
                bg={"gray"}
                color={'white'}
              >
                <FormControl id="rolPassword">
                  <Field
                    name="rolPassword"
                    as={Input}
                    type="text"
                    placeholder="PASSWORD_ROL"
                    color="white"
                    _placeholder={{ color: "gray" }}
                  />
                </FormControl>
              </Tooltip>

              <Flex gap={4} justifyContent={"space-between"}>
                <FormControl id="fullName">
                
                  <Field
                    name="fullName"
                    as={Input}
                    type="text"
                    placeholder="Nombre"
                    _placeholder={{ color: "white" }}
                  />
                </FormControl>
                <FormControl id="genderId">
                  <Field
                    name="genderId"
                    as={Select}
                    type="text"
                    placeholder="-Genero-"
                    color="white"
                  >
                    {genders?.Genders.map((gender, i) => (
                      <option key={i} value={gender._id}>
                        {gender.name}
                      </option>
                    ))}
                  </Field>
                </FormControl>
              </Flex>
              <Flex gap={4} justifyContent={"space-between"}>
                <FormControl id="address">
                  <Field
                    name="address"
                    as={Input}
                    type="text"
                    placeholder=" Address"
                    _placeholder={{ color: "white" }}
                  />
                </FormControl>
                <FormControl id="nit">
                  <Field
                    name="nit"
                    as={Input}
                    type="text"
                    placeholder=" Nit"
                    _placeholder={{ color: "white" }}
                  />
                </FormControl>
              </Flex>
              <Flex gap={4} justifyContent={"space-between"}>
                <FormControl id="phone">
                  <Field
                    name="phone"
                    as={Input}
                    type="text"
                    placeholder=" Phone"
                    _placeholder={{ color: "white" }}
                  />
                </FormControl>
                <FormControl id="email">
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="your-email@example.com"
                    _placeholder={{ color: "white" }}
                  />
                </FormControl>
              </Flex>
              <Flex gap={4} justifyContent={"space-between"}>
                <FormControl id="password">
                  <Field
                    name="password"
                    as={Input}
                    type="password"
                    placeholder="Contraseña"
                    _placeholder={{ color: "white" }}
                  />
                </FormControl>
                <FormControl id="confirmPassword">
                  <Field
                    name="confirmPassword"
                    as={Input}
                    type="password"
                    placeholder="Confirmar Contraseña"
                    _placeholder={{ color: "white" }}
                  />
                </FormControl>
              </Flex>
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
                    "Crear Usuario"
                  )
                }
                colorA={COLOR_BUTTON}
                colorB={COLOR_BUTTON}
                type={"submit"}
              />
              {alertSaveTrue && (
                <AlertGeneral
                  status={"success"}
                  title={"Cuenta creada con exito"}
                  description={
                    "Ya puedes darle click al boton LogIn para iniciar session. Nos vemos!"
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
