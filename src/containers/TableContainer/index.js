import { AlertDeleteGeneral } from "@/components/AlertDeleteGeneral";
import { ModalGeneral } from "@/components/ModalGeneral";
import { TabsGeneral } from "@/components/TabsGeneral";
import { useTablePage } from "@/hooks/useTablePage";
import { Grid } from "@chakra-ui/react";
export const TableContainer = ({ tableId }) => {
  const {
    indexTabsTable,
    components,
    settingsModalDeleteProduct,
    overlay,
    handleDeleteProduct,
  } = useTablePage(tableId);
  
  
  return (
    <Grid >
      
      <TabsGeneral index={indexTabsTable} components={components} />
      <ModalGeneral
        title={""}
        body={
          <AlertDeleteGeneral
            title={"¿Desea eliminar el Producto?"}
            description={
              "Solo se eliminara de la factura que estas creando"
            }
            //load={loadProviderDelete}
            onSubmit={()=>{
              handleDeleteProduct()
              settingsModalDeleteProduct.onClose()
            }}
            // alertSaveFalse={alertSaveFalse}
            // alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalDeleteProduct.isOpen}
        onClose={settingsModalDeleteProduct.onClose}
      />
    </Grid>
  );
};
