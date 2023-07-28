import { AlertDeleteGeneral } from "@/components/AlertDeleteGeneral";
import { CategoryForm } from "@/components/CategoryForm";
import { LoadingGeneral } from "@/components/LoadingGeneral";
import { ModalGeneral } from "@/components/ModalGeneral";
import { ProductForm } from "@/components/ProductForm";
import { ProviderForm } from "@/components/ProviderForm";
import { SubCategoryForm } from "@/components/SubCategoryForm";
import { TabsGeneral } from "@/components/TabsGeneral";
import { useProductsPage } from "@/hooks/useProductsPage";
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
    settingsModalUpdateSubCategory,
    settingsModalDeleteSubCategory,
    loadSubCategoryDelete,
    handleDeleteSubCategory,
    settingsModalCreateProduct,
    loadRegisterProduct,
    subCategories,
    initialValProductRegister,
    handleSelectCategory,
    selectCategory,
    handleProductRegister,
    handleSaveImageProduct,
    imageProduct,
    settingsModalUpdateProduct,
    settingsModalDeleteProduct,
    loadProductDelete,
    handleDeleteProduct,
    providers,
    loadProviders,
    loadProducts,
    loadSubCategories,
    loadCategories,
  } = useProductsPage();

  return (
    <Box m={5} w={'full'}>
      <TabsGeneral index={index} components={components} />

      {/* MODAL CREAR PROVEEDOR */}
      {/* MODAL ACTUALIZAR SUB CATEGORIA */}
      <ModalGeneral
        title={"Actualizar Sub Categoria"}
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
        isOpen={settingsModalUpdateSubCategory.isOpen}
        onClose={settingsModalUpdateSubCategory.onClose}
      />

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

      {/* MODAL ELIMINAR SUB CATEGORIA */}
      <ModalGeneral
        title={"Eliminar Sub Categoria"}
        body={
          <AlertDeleteGeneral
            title={"¿Desea eliminar la Sub Categoria?"}
            description={
              "Si la Sub Categoria pertenece a un producto podría tener problemas al realizar esta accion."
            }
            load={loadSubCategoryDelete}
            onSubmit={handleDeleteSubCategory}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalDeleteSubCategory.isOpen}
        onClose={settingsModalDeleteSubCategory.onClose}
      />

      <ModalGeneral
        title={"Crear Producto"}
        body={
          <ProductForm
            loadRegister={loadRegisterProduct}
            onSubmit={handleProductRegister}
            initialValues={initialValProductRegister}
            handleSelect={handleSelectCategory}
            imageProduct={imageProduct}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
            categories={categories}
            subCategories={subCategories}
            selectCategory={selectCategory}
            providers={providers}
            handleSaveImageProduct={handleSaveImageProduct}
          />
        }
        overlay={overlay}
        isOpen={settingsModalCreateProduct.isOpen}
        onClose={settingsModalCreateProduct.onClose}
      />

      <ModalGeneral
        title={"Actualizar Producto"}
        body={
          <ProductForm
            loadRegister={loadRegisterProduct}
            onSubmit={handleProductRegister}
            initialValues={initialValProductRegister}
            handleSelect={handleSelectCategory}
            imageProduct={imageProduct}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
            categories={categories}
            subCategories={subCategories}
            providers={providers}
            selectCategory={selectCategory}
            handleSaveImageProduct={handleSaveImageProduct}
          />
        }
        overlay={overlay}
        isOpen={settingsModalUpdateProduct.isOpen}
        onClose={settingsModalUpdateProduct.onClose}
      />

      <ModalGeneral
        title={"Eliminar Producto"}
        body={
          <AlertDeleteGeneral
            title={"¿Desea eliminar el Producto?"}
            description={
              "Si eliminas el producto puedes generar problemas en las facturas donde esta registrado."
            }
            load={loadProductDelete}
            onSubmit={()=>{
              handleDeleteProduct()
              
            }}
            alertSaveFalse={alertSaveFalse}
            alertSaveTrue={alertSaveTrue}
          />
        }
        overlay={overlay}
        isOpen={settingsModalDeleteProduct.isOpen}
        onClose={settingsModalDeleteProduct.onClose}
      />
      {
        loadProviders||
        loadProducts||
        loadSubCategories||
        loadCategories||
        loadCategoryDelete||
        loadProductDelete||
        loadProviderDelete||
        loadSubCategoryDelete||
        loadRegisterCategory||
        loadRegisterProduct||
        loadRegisterProvider||
        loadRegisterSubCategory
        &&
        <LoadingGeneral/>
      }
    </Box>
  );
};
