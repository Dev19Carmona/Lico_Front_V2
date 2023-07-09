import { Bill_delete, Bills } from "@/graphql/Bill";
import { Table_delete, Table_save, Tables } from "@/graphql/Table";
import { useMutation, useQuery } from "@apollo/client";
import { Grid, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const useTablesPage = () => {
  //States
  const [tableData, setTableData] = useState({
    _id: "",
    name: "",
  });
  const [billData, setBillData] = useState({});
  const [alertSaveTrue, setalertSaveTrue] = useState(false);
  const [alertSaveFalse, setalertSaveFalse] = useState(false);

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
        }
      ],
    });

  //Effects
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

  //Queries
  const { data: tables, loading: loadTables } = useQuery(Tables);

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
    billDelete({
      variables: {
        _id: billData._id,
      },
    });
  };

  //Functions
  const totalProductsByBill = (products) =>
    products.reduce((acumulador, product) => {
      return acumulador + product.amount;
    }, 0);

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

  const settingsModalDeleteTable = useDisclosure();
  const settingsModalDeleteBill = useDisclosure();

  const handleOpenModalDeleteTable = (table) => {
    setTableData(table);
    setOverlay(<OverlayTwo />);
    settingsModalDeleteTable.onOpen();
  };
  const handleOpenModalDeleteBill = (bill) => {
    setBillData(bill);
    setOverlay(<OverlayTwo />);
    settingsModalDeleteBill.onOpen();
  };

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
  };
};
