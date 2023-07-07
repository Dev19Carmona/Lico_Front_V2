import { LoginForm } from "@/components/LoginForm";
import { ProductsContainer } from "@/containers/ProductsContainer";
import { TablesContainer } from "@/containers/TablesContainer";
import { LoginContext } from "@/context/login";
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

function Mesas() {
  const localSession = useContext(LoginContext);
  return (
    <>
      {localSession?.localSession ? (
        <Box ml={250} minH={"100vh"}>
          <TablesContainer/>
        </Box>
      ) : (
        <Box ml={250} minH={"100vh"}>
          <LoginForm />
        </Box>
      )}
    </>
  );
}

export default Mesas;
