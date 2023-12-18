import { LoginForm3D } from "@/components/LoginForm3D";
import { HomeContainer } from "@/containers/HomeContainer";
import { LoginContext } from "@/context/login";
import { NavBarLayout } from "@/layouts/NavBarLayout";
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
          <LoginForm3D/>
          
        </Box>
      )}
    </>
  )
}

export default Index