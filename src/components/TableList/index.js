import { SimpleGrid, Switch } from "@chakra-ui/react";
import { CardGeneralBorder } from "../CardGeneralBorder";
import { FcCancel } from "react-icons/fc";
import Link from "next/link";
import { BLUE_BG_IMAGE, RED_BG_IMAGE } from "../../../config/Constants";

export const TableList = ({
  data,
  handleOpenModalDeleteTable = () => {},
  handleOpenModalDeleteBill = () => {},
  handleTotalAmounts,
}) => {
  
  return (
    <SimpleGrid columns={{base:1, md:2, lg:4}}>
      {data?.map((element, i) => (
        <CardGeneralBorder
          key={i}
          data={{
            firstPlace: parseInt(handleTotalAmounts(element._id)) > 0 ? "Ocupado": "Libre",
            secondPlace: element.name,
            thirdPlace:"",
            fourthPlace:
              handleTotalAmounts(element._id) > 0
                ? `${handleTotalAmounts(element._id)} Productos`
                : "0 Productos",
          }}
          onDelete={() => {
            handleOpenModalDeleteTable(element);
          }}
          onClick={() => {
            handleOpenModalDeleteBill(element._id);
          }}
          src={
            parseInt(handleTotalAmounts(element._id)) > 0
              ? RED_BG_IMAGE
              : BLUE_BG_IMAGE
          }
          href={`/mesa/${element._id}`}
          typeComponent={Link}
          firstIcon={
            parseInt(handleTotalAmounts(element._id)) > 0 ? (
              <FcCancel fontSize={40} />
            ) : (
              ""
            )
          }
        />
      ))}
    </SimpleGrid>
  );
};
