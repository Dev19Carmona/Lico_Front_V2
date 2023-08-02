import { useState, useEffect } from "react";
import { BiReceipt, BiSolidReceipt } from "react-icons/bi";
import { useBillList } from "./functions/useBillList";
import { ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { LIMIT } from "../../config/Constants";
import { useBills } from "./Lists/useBills";
import { useFunctionsGeneral } from "./functions/useFunctionsGeneral";

export const useBillsPage = () => {
  
  //STATES
  const [bill, setBill] = useState({});
  // const [type, setType] = useState();
  const [selectedDate, setSelectedDate] = useState({
    start: null,
    end: null,
  });
  const { pagesTotalBills, setPageBills, pageBills, type, setType } = useBillList();
  const { useBillsPerVariables } = useBills();
  //Handles
  const handleSetType = (value) => {
    setType(value);
  };
  const bills = useBillsPerVariables({
    variables: {
      filters: [
        {
          key: "type",
          value: type,
        },
      ],
      filtersDate: {
        start: selectedDate.start,
        end: selectedDate.end,
      },
      options:{
        limit:LIMIT,
        page:pageBills
      }
    },
  });
 
  
  const handleDateChange = (date) => {
    setSelectedDate({ ...selectedDate, ...date });
  };
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

  //Modal Settings
  const settingsModalShowBill = useDisclosure();
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayTwo />);
  const handleOpenModalShowBill = (data) => {
    setBill(data);
    setOverlay(<OverlayTwo />);
    settingsModalShowBill.onOpen();
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
    settingsModalShowBill,
    overlay,
    handleOpenModalShowBill,
    bill,
    pagesTotalBills,
    setPageBills,
    pageBills,
    handleDateChange,
    selectedDate,
  };
};
