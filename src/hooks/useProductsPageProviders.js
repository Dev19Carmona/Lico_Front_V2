import { CreateGeneralProducts } from "@/components/CreateGeneralProducts";
import { ModalGeneral } from "@/components/ModalGeneral";
import { ProviderList } from "@/components/ProviderList";
import {
  Categories,
  Category_delete,
  Category_save,
  categoriesTotal,
} from "@/graphql/Category";
import {
  Provider_delete,
  Provider_save,
  Providers,
  providersTotal,
} from "@/graphql/Provider";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Box, Grid, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { LIMIT } from "../../config/Constants";
import { PaginatorGeneral } from "@/components/PaginatorGeneral";
import { CategoryList } from "@/components/CategoryList";
import {
  SubCategories,
  SubCategory_save,
  subCategoriesTotal,
} from "@/graphql/SubCategory";
import { SubCategoryList } from "@/components/SubCategoryList";
export const useProductsPageProviders = () => {
  //State
  const [pageProviders, setPageProviders] = useState(1);
  const [pageCategories, setPageCategories] = useState(1);
  const [pageSubCategories, setPageSubCategories] = useState(1);
  const [alertSaveTrue, setalertSaveTrue] = useState(false);
  const [alertSaveFalse, setalertSaveFalse] = useState(false);
  const [providerData, setProviderData] = useState({
    _id: "",
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [categoryData, setCategoryData] = useState({
    _id: "",
    name: "",
  });
  const [subCategoryData, setSubCategoryData] = useState({
    _id: "",
    name: "",
    categoryId: "",
  });
  const [searchProvider, setSearchProvider] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchSubCategory, setSearchSubCategory] = useState("");
  //InitialValues
  const initialValProviderRegister = {
    _id: providerData._id,
    name: providerData.name,
    phone: providerData.phone,
    address: providerData.address,
    email: providerData.email,
  };

  const initialValCategoryRegister = {
    _id: categoryData._id,
    name: categoryData.name,
  };
  const initialValSubCategoryRegister = {
    _id: subCategoryData._id,
    name: subCategoryData.name,
    categoryId: subCategoryData.categoryId,
  };
  const initialValSearch = {
    search: "",
  };
  //Queries
  const [getProviders, { data: providers }] = useLazyQuery(Providers);
  const [getCategories, { data: categories }] = useLazyQuery(Categories);
  const [getSubCategories, { data: subCategories }] =
    useLazyQuery(SubCategories);
  const { data: totalProviders } = useQuery(providersTotal);
  const { data: totalCategories } = useQuery(categoriesTotal);
  const { data: totalSubCategories } = useQuery(subCategoriesTotal);

  //CONSTANTS
  const pagesTotalProviders = Math.ceil(totalProviders?.providersTotal / LIMIT);
  const pagesTotalCategories = Math.ceil(
    totalCategories?.categoriesTotal / LIMIT
  );
  const pagesTotalSubCategories = Math.ceil(
    totalSubCategories?.subCategoriesTotal / LIMIT
  );

  //Mutations
  const [
    providerSave,
    { data: isProviderCreate, loading: loadRegisterProvider, error: errorRegisterProvider },
  ] = useMutation(Provider_save, {
    refetchQueries: () => {
      const refetchQueries = [];
      for (let page = 1; page <= pagesTotalProviders; page++) {
        refetchQueries.push({
          query: Providers,
          variables: {
            filters: {
              search: searchProvider,
            },
            options: {
              limit: LIMIT,
              page: page,
            },
          },
        });
      }
      refetchQueries.push({
        query: providersTotal,
      });
      return refetchQueries;
    },
  });
console.log(isProviderCreate, errorRegisterProvider);
  const [
    categorySave,
    { data: isCategorySave, loading: loadRegisterCategory },
  ] = useMutation(Category_save, {
    refetchQueries: () => {
      const refetchQueries = [];
      for (let page = 1; page <= pagesTotalCategories; page++) {
        refetchQueries.push({
          query: Categories,
          variables: {
            filters: {
              search: searchCategory,
            },
            options: {
              limit: LIMIT,
              page: page,
            },
          },
        });
      }
      refetchQueries.push({
        query: categoriesTotal,
      });
      return refetchQueries;
    },
  });

  const [
    deleteProvider,
    { data: isProviderDelete, loading: loadProviderDelete },
  ] = useMutation(Provider_delete, {
    refetchQueries: () => {
      const refetchQueries = [];
      for (let page = 1; page <= pagesTotalProviders; page++) {
        refetchQueries.push({
          query: Providers,
          variables: {
            filters: {
              search: searchProvider,
            },
            options: {
              limit: LIMIT,
              page: page,
            },
          },
        });
      }
      refetchQueries.push({
        query: providersTotal,
      });
      return refetchQueries;
    },
  });

  const [
    deleteCategory,
    { data: isCategoryDelete, loading: loadCategoryDelete },
  ] = useMutation(Category_delete, {
    refetchQueries: () => {
      const refetchQueries = [];
      for (let page = 1; page <= pagesTotalCategories; page++) {
        refetchQueries.push({
          query: Categories,
          variables: {
            filters: {
              search: searchCategory,
            },
            options: {
              limit: LIMIT,
              page: page,
            },
          },
        });
      }

      refetchQueries.push({
        query: categoriesTotal,
      });
      
      for (let page = 1; page <= pagesTotalSubCategories; page++) {
        refetchQueries.push({
          query: SubCategories,
          variables: {
            filters: {
              search: searchSubCategory,
            },
            options: {
              limit: LIMIT,
              page: page,
            },
          },
        });
      }

      refetchQueries.push({
        query: subCategoriesTotal,
      });

      return refetchQueries;
    },
  });

  const [
    subCategorySave,
    { data: isSubCategorySave, loading: loadRegisterSubCategory },
  ] = useMutation(SubCategory_save, {
    refetchQueries: () => {
      const refetchQueries = [];
      for (let page = 1; page <= pagesTotalSubCategories; page++) {
        refetchQueries.push({
          query: SubCategories,
          variables: {
            filters: {
              search: searchSubCategory,
            },
            options: {
              limit: LIMIT,
              page: page,
            },
          },
        });
      }
      refetchQueries.push({
        query: subCategoriesTotal,
      });
      return refetchQueries;
    },
  });

  //Effects
  useEffect(() => {
    getCategories({
      variables: {
        filters: {
          search: searchCategory,
        },
        options: {
          limit: LIMIT,
          page: pageCategories,
        },
      },
    });
  }, [searchCategory, getCategories, pageCategories, LIMIT]);

  useEffect(() => {
    getSubCategories({
      variables: {
        filters: {
          search: searchSubCategory,
        },
        options: {
          limit: LIMIT,
          page: pageSubCategories,
        },
      },
    });
  }, [searchSubCategory, getSubCategories, pageSubCategories, LIMIT]);

  useEffect(() => {
    getProviders({
      variables: {
        filters: {
          search: searchProvider,
        },
        options: {
          limit: LIMIT,
          page: pageProviders,
        },
      },
    });
  }, [searchProvider, getProviders, pageProviders, LIMIT]);

  useEffect(() => {
    if (isCategorySave?.Category_save) {
      setalertSaveTrue(true);
    }
    if (isCategorySave?.Category_save === false) {
      setalertSaveFalse(true);
    }
  }, [isCategorySave]);

  useEffect(() => {
    if (isProviderCreate?.Provider_save) {
      setalertSaveTrue(true);
    }
    if (isProviderCreate?.Provider_save === false) {
      setalertSaveFalse(true);
    }
  }, [isProviderCreate]);

  useEffect(() => {
    if (isProviderDelete?.Provider_delete) {
      setalertSaveTrue(true);
    }
    if (isProviderDelete?.Provider_delete === false) {
      setalertSaveFalse(true);
    }
  }, [isProviderDelete]);

  useEffect(() => {
    if (isCategoryDelete?.Category_delete) {
      setalertSaveTrue(true);
    }
    if (isCategoryDelete?.Category_delete === false) {
      setalertSaveFalse(true);
    }
  }, [isCategoryDelete]);

  useEffect(() => {
    if (isSubCategorySave?.SubCategory_save) {
      setalertSaveTrue(true);
    }
    if (isSubCategorySave?.SubCategory_save === false) {
      setalertSaveFalse(true);
    }
  }, [isSubCategorySave]);

  useEffect(() => {
    let timer;
    if (alertSaveTrue) {
      timer = setTimeout(() => {
        setalertSaveTrue(false);
      }, 5000);
    }
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [alertSaveTrue]);

  useEffect(() => {
    let timer;
    if (alertSaveFalse) {
      timer = setTimeout(() => {
        setalertSaveFalse(false);
      }, 5000);
    }
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [alertSaveFalse]);
  //Modal Settings
  const settingsModalCreateProvider = useDisclosure();
  const settingsModalUpdateProvider = useDisclosure();
  const settingsModalDeleteProvider = useDisclosure();
  const settingsModalCreateCategory = useDisclosure();
  const settingsModalUpdateCategory = useDisclosure();
  const settingsModalDeleteCategory = useDisclosure();
  const settingsModalCreateSubCategory = useDisclosure();
  const settingsModalUpdateSubCategory = useDisclosure();
  const settingsModalDeleteSubCategory = useDisclosure();

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  //Handles
  const handleOpenModalCreateCategory = () => {
    setOverlay(<OverlayTwo />);
    settingsModalCreateCategory.onOpen();
  };

  const handleOpenModalCreateSubCategory = () => {
    setOverlay(<OverlayTwo />);
    settingsModalCreateSubCategory.onOpen();
  };

  const handleOpenModalCreateProvider = () => {
    setProviderData({
      name: "",
      phone: "",
      address: "",
      email: "",
    });
    setOverlay(<OverlayTwo />);
    settingsModalCreateProvider.onOpen();
  };

  const handleOpenModalUpdateProvider = (data) => {
    setProviderData(data);
    setOverlay(<OverlayTwo />);
    settingsModalUpdateProvider.onOpen();
  };
  const handleOpenModalDeleteProvider = (data) => {
    setProviderData(data);
    setOverlay(<OverlayTwo />);
    settingsModalDeleteProvider.onOpen();
  };
  const handleOpenModalUpdateCategory = (data) => {
    setCategoryData(data);
    setOverlay(<OverlayTwo />);
    settingsModalUpdateCategory.onOpen();
  };
  const handleOpenModalDeleteCategory = (data) => {
    setCategoryData(data);
    setOverlay(<OverlayTwo />);
    settingsModalDeleteCategory.onOpen();
  };
  const handleOpenModalUpdateSubCategory = (data) => {
    setSubCategoryData(data);
    setOverlay(<OverlayTwo />);
    settingsModalUpdateSubCategory.onOpen();
  };
  const handleOpenModalDeleteSubCategory = (data) => {
    setSubCategoryData(data);
    setOverlay(<OverlayTwo />);
    settingsModalDeleteSubCategory.onOpen();
  };


  const handleProviderRegister = (values, { resetForm }) => {
    if (values._id) {
      providerSave({
        variables: {
          providersData: {
            _id: values._id,
            name: values.name,
            phone: values.phone,
            address: values.address,
            email: values.email,
          },
        },
      });
    } else {
      providerSave({
        variables: {
          providersData: {
            name: values.name,
            phone: values.phone,
            address: values.address,
            email: values.email,
          },
        },
      });
    }
    resetForm();
  };
  const handleCategoryRegister = (values, { resetForm }) => {
    if (values._id) {
      categorySave({
        variables: {
          categoryData: {
            _id: values._id,
            name: values.name,
          },
        },
      });
    } else {
      categorySave({
        variables: {
          categoryData: {
            name: values.name,
          },
        },
      });
    }
    resetForm();
  };

  const handleSubCategoryRegister = (values, { resetForm }) => {
    if (values._id) {
      subCategorySave({
        variables: {
          subCategoryData: {
            _id: values._id,
            name: values.name,
            categoryId: values.categoryId,
          },
        },
      });
    } else {
      subCategorySave({
        variables: {
          subCategoryData: {
            name: values.name,
            categoryId: values.categoryId,
          },
        },
      });
    }
    resetForm();
  };

  const handleDeleteProvider = () => {
    deleteProvider({
      variables: {
        _id: providerData._id,
      },
    });
  };

  const handleDeleteCategory = () => {
    deleteCategory({
      variables: {
        _id: categoryData._id,
      },
    });
  };

  const handleSearchProvider = (values, { resetForm }) => {
    setSearchProvider(values.search);
    resetForm();
  };

  const handleSearchCategory = (values, { resetForm }) => {
    setSearchCategory(values.search);
    resetForm();
  };
  const handleSearchSubCategory = (values, { resetForm }) => {
    setSearchSubCategory(values.search);
    resetForm();
  };
  //Arrays
  //Tabs
  const index = [
    {
      name: "Lista de Productos",
    },
    {
      name: "Categorias",
    },
    {
      name: "Sub Categorias",
    },
    {
      name: "Proveedores",
    },
  ];
  const components = [
    <Box key={1} bg="red.500" p={4}>
      <Text color="white">Lista de Productos 1</Text>
    </Box>,
    <Grid>
      <CreateGeneralProducts
        onClick={handleOpenModalCreateCategory}
        title={<MdCreateNewFolder size={25} />}
        titleTab="Categorias"
        initialValues={initialValSearch}
        onSubmit={handleSearchCategory}
      />
      <PaginatorGeneral
        pagesTotal={pagesTotalCategories}
        page={pageCategories}
        setPage={setPageCategories}
      />
      <CategoryList
        handleOpenModalUpdateCategory={handleOpenModalUpdateCategory}
        handleOpenModalDeleteCategory={handleOpenModalDeleteCategory}
        categories={categories}
      />
    </Grid>,
    <Grid>
      <CreateGeneralProducts
        onClick={handleOpenModalCreateSubCategory}
        title={<MdCreateNewFolder size={25} />}
        titleTab="Sub Categorias"
        initialValues={initialValSearch}
        onSubmit={handleSearchSubCategory}
      />
      <PaginatorGeneral pagesTotal={pagesTotalSubCategories} page={pageSubCategories} setPage={setPageSubCategories}/>
      <SubCategoryList
         handleOpenModalUpdateSubCategory={handleOpenModalUpdateCategory}
         handleOpenModalDeleteSubCategory={handleOpenModalDeleteCategory}
        subCategories={subCategories}
      />
    </Grid>,
    <Grid>
      <CreateGeneralProducts
        onClick={handleOpenModalCreateProvider}
        title={<MdCreateNewFolder size={25} />}
        titleTab="Proveedores"
        initialValues={initialValSearch}
        onSubmit={handleSearchProvider}
      />
      <Grid>
        <PaginatorGeneral
          pagesTotal={pagesTotalProviders}
          page={pageProviders}
          setPage={setPageProviders}
        />
        <ProviderList
          handleOpenModalUpdateProvider={handleOpenModalUpdateProvider}
          handleOpenModalDeleteProvider={handleOpenModalDeleteProvider}
          providers={providers}
        />
      </Grid>
    </Grid>,
  ];
  return {
    index,
    components,
    settingsModalCreateProvider,
    overlay,
    initialValProviderRegister,
    handleProviderRegister,
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
    settingsModalUpdateSubCategory,
    settingsModalDeleteSubCategory,
  };
};
