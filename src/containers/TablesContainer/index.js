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
  } = useTablesPage();
  return (
    <Grid>
      <InputGeneral
        onSubmit={handleSaveTable}
        initialValues={initialValuesTable}
        placeholder={"Agregar una nueva mesa"}
        icon={<GrAdd fontSize={25} />}
      />
      <TableList handleOpenModalDeleteTable={handleOpenModalDeleteTable} data={tables?.Tables} />
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
    </Grid>
  );
};
