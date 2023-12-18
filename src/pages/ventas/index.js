import { LoginForm } from "@/components/LoginForm";
import { ProductsContainer } from "@/containers/ProductsContainer";
import { TablesContainer } from "@/containers/TablesContainer";
import { LoginContext } from "@/context/login";
import { useSubscriptionBill } from "@/hooks/useSubscriptionBill";
import { Box, Img } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";

function Ventas() {
  const localSession = useContext(LoginContext);
  const {notificationNewBill} = useSubscriptionBill()
  
  useEffect(() => {
    localStorage.setItem("changeSell",false)
  }, []);
  return (
    <>
      {localSession?.localSession ? (
        <Box ml={"69px"} minH={"100vh"}>
          <TablesContainer/>
          
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

export default Ventas;
