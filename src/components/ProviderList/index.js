import { Box, SimpleGrid } from "@chakra-ui/react";
import { CardGeneralBorder } from "../CardGeneralBorder";
export const ProviderList = ({
  providers,
  handleOpenModalUpdateProvider = () => {},
  handleOpenModalDeleteProvider = () => {},
  disguiseBack = false,
  href = "",
}) => {
  return (
    <>
      <SimpleGrid columns={3}>
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
