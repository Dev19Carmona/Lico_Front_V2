import { useState } from "react";
import { BiReceipt, BiSolidReceipt } from "react-icons/bi";
import { useBillList } from "./functions/useBillList";

export const useBillsPage = () => {
  const { bills, handleSetType } = useBillList();
  //CONSTANTS
  const defaultShowBills = Object.freeze({
    compras: false,
    ventas: false,
  });
  const [showBills, setShowBills] = useState(defaultShowBills);
  const handleShowBills = (alert) => {
    setShowBills({
      compras: alert ? false : true,
      ventas: alert ? true : false,
    });
  };
  const handleDefaultBills = () => {
    setShowBills(defaultShowBills);
  };
  const options = [
    {
      id: "Compra",
      icono: <BiReceipt fontWeight={"0.1px"} fontSize={150} />,
      texto: "Compras",
    },
    {
      id: "Venta",
      icono: <BiSolidReceipt fontWeight={"0.1px"} fontSize={150} />,
      texto: "Ventas",
    },
  ];
  return {
    options,
    handleShowBills,
    showBills,
    handleDefaultBills,
    handleSetType,
    bills,
  };
};
