import { Box, SimpleGrid } from "@chakra-ui/react";
import { CardGeneralBorder } from "../CardGeneralBorder";
import { CardGeneralBorderAdd } from "../CardGeneralBorderAdd";
export const ProviderList = ({
  providers,
  onClick,
  handleOpenModalUpdateProvider = () => {},
  handleOpenModalDeleteProvider = () => {},
  disguiseBack = false,
  showAdd = true,
}) => {
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
        {showAdd && <CardGeneralBorderAdd onClick={onClick} />}
        {providers?.providers.map((provider, i) => (
          <Box key={i}>
            <CardGeneralBorder
              data={{
                firstPlace: provider.phone,
                secondPlace: provider.name,
                thirdPlace: provider.address,
                fourthPlace: provider.email,
              }}
              href={`/salida/${provider._id}`}
              onClick={() => {
                handleOpenModalUpdateProvider(provider);
              }}
              onDelete={() => {
                handleOpenModalDeleteProvider(provider);
              }}
              disguiseBack={disguiseBack}
            />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};
