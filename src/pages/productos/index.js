import { LoginForm } from "@/components/LoginForm";
import { ProductsContainer } from "@/containers/ProductsContainer";
import { LoginContext } from "@/context/login";
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

function Productos() {
  const localSession = useContext(LoginContext);
  return (
    <>
      {localSession?.localSession ? (
        <Box ml={250} minH={"100vh"}>
          <ProductsContainer />
        </Box>
      ) : (
        <Box ml={250} minH={"100vh"}>
          <LoginForm />
        </Box>
      )}
    </>
  );
}

export default Productos;
