import { SimpleGrid } from "@chakra-ui/react";
import { CardGeneralBorder } from "../CardGeneralBorder";
import Link from "next/link";

export const TableList = ({ data, handleOpenModalDeleteTable = () => {} }) => {
  return (
    <SimpleGrid columns={3}>
      {data?.map((element, i) => (
        <CardGeneralBorder
          key={i}
          data={{
            //firstPlace:product.amount,
            secondPlace: element.name,
            //thirdPlace: "",
            //fourthPlace:product.category?.name,
          }}
          onDelete={()=>{
            handleOpenModalDeleteTable(element)
          }}
          show={false}
          src="https://img.freepik.com/vector-gratis/fondo-memphis-semitono-azul-lineas-amarillas-formas-circulos_1017-31954.jpg?w=2000&t=st=1688757173~exp=1688757773~hmac=caf2ae2347c7d5e0212a002d846ba0f70eac3b49b0b0d6b814a7d439a163080e"
          href={`/mesa/${element._id}`}
          typeComponent={Link}
        />
      ))}
    </SimpleGrid>
  );
};
