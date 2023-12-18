import { Box, Grid, SimpleGrid } from "@chakra-ui/react";
import { BillTable } from "../BillTable";
import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";
import { CardHorizontal } from "../CardHorizontal";
import { BLUE_BG_IMAGE, MONTHS } from "../../../config/Constants";

export const BillList = ({ data = [], onClick = () => {} }) => {
  const imageBill =
    "https://cdn-icons-png.flaticon.com/512/1312/1312307.png";
  return (
    <Grid 
    //gap={5}
    >
      {data.map((element, i) => (
        <Box onClick={()=>{onClick(element)}} key={i}>
          <CardHorizontal
            showButtons={false}
            data={{
              image: imageBill,
              rigthComponent: element.billNumber,
              // head: `${((element.dateInfo.day).toString()).padStart(2,"0")}-${((element.dateInfo.month).toString()).padStart(2,"0")}-${element.dateInfo.year}`,
              head: `${element.dateInfo.dayName},${element.dateInfo.day} de ${element.dateInfo.monthName} del ${element.dateInfo.year}`,
              title: "Total:",
              secondTitle:Math.floor(element.total).toLocaleString(),
            }}
          />
        </Box>
      ))}
     
    </Grid>
  );
};
