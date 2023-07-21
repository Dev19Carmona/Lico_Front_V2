import { useState } from "react";
import { BiReceipt, BiSolidReceipt } from "react-icons/bi";

export const useBillsPage = () => {
  //CONSTANTS
  const defaultShowBills = Object.freeze({
    compras: false,
    ventas: false,
  })
  const [showBills, setShowBills] = useState(defaultShowBills);
  const handleShowBills = (alert) => {
    setShowBills({
      compras: alert ? false : true,
      ventas: alert ? true : false,
    });
  };
  const handleDefaultBills = () => {
    setShowBills(defaultShowBills);
  }
  const options = [
    {
      id: "Compras",
      icono: <BiReceipt fontWeight={"0.1px"} fontSize={150} />,
      texto: "Compras",
    },
    {
      id: "Ventas",
      icono: <BiSolidReceipt fontWeight={"0.1px"} fontSize={150} />,
      texto: "Ventas",
    },
  ];
  return {
    options,
    handleShowBills,
    showBills,
    handleDefaultBills,
  };
};
