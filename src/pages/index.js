import { LoginForm } from "@/components/LoginForm";
import { LoginContext } from "@/context/login";
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

function Index() {
  const localSession = useContext(LoginContext);

  return (
    <>
      {localSession?.localSession ? (
        <Box ml={250} minH={"100vh"}>
          Home
        </Box>
      ) : (
        <Box ml={250} minH={"100vh"}>
          ir a login
        </Box>
      )}
    </>
  )
}

export default Index