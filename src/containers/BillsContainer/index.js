import { CardSelectionGeneral } from "@/components/CardSelectionGeneral";
import { useBillsPage } from "@/hooks/useBillsPage";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { BiReceipt } from "react-icons/bi";
import { BiSolidReceipt } from "react-icons/bi";

export const BillsContainer = () => {
    const {options, handleShowBills, showBills} =useBillsPage()
    
  return (
    <Grid gap={100}>
      <Box
        borderRadius={10}
        boxShadow={"xl"}
        justifyContent={"center"}
        key={1}
        p={4}
        display="flex"
        gridTemplateColumns="1fr"
      >
        <Box letterSpacing={2} fontSize={30} fontFamily={"mono"}>
          Facturas
        </Box>
      </Box>
      {
        !showBills.compras&&!showBills.ventas&&
        <Flex justifyContent={'space-around'}>
            {
                options.map((opt,i)=>(
                    <Grid onClick={()=>{handleShowBills(opt.id ==="Ventas"?true:false)}} key={i} >
                        <CardSelectionGeneral icono={opt.icono} texto={opt.texto}/>

                    </Grid>
                ))

            }
        </Flex>
      }
      {
        showBills.compras&&!showBills.ventas&&
        <Grid>Compras</Grid>
      }
      {
        !showBills.compras&&showBills.ventas&&
        <Grid>Ventas</Grid>
      }
    </Grid>
  );
};
