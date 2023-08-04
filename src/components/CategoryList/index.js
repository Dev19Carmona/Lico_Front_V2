import { Box, SimpleGrid } from "@chakra-ui/react"
import { CardGeneralBorder } from "../CardGeneralBorder"
import { CardGeneralBorderAdd } from "../CardGeneralBorderAdd"
export const CategoryList = ({categories, 
    onClick,
   handleOpenModalUpdateCategory, 
   handleOpenModalDeleteCategory
}) => {
    
    return (
        <SimpleGrid columns={{base:1, md:1, lg:3}}>
            <CardGeneralBorderAdd onClick={onClick}/>
            {
            categories?.Categories.map((category,i)=>(
                <Box key={i}>
                    <CardGeneralBorder data={{
                        // firstPlace:provider.phone,
                        secondPlace:category.name,
                        // thirdPlace:provider.address,
                        // fourthPlace:provider.email,
                    }}
                    onClick={()=>{
                         handleOpenModalUpdateCategory(category)
                    }}
                    onDelete={()=>{
                        handleOpenModalDeleteCategory(category)
                    }}
                    />
                </Box>
            ))
            }
        </SimpleGrid>
       
    )
}