import { AlertDeleteGeneral } from "@/components/AlertDeleteGeneral";
import { ModalGeneral } from "@/components/ModalGeneral";
import { TabsGeneral } from "@/components/TabsGeneral";
import { useExpensePage } from "@/hooks/useExpensePage";
import { Grid } from "@chakra-ui/react";

export const ExpenseContainer = ({ providerId }) => {
  const { index, components, overlay, settingsModalDeleteProduct, handleDeleteProduct} = useExpensePage(providerId);
  return (
    <Grid>
      <TabsGeneral index={index} components={components}/>
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
