import { Box, SimpleGrid } from "@chakra-ui/react";
import { CardGeneralBorder } from "../CardGeneralBorder";
import { TablePricesProducts } from "../TablePricesProducts";
import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";
import { ProductTable } from "../ProductTable";
import { PricesTable } from "../PricesTable";
export const ProductList = ({
  products,
  handleOpenModalUpdate = () => {},
  handleOpenModalDelete = () => {},
  changeView = true,
}) => {
  const indexTableProductList = [
    "Cantidad",
    "Nombre",
    "Categoria",
    "Precio",
    "Llevar",
    "Establecimiento",
    "Acciones",
  ];
  return (
    <>
      {changeView ? (
        <SimpleGrid columns={{base:1, md:1, lg:3}}>
          {products?.Products.map((product, i) => (
            <Box key={i}>
              <CardGeneralBorder
                data={{
                  firstPlace: product.amount,
                  secondPlace: product.name,
                  //  thirdPlace:`Precio: ${Math.floor(product.price).toLocaleString()} | Llevar: ${Math.floor(product.price*(product.isLeave/100)+product.price).toLocaleString()} | Establecimiento: ${Math.floor(product.price*(product.isStay/100)+product.price).toLocaleString()}`,
                  thirdPlace: (
                    // <PricesTable data={data(product)} />
                    <PricesTable data={[{compra:Math.round(product.price).toLocaleString(),llevar:Math.round(product.priceA).toLocaleString(), establecimiento:Math.round(product.priceB).toLocaleString()}]} />
                  ),
                  fourthPlace: product.category?.name,
                }}
                onClick={() => {
                  handleOpenModalUpdate(product);
                }}
                onDelete={() => {
                  handleOpenModalDelete(product);
                }}
                src={product.image}
                imageSize="100px"
                imageType="contain"
              />
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <ProductTable
          onDelete={handleOpenModalDelete}
          onUpdate={handleOpenModalUpdate}
          data={products?.Products}
          index={indexTableProductList}
        />
      )}
    </>
  );
};
