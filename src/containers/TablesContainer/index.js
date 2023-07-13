import { AlertDeleteGeneral } from "@/components/AlertDeleteGeneral";
import { InputGeneral } from "@/components/InputGeneral";
import { ModalGeneral } from "@/components/ModalGeneral";
import { TableList } from "@/components/TableList";
import { useTablesPage } from "@/hooks/useTablesPage";
import { Grid } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

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
    handleSwitchPriceProducts,
    isStay,
    handleChangeSwitch,
    totalAmounts,
    handleTotalAmounts,
    handleChecked,
    productList,
  } = useTablesPage();
  return (
    <Grid>
      <InputGeneral
        autoFocus={true}
        onSubmit={handleSaveTable}
        initialValues={initialValuesTable}
        placeholder={"Agregar una nueva mesa"}
        icon={<GrAdd fontSize={25} />}
        required={true}
      />
      <TableList
        handleChecked={handleChecked}
        totalProductsByBill={totalProductsByBill}
        handleOpenModalDeleteBill={handleOpenModalDeleteBill}
        handleOpenModalDeleteTable={handleOpenModalDeleteTable}
        data={tables?.Tables}
        switchChange={handleSwitchPriceProducts}
        check={isStay}
        handleChangeSwitch={handleChangeSwitch}
        totalAmounts={totalAmounts}
        handleTotalAmounts={handleTotalAmounts}
        productList={productList}
      />
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
