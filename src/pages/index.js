import { GraphicsGeneral } from "@/components/GraphicsGeneral";
import { LoadingGeneral } from "@/components/LoadingGeneral";
import { LoginForm } from "@/components/LoginForm";
import { HomeContainer } from "@/containers/HomeContainer";
import { LoginContext } from "@/context/login";
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";

function Index() {
  const localSession = useContext(LoginContext);
  
  
  return (
    <>
      {localSession?.localSession ? (
        <Box ml={"65px"} minH={"100vh"}>
          <HomeContainer/>
        </Box>
      ) : (
        <Box ml={"65px"} minH={"100vh"}>
          ir a login
        </Box>
      )}
    </>
  )
}

export default Index