import { LoginForm } from '@/components/LoginForm';
import { TableContainer } from '@/containers/TableContainer'
import { LoginContext } from '@/context/login';
import { Box, Img } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import React, {useContext, useEffect} from 'react'

function Mesa() {
  const localSession = useContext(LoginContext);
  const router = useRouter()
  useEffect(() => {
    localStorage.setItem("changeSell",true)
  }, []);
  return (
    <>
      {localSession?.localSession ? (
        <Box ml={250} minH={"100vh"}>
          <TableContainer tableId={router.query.id}/>
        </Box>
      ) : (
        <Box ml={250} minH={"100vh"}>
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

export default Mesa