import { Box, SimpleGrid } from "@chakra-ui/react"
import { CardGeneralBorder } from "../CardGeneralBorder"
export const SubCategoryList = ({subCategories, 
   handleOpenModalUpdateCategory, 
   handleOpenModalDeleteCategory
}) => {
  console.log(subCategories);
    return (
        <>
        <SimpleGrid columns={3}>
            {
            subCategories?.SubCategories.map((subCategory,i)=>(
                <Box key={i}>
                    <CardGeneralBorder data={{
                        firstPlace:subCategory.category.name,
                        secondPlace:subCategory.name,
                        // thirdPlace:provider.address,
                        // fourthPlace:provider.email,
                    }}
                    // onClick={()=>{
                    //      handleOpenModalUpdateCategory(category)
                    // }}
                    // onDelete={()=>{
                    //     handleOpenModalDeleteCategory(category)
                    // }}
                    />
                </Box>
            ))
            }
        </SimpleGrid>
        </>
    )
}