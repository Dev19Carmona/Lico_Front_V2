import { LoginForm } from "@/components/LoginForm";
import { ProductsContainer } from "@/containers/ProductsContainer";
import { LoginContext } from "@/context/login";
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

function Facturas() {
  const localSession = useContext(LoginContext);
  return (
    <>
      {localSession?.localSession ? (
        <Box ml={250} minH={"100vh"}>
          Facturas
        </Box>
      ) : (
        <Box ml={250} minH={"100vh"}>
          <LoginForm />
        </Box>
      )}
    </>
  )
}

export default Facturas