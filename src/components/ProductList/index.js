import { Box, SimpleGrid } from "@chakra-ui/react";
import { CardGeneralBorder } from "../CardGeneralBorder";
import { TablePricesProducts } from "../TablePricesProducts";
import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";
import { ProductTable } from "../ProductTable";
export const ProductList = ({
  products,
  handleOpenModalUpdate = () => {},
  handleOpenModalDelete = () => {},
  changeView = true,
}) => {
  const { redondeo } = useFunctionsGeneral();
  const index = ["Compra", "Llevar", "Establecimiento"];
  const data = (product) => {
    let precios = [];
    precios.push({
      compra: Math.round(product.price).toLocaleString(),
      llevar: redondeo(product.price * (product.isLeave / 100) + product.price).toLocaleString(),
      establecimiento: redondeo(
        product.price * (product.isStay / 100) + product.price
      ).toLocaleString(),
    });
    return precios;
  };
  const indexTableProductList = [
    "Cantidad",
    "Nombre",
    "Categoria",
    "Precio",
    "Llevar",
    "Establecimiento",
    "Acciones"
  ];
  return (
    <>
    {
      changeView?(
      <SimpleGrid columns={3}>
        
        {products?.Products.map((product, i) => (
          <Box key={i}>
            
              <CardGeneralBorder
                data={{
                  firstPlace: product.amount,
                  secondPlace: product.name,
                  //  thirdPlace:`Precio: ${Math.floor(product.price).toLocaleString()} | Llevar: ${Math.floor(product.price*(product.isLeave/100)+product.price).toLocaleString()} | Establecimiento: ${Math.floor(product.price*(product.isStay/100)+product.price).toLocaleString()}`,
                  thirdPlace: (
                    <TablePricesProducts index={index} data={data(product)} />
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

      ):(
        <ProductTable onDelete={handleOpenModalDelete} onUpdate={handleOpenModalUpdate} data={products?.Products} index={indexTableProductList}/>
      )
    }
    </>
  );
};
