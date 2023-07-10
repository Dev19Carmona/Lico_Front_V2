import { Box, SimpleGrid } from "@chakra-ui/react"
import { CardGeneralBorder } from "../CardGeneralBorder"
import { TablePricesProducts } from "../TablePricesProducts"
export const ProductList = ({products, 
   handleOpenModalUpdate, 
   handleOpenModalDelete
}) => {
    const index = ["Compra", "Llevar", "Establecimiento"]
    const data = (product) => {
        let precios = []
        precios.push({
            compra: Math.floor(product.price).toLocaleString(),
            llevar: Math.floor(product.price*(product.isLeave/100)+product.price).toLocaleString(),
            establecimiento: Math.floor(product.price*(product.isStay/100)+product.price).toLocaleString()
        })
        return precios
    }
    return (
        <>
        <SimpleGrid columns={3}>
            {
            products?.Products.map((product,i)=>(
                <Box key={i}>
                    <CardGeneralBorder data={{
                        firstPlace:product.amount,
                        secondPlace:product.name,
                        //  thirdPlace:`Precio: ${Math.floor(product.price).toLocaleString()} | Llevar: ${Math.floor(product.price*(product.isLeave/100)+product.price).toLocaleString()} | Establecimiento: ${Math.floor(product.price*(product.isStay/100)+product.price).toLocaleString()}`,
                         thirdPlace: <TablePricesProducts index={index} data={data(product)}/>,
                         fourthPlace:product.category?.name,
                         
                    }}
                    onClick={()=>{
                         handleOpenModalUpdate(product)
                    }}
                    onDelete={()=>{
                        handleOpenModalDelete(product)
                    }}
                    src = {product.image}
                    imageSize="100px"
                    imageType="contain"
                    />
                </Box>
            ))
            }
        </SimpleGrid>
        </>
    )
}