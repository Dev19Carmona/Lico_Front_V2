import { ProductsContainer } from "@/containers/ProductsContainer";
import { LoginContext } from "@/context/login";
import { Box, Img } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ADMIN } from "../../../config/Constants";

function Productos() {
  const localSession = useContext(LoginContext);

  return (
    <>
      {localSession?.localSession?.rol.name === ADMIN.name ? (
        <Box ml={"50px"} marginRight={10} minH={"100vh"}>
          <ProductsContainer />
        </Box>
      ) : (
        <Box ml={"50px"} minH={"100vh"}>
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
