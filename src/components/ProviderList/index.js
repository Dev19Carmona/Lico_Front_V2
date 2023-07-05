import { Box, SimpleGrid } from "@chakra-ui/react"
import { CardGeneralBorder } from "../CardGeneralBorder"
export const ProviderList = ({providers, handleOpenModalUpdateProvider, handleOpenModalDeleteProvider}) => {
    return (
        <>
        <SimpleGrid columns={3}>
            {
            providers?.providers.map((provider,i)=>(
                <Box key={i}>
                    <CardGeneralBorder data={{
                        firstPlace:provider.phone,
                        secondPlace:provider.name,
                        thirdPlace:provider.address,
                        fourthPlace:provider.email,
                    }}
                    onClick={()=>{
                        handleOpenModalUpdateProvider(provider)
                    }}
                    onDelete={()=>{
                        handleOpenModalDeleteProvider(provider)
                    }}
                    />
                </Box>
            ))
            }
        </SimpleGrid>
        </>
    )
}