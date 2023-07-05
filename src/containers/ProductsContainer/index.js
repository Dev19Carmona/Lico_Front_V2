import { AlertDeleteGeneral } from "@/components/AlertDeleteGeneral";
import { CategoryForm } from "@/components/CategoryForm";
import { ModalGeneral } from "@/components/ModalGeneral";
import { ProviderForm } from "@/components/ProviderForm";
import { SubCategoryForm } from "@/components/SubCategoryForm";
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
    settingsModalUpdateCategory,
    settingsModalDeleteCategory,
    handleDeleteCategory,
    loadProviderDelete,
    loadCategoryDelete,
    settingsModalCreateSubCategory,
    categories,
    initialValSubCategoryRegister,
    handleSubCategoryRegister,
    loadRegisterSubCategory,
  } = useProductsPageProviders();

  return (
    <Box m={5}>
      <TabsGeneral index={index} components={components} />

      {/* MODAL CREAR PROVEEDOR */}

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

      {/* MODAL ACTUALIZAR PROVEEDOR */}

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

      {/* MODAL ELIMINAR PROVEEDOR */}

      <ModalGeneral
        title={""}
        body={
          <AlertDeleteGeneral
            title={"¿Desea eliminar el Proveedor?"}
            description={
              "Si el proveedor pertenece a un producto podría tener problemas al realizar esta accion."
            }
            load={loadProviderDelete}
            onSubmit={handleDeleteProvider}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalDeleteProvider.isOpen}
        onClose={settingsModalDeleteProvider.onClose}
      />

      {/* MODAL CREAR CATEGORIA */}

      <ModalGeneral
        title={"Crear Categoria"}
        body={
          <CategoryForm
            loadRegisterCategory={loadRegisterCategory}
            onSubmit={handleCategoryRegister}
            initialValues={initialValCategoryRegister}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalCreateCategory.isOpen}
        onClose={settingsModalCreateCategory.onClose}
      />

      {/* MODAL ACTUALIZAR CATEGORIA */}

      <ModalGeneral
        title={"Actualizar Categoria"}
        body={
          <CategoryForm
            loadRegisterCategory={loadRegisterCategory}
            onSubmit={handleCategoryRegister}
            initialValues={initialValCategoryRegister}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalUpdateCategory.isOpen}
        onClose={settingsModalUpdateCategory.onClose}
      />

      {/* MODAL ELIMINAR CATEGORIA */}

      <ModalGeneral
        title={"Eliminar Categoria"}
        body={
          <AlertDeleteGeneral
            title={"¿Desea eliminar la Categoria?"}
            description={
              "Si la categoria pertenece a un producto podría tener problemas al realizar esta accion."
            }
            load={loadCategoryDelete}
            onSubmit={handleDeleteCategory}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalDeleteCategory.isOpen}
        onClose={settingsModalDeleteCategory.onClose}
      />
      
        {/* MODAL CREAR SUB CATEGORIA */}
        <ModalGeneral
        title={"Crear Sub Categoria"}
        body={
          <SubCategoryForm
          categories={categories}
          loadRegisterSubCategory={loadRegisterSubCategory}
            onSubmit={handleSubCategoryRegister}
            initialValues={initialValSubCategoryRegister}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalCreateSubCategory.isOpen}
        onClose={settingsModalCreateSubCategory.onClose}
      />

    </Box>

    

    
  );
};
