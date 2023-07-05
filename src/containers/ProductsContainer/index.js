import { AlertDeleteGeneral } from "@/components/AlertDeleteGeneral";
import { CategoryForm } from "@/components/CategoryForm";
import { ModalGeneral } from "@/components/ModalGeneral";
import { ProviderForm } from "@/components/ProviderForm";
import { TabsGeneral } from "@/components/TabsGeneral";
import { useProductsPageProviders } from "@/hooks/useProductsPageProviders";
import { Box } from "@chakra-ui/react";

export const ProductsContainer = () => {
  const {
    index,
    components,
    settingsModalCreateProvider,
    overlay,
    handleProviderRegister,
    initialValProviderRegister,
    loadRegisterProvider,
    alertSaveTrue,
    alertSaveFalse,
    settingsModalUpdateProvider,
    providerData,
    settingsModalCreateCategory,
    initialValCategoryRegister,
    handleCategoryRegister,
    loadRegisterCategory,
    settingsModalDeleteProvider,
    handleDeleteProvider,
  } = useProductsPageProviders();

  return (
    <Box m={5}>
      <TabsGeneral index={index} components={components} />
      <ModalGeneral
        title={"Crear Proveedor"}
        body={
          <ProviderForm
            loadRegisterProvider={loadRegisterProvider}
            onSubmit={handleProviderRegister}
            initialValues={initialValProviderRegister}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalCreateProvider.isOpen}
        onClose={settingsModalCreateProvider.onClose}
      />
      <ModalGeneral
        title={"Actualizar Proveedor"}
        body={
          <ProviderForm
            loadRegisterProvider={loadRegisterProvider}
            onSubmit={handleProviderRegister}
            initialValues={initialValProviderRegister}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalUpdateProvider.isOpen}
        onClose={settingsModalUpdateProvider.onClose}
      />
      <ModalGeneral
        title={""}
        body={
          
          <AlertDeleteGeneral
          title={"¿Desea eliminar el Proveedor?"}
          description = {"Si el proveedor pertenece a un producto podría tener problemas al realizar esta accion."}
            // loadRegisterCategory={loadRegisterCategory}
              onSubmit={handleDeleteProvider}
            // alertSaveFalse={alertSaveFalse}
            // alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalDeleteProvider.isOpen}
        onClose={settingsModalDeleteProvider.onClose}
      />
      <ModalGeneral
        title={"Crear Categoria"}
        body={
          
          <CategoryForm
            loadRegisterCategory={loadRegisterCategory}
             onSubmit={handleCategoryRegister}
            initialValues={initialValCategoryRegister}
            // alertSaveFalse={alertSaveFalse}
            // alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalCreateCategory.isOpen}
        onClose={settingsModalCreateCategory.onClose}
      />
      
    </Box>
  );
};
