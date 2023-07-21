import { LoginForm } from "@/components/LoginForm";
import { ProductsContainer } from "@/containers/ProductsContainer";
import { LoginContext } from "@/context/login";
import { Box, Img } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { ADMIN_NAME } from "../../../config/Constants";

function Productos() {
  const localSession = useContext(LoginContext);
  
  
  return (
    <>
      {localSession?.localSession?.rol.name === ADMIN_NAME ? (
        <Box ml={250} minH={"100vh"}>
          <ProductsContainer />
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
  );
}

export default Productos;
