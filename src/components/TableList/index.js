import { SimpleGrid, Switch } from "@chakra-ui/react";
import { CardGeneralBorder } from "../CardGeneralBorder";
import { FcCancel } from "react-icons/fc";
import Link from "next/link";
import { BLUE_BG_IMAGE, RED_BG_IMAGE } from "../../../config/Constants";

export const TableList = ({
  data,
  handleOpenModalDeleteTable = () => {},
  handleOpenModalDeleteBill = () => {},
  totalProductsByBill,
  switchChange,
}) => {
  return (
    <SimpleGrid columns={3}>
      {data?.map((element, i) => (
        <CardGeneralBorder
          key={i}
          data={{
            firstPlace: element.isStay ? "Establecimiento" : "Llevar",
            secondPlace: element.name,
            thirdPlace: <Switch id="prices" isChecked={element.isStay} onChange={(e) => {switchChange(e, element)}} />,
            fourthPlace:
              element.bills.length > 0
                ? `${totalProductsByBill(element.bills[0].products)} Productos`
                : "0 Productos",
          }}
          onDelete={() => {
            handleOpenModalDeleteTable(element);
          }}
          onClick={() => {
            handleOpenModalDeleteBill(element.bills[0]);
          }}
          src={element.bills.length === 0 ? BLUE_BG_IMAGE : RED_BG_IMAGE}
          href={`/mesa/${element._id}`}
          typeComponent={Link}
          firstIcon={<FcCancel fontSize={40} />}
        />
      ))}
    </SimpleGrid>
  );
};
