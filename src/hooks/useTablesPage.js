import { Bill_delete, Bills } from "@/graphql/Bill";
import { Table_delete, Table_save, Tables } from "@/graphql/Table";
import { useMutation, useQuery } from "@apollo/client";
import { ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFunctionsGeneral } from "./functions/useFunctionsGeneral";
import { useProductList } from "./functions/useProductList";

export const useTablesPage = () => {
  //ProductList hook
  const { productListSwitch, setProductListSwitch, productList} = useProductList()
  

  //Modal Settings
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayTwo />);
  const [changeSell, setChangeSell] = useState(false)

  const settingsModalDeleteTable = useDisclosure();
  const settingsModalDeleteBill = useDisclosure();

  const handleOpenModalDeleteTable = (table) => {
    setTableData(table);
    setOverlay(<OverlayTwo />);
    settingsModalDeleteTable.onOpen();
  };
  const handleOpenModalDeleteBill = (tableId) => {
    setIdTable(tableId);
    setOverlay(<OverlayTwo />);
    settingsModalDeleteBill.onOpen();
  };
  //router
  const router = useRouter();

  //States
  const [tableData, setTableData] = useState({
    _id: "",
    name: "",
  });
  const [idTable, setIdTable] = useState("");
  const [alertSaveTrue, setalertSaveTrue] = useState(false);
  const [alertSaveFalse, setalertSaveFalse] = useState(false);
  const [isStay, setIsStay] = useState(false);
  const [totalAmounts, setTotalAmounts] = useState([]);
 

  const [alertSwitch, setAlertSwitch] = useState(false);
  //Queries
  const { data: tables, loading: loadTables } = useQuery(Tables);
  //Mutations
  const [tableSave, { data: isTableSave, loading: loadTableSave }] =
    useMutation(Table_save, {
      refetchQueries: [
        {
          query: Tables,
        },
      ],
    });
  const [tableDelete, { data: isTableDelete, loading: loadTableDelete }] =
    useMutation(Table_delete, {
      refetchQueries: [
        {
          query: Tables,
        },
      ],
    });

  const [billDelete, { data: isBillDelete, loading: loadBillDelete }] =
    useMutation(Bill_delete, {
      refetchQueries: [
        {
          query: Tables,
        },
        {
          query: Bills,
          variables: {
            filters: () => {
              tables?.Tables.map((table) => {
                return {
                  tableId: table._id,
                };
              });
            },
          },
        },
      ],
    });

  //Effects

  useEffect(() => {
    let totalAmounts = [];
    tables?.Tables.map((table) => {
      if (localStorage.getItem(table._id)) {
        const productListByTable = JSON.parse(localStorage.getItem(table._id));
        const totalAmount = productListByTable.reduce((acumulador, product) => {
          return acumulador + product.amount;
        }, 0);
        totalAmounts.push({
          tableId: table._id,
          totalAmount,
        });
        setTotalAmounts(totalAmounts);
      }
    });
  }, [tables]);
  //FUNCTIONS


  useEffect(() => {
    if (isBillDelete?.Bill_delete) {
      setalertSaveTrue(true);
    }
    if (isBillDelete?.Bill_delete === false) {
      setalertSaveFalse(true);
    }
  }, [isBillDelete]);

  useEffect(() => {
    if (isTableDelete?.Table_delete) {
      setalertSaveTrue(true);
    }
    if (isTableDelete?.Table_delete === false) {
      setalertSaveFalse(true);
    }
  }, [isTableDelete]);

  useEffect(() => {
    let timer;
    if (alertSaveTrue) {
      timer = setTimeout(() => {
        setalertSaveTrue(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [alertSaveTrue]);

  useEffect(() => {
    let timer;
    if (alertSaveFalse) {
      timer = setTimeout(() => {
        setalertSaveFalse(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [alertSaveFalse]);

  //Initial Values

  const initialValuesTable = {
    _id: tableData._id,
    name: tableData.name,
  };

  //Handles
  const handleSaveTable = (values, { resetForm }) => {
    if (values._id) {
      tableSave({
        variables: {
          tableData: {
            _id: values._id,
            name: values.name,
          },
        },
      });
    } else {
      tableSave({
        variables: {
          tableData: {
            name: values.name,
          },
        },
      });
    }
    resetForm();
  };
  const handleDeleteTable = () => {
    tableDelete({
      variables: {
        _id: tableData._id,
      },
    });
  };
  const handleDeleteBill = () => {
    if (localStorage.getItem(idTable)) {
      const totalAmountFoundIndex = totalAmounts.findIndex(total=>total.tableId===idTable)
      totalAmounts.splice(totalAmountFoundIndex,1)
      setTotalAmounts(totalAmounts)
      localStorage.removeItem(idTable);
      settingsModalDeleteBill.onClose()
    }
  };
  const handleSwitchPriceProducts = () => {
   setChangeSell(!changeSell)
  };
  const handleTotalAmounts = (_id) => {
    const totalAmount = totalAmounts.find((amount) => amount.tableId === _id);

    return totalAmount?.totalAmount;
  };


  //Functions
  const totalProductsByBill = (products) =>
    products.reduce((acumulador, product) => {
      return acumulador + product.amount;
    }, 0);

 

  return {
    initialValuesTable,
    handleSaveTable,
    tables,
    handleOpenModalDeleteTable,
    settingsModalDeleteTable,
    overlay,
    loadTableDelete,
    handleDeleteTable,
    alertSaveFalse,
    alertSaveTrue,
    handleOpenModalDeleteBill,
    totalProductsByBill,
    settingsModalDeleteBill,
    loadBillDelete,
    handleDeleteBill,
    handleSwitchPriceProducts,
    isStay,
    totalAmounts,
    handleTotalAmounts,
    productList,
    changeSell
  };
};
