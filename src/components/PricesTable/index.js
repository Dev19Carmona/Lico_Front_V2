import { Box, Grid, Text } from "@chakra-ui/react";

export const PricesTable = ({ data = {} }) => {
  return (
    <Box border={"0.5px solid"} p={2}>
      {/* Header */}
      <Grid templateColumns="repeat(3, 1fr)" gap={4} fontWeight="bold" mb={2}>
        <Text>Compra</Text>
        <Text>Venta 1</Text>
        <Text>Venta 2</Text>
      </Grid>

      {/* Data Rows */}
      {data.map((row, index) => (
        <Grid key={index} templateColumns="repeat(3, 1fr)" gap={4}>
          <Text>{row.compra}</Text>
          <Text>{row.llevar}</Text>
          <Text>{row.establecimiento}</Text>
        </Grid>
      ))}
    </Box>
  );
};
