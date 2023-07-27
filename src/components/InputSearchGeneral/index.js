import { Box, Button, Grid, Heading, Input } from "@chakra-ui/react";

import { Form, Formik } from "formik";

export const InputSearchGeneral = ({ onChange, value }) => {
  return (
    <Box  borderRadius={9}>
      <Input
        onChange={(e) => {
          onChange(e);
        }}
        name="search"
        variant="filled"
        placeholder="Buscar Producto."
        value={value}
      />
    </Box>
  );
};
