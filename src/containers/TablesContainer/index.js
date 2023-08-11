import { AlertDeleteGeneral } from "@/components/AlertDeleteGeneral";
import { ButtonGeneral } from "@/components/ButtonGeneral";
import { InputGeneral } from "@/components/InputGeneral";
import { ModalGeneral } from "@/components/ModalGeneral";
import { TableList } from "@/components/TableList";
import { useTablesPage } from "@/hooks/useTablesPage";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { RiBillLine, RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
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
      <Box
        borderRadius={10}
        boxShadow={"xl"}
        justifyContent={"space-around"}
        key={1}
        p={4}
        display="flex"
        gridTemplateColumns="1fr"
      >
        <Box letterSpacing={2} fontSize={30}>
          {changeSell ? "Carritos" : "Venta Directa"}{" "}
        </Box>
        <GridItem justifySelf={"end"}>
          <ButtonGeneral
            onClick={handleSwitchPriceProducts}
            title={
              !changeSell ? (
                <Flex justifyContent={'space-between'}>
                  <RiCheckboxMultipleBlankLine fontSize={20} />
                  <Text>Carritos</Text>
                </Flex>
              ) : (
                <Flex justifyContent={'space-between'}>
                  <RiBillLine fontSize={20} />
                  <Text>Venta Directa</Text>
                </Flex>
                
              )
            }
          />
        </GridItem>
      </Box>
      {changeSell && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <InputGeneral
            autoFocus={false}
            onSubmit={handleSaveTable}
            initialValues={initialValuesTable}
            placeholder={"Crear Carrito"}
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
        <Grid style={{ textAlign: "center" }}>
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
