import { Box, SimpleGrid } from "@chakra-ui/react"
import { CardGeneralBorder } from "../CardGeneralBorder"
export const ProductList = ({products, 
   handleOpenModalUpdate, 
   handleOpenModalDelete
}) => {
    return (
        <>
        <SimpleGrid columns={3}>
            {
            products?.Products.map((product,i)=>(
                <Box key={i}>
                    <CardGeneralBorder data={{
                        firstPlace:product.amount,
                        secondPlace:product.name,
                         thirdPlace:`Precio: ${Math.floor(product.price).toLocaleString()} | Llevar: ${Math.floor(product.price*(product.isLeave/100)+product.price).toLocaleString()} | Establecimiento: ${Math.floor(product.price*(product.isStay/100)+product.price).toLocaleString()}`,
                        // fourthPlace:provider.email,
                    }}
                    onClick={()=>{
                         handleOpenModalUpdate(product)
                    }}
                    onDelete={()=>{
                        handleOpenModalDelete(product)
                    }}
                    />
                </Box>
            ))
            }
        </SimpleGrid>
        </>
    )
}