import { ExpenseContainer } from '@/containers/ExpenseContainer'
import { LoginContext } from '@/context/login';
import { Box, Img } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React,{useContext} from 'react'
import { ADMIN } from '../../../config/Constants';

function Salida() {
  const localSession = useContext(LoginContext);
  const router = useRouter()
  return (
    
    <>
      {localSession?.localSession?.rol.name === ADMIN.name ? (
        <Box ml={"65px"} minH={"100vh"}>
          <ExpenseContainer providerId={router.query.id}/>
        </Box>
      ) : (
        <Box ml={50} minH={"100vh"}>
          <Box borderBottom={"1px"} borderColor="black">
          <Img
            src={"https://i.ytimg.com/vi/m7ZZNsa0pOA/maxresdefault.jpg"}
            
            roundedTop={"sm"}
            h="full"
            w="full"
            alt={"Not Found"}
          />
        </Box>
        </Box>
      )}
    </>
  )
}

export default Salida