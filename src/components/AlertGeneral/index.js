import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react"

export const AlertGeneral = ({status, title, description}) => {
    return (
        <Alert
            status={status}
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
            transition="opacity 0.5s"
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                {title}
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                {description}
            </AlertDescription>
        </Alert>
    )
}