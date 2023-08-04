import { Box, SimpleGrid } from "@chakra-ui/react";
import { CardGeneralBorder } from "../CardGeneralBorder";
import { CardGeneralBorderAdd } from "../CardGeneralBorderAdd";
export const SubCategoryList = ({
  subCategories,
  onClick,
  handleOpenModalUpdateSubCategory,
  handleOpenModalDeleteSubCategory,
}) => {
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }}>
        <CardGeneralBorderAdd onClick={onClick} />
        {subCategories?.SubCategories.map((subCategory, i) => (
          <Box key={i}>
            <CardGeneralBorder
              data={{
                firstPlace: subCategory.category.name,
                secondPlace: subCategory.name,
                // thirdPlace:provider.address,
                // fourthPlace:provider.email,
              }}
              onClick={() => {
                handleOpenModalUpdateSubCategory(subCategory);
              }}
              onDelete={() => {
                handleOpenModalDeleteSubCategory(subCategory);
              }}
            />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};
