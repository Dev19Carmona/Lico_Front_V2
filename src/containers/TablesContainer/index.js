import { AlertDeleteGeneral } from "@/components/AlertDeleteGeneral";
import { ButtonGeneral } from "@/components/ButtonGeneral";
import { InputGeneral } from "@/components/InputGeneral";
import { ModalGeneral } from "@/components/ModalGeneral";
import { TableList } from "@/components/TableList";
import { useTablesPage } from "@/hooks/useTablesPage";
import { Grid, Heading, Text } from "@chakra-ui/react";
import { RiBillLine } from "react-icons/ri";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { GrAdd, GrMultiple } from "react-icons/gr";
import { useState } from "react";
import { motion } from "framer-motion";
import { TableContainer } from "../TableContainer";
import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";

export const TablesContainer = () => {
  const {
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
    isStay,
    handleChangeSwitch,
    totalAmounts,
    handleTotalAmounts,
    productList,
  } = useTablesPage();
  const { handleSwitchPriceProducts, changeSell } = useFunctionsGeneral();
  return (
    <Grid gap={5} mt={5}>
      <ButtonGeneral
        onClick={handleSwitchPriceProducts}
        title={
          !changeSell ? (
            <GrMultiple fontSize={20} />
          ) : (
            <RiBillLine fontSize={20} />
          )
        }
      />
      {changeSell && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <InputGeneral
            autoFocus={true}
            onSubmit={handleSaveTable}
            initialValues={initialValuesTable}
            placeholder={"Agregar una nueva mesa"}
            icon={<GrAdd fontSize={25} />}
            required={true}
          />
        </motion.div>
      )}

      {changeSell ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TableList
            totalProductsByBill={totalProductsByBill}
            handleOpenModalDeleteBill={handleOpenModalDeleteBill}
            handleOpenModalDeleteTable={handleOpenModalDeleteTable}
            data={tables?.Tables}
            check={isStay}
            handleChangeSwitch={handleChangeSwitch}
            totalAmounts={totalAmounts}
            handleTotalAmounts={handleTotalAmounts}
            productList={productList}
          />
        </motion.div>
      ) : (
        <Grid style={{ textAlign: 'center' }}>
          <Heading>Ventas Rapidas</Heading>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TableContainer />
          </motion.div>
        </Grid>
      )}

      <ModalGeneral
        title={"Eliminar Mesa"}
        body={
          <AlertDeleteGeneral
            title={"¿Desea eliminar la mesa?"}
            description={
              "Podrías tener problemas si ya existen facturas registradas por esta mesa."
            }
            load={loadTableDelete}
            onSubmit={handleDeleteTable}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalDeleteTable.isOpen}
        onClose={settingsModalDeleteTable.onClose}
      />
      <ModalGeneral
        title={"Factura"}
        body={
          <AlertDeleteGeneral
            title={"¿Desocupar Mesa?"}
            description={"Aun no han pagado!."}
            load={loadBillDelete}
            onSubmit={handleDeleteBill}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalDeleteBill.isOpen}
        onClose={settingsModalDeleteBill.onClose}
      />
    </Grid>
  );
};
