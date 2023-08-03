import { LoginForm } from "@/components/LoginForm";
import { ExpensesContainer } from "@/containers/ExpensesContainer";
import { ProductsContainer } from "@/containers/ProductsContainer";
import { LoginContext } from "@/context/login";
import { Box, Img } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ADMIN } from "../../../config/Constants";

function Salidas() {
  const localSession = useContext(LoginContext);
  return (
    <>
      {localSession?.localSession?.rol.name === ADMIN.name ? (
        <Box ml={"65px"} minH={"100vh"}>
          <ExpensesContainer/>
        </Box>
      ) : (
        <Box ml={"65px"} minH={"100vh"}>
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

export default Salidas;
