import { LoginForm } from '@/components/LoginForm';
import { TableContainer } from '@/containers/TableContainer'
import { LoginContext } from '@/context/login';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import React, {useContext} from 'react'

function Mesa() {
  const localSession = useContext(LoginContext);
  const router = useRouter()
  return (
    <>
      {localSession?.localSession ? (
        <Box ml={250} minH={"100vh"}>
          <TableContainer tableId={router.query.id}/>
        </Box>
      ) : (
        <Box ml={250} minH={"100vh"}>
          <LoginForm />
        </Box>
      )}
    </>
  )
}

export default Mesa