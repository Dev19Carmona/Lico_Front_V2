import { Box } from "@chakra-ui/react"
import { ButtonGeneral } from "../ButtonGeneral"

export const CreateGeneralProducts = ({title, onClick, titleTab = "Sin Title"}) => {
    return (
        <Box borderRadius={10} boxShadow={'xl'} justifyContent={'space-around'} key={1} p={4} display="flex" gridTemplateColumns="1fr">
            <Box letterSpacing={2} fontSize={30} fontFamily={'mono'}>
                {titleTab}
            </Box>
            <Box  color="white" justifySelf="end">
                <ButtonGeneral onClick={onClick} title={title} />
            </Box>
        </Box>

    )
}