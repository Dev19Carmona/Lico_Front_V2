import { Box, Button, Grid, Heading, Input } from "@chakra-ui/react";
import { FormField } from "@codecraftkit/core";
import { Form, Formik } from "formik";

export const InputSearchGeneral = ({
  onChange,
}) => {
  
  return (
    <Box  margin={4} border={"1px solid"} p={4} borderRadius={9}>
      <Input onChange={(e)=>{
        onChange(e)
      }} name='search' variant='filled' placeholder='Buscar Producto.' />
    </Box>
  );
};
