import { CreateGeneralProducts } from "@/components/CreateGeneralProducts";
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
import { Flex, Grid, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { LIMIT } from "../../config/Constants";
import { PaginatorGeneral } from "@/components/PaginatorGeneral";
import { CategoryList } from "@/components/CategoryList";
import {
  SubCategories,
  SubCategory_delete,
  SubCategory_save,
  subCategoriesTotal,
} from "@/graphql/SubCategory";
import { SubCategoryList } from "@/components/SubCategoryList";
import {
  Product_delete,
  Product_save,
  Products,
  productsTotal,
} from "@/graphql/Product";
import { ProductList } from "@/components/ProductList";
import { ButtonGeneral } from "@/components/ButtonGeneral";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
export const useProductsPage = () => {
  //State
  const [pageProviders, setPageProviders] = useState(1);
  const [pageCategories, setPageCategories] = useState(1);
  const [pageSubCategories, setPageSubCategories] = useState(1);
  const [pageProducts, setPageProducts] = useState(1);
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
  const [productData, setProductData] = useState({
    _id: "",
    name: "",
    price: 0,
    amount: 0,
    isLeave: 0,
    isStay: 0,
    categoryId: "",
    subCategoryId: "",
    providerId: "",
  });
  const [searchProvider, setSearchProvider] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchSubCategory, setSearchSubCategory] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [imageProduct, setImageProduct] = useState();
  const [changeView, setChangeView] = useState(true);
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
  const initialValProductRegister = productData;
  //Queries
  const [getProviders, { data: providers, loading:loadProviders }] = useLazyQuery(Providers);
  const [getCategories, { data: categories, loading:loadCategories }] = useLazyQuery(Categories);
  const [getProducts, { data: products, loading:loadProducts }] = useLazyQuery(Products);
  const [getSubCategories, { data: subCategories, loading:loadSubCategories }] =
    useLazyQuery(SubCategories);
  const { data: totalProviders } = useQuery(providersTotal);
  const { data: totalCategories } = useQuery(categoriesTotal);
  const { data: totalSubCategories } = useQuery(subCategoriesTotal);
  const { data: totalProducts } = useQuery(productsTotal);

  //CONSTANTS
  const pagesTotalProviders = Math.ceil(totalProviders?.providersTotal / LIMIT);
  const pagesTotalCategories = Math.ceil(
    totalCategories?.categoriesTotal / LIMIT
  );
  const pagesTotalSubCategories = Math.ceil(
    totalSubCategories?.subCategoriesTotal / LIMIT
  );
  const pagesTotalProducts = Math.ceil(totalProducts?.productsTotal / LIMIT);

  //Mutations
  const [
    providerSave,
    {
      data: isProviderCreate,
      loading: loadRegisterProvider,
      error: errorRegisterProvider,
    },
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
    deleteSubCategory,
    { data: isSubCategoryDelete, loading: loadSubCategoryDelete },
  ] = useMutation(SubCategory_delete, {
    refetchQueries: () => {
      const refetchQueries = [];
      for (let page = 1; page <= pagesTotalSubCategories; page++) {
        refetchQueries.push({
          query: SubCategories,
          variables: {
            filters: {
              search: searchSubCategory,
              categoryId: selectCategory,
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
              categoryId: selectCategory,
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

  const [productSave, { data: isProductSave, loading: loadRegisterProduct }] =
    useMutation(Product_save, {
      refetchQueries: () => {
        const refetchQueries = [];
        for (let page = 1; page <= pagesTotalProducts; page++) {
          refetchQueries.push({
            query: Products,
            variables: {
              filters: {
                search: searchProduct,
              },
              options: {
                limit: LIMIT,
                page: page,
              },
            },
          });
        }
        refetchQueries.push({
          query: productsTotal,
        });
        return refetchQueries;
      },
    });
    
    
  const [deleteProduct, { data: isProductDelete, loading: loadProductDelete }] =
    useMutation(Product_delete, {
      refetchQueries: () => {
        const refetchQueries = [];
        for (let page = 1; page <= pagesTotalProducts; page++) {
          refetchQueries.push({
            query: Products,
            variables: {
              filters: {
                search: searchProduct,
              },
              options: {
                limit: LIMIT,
                page: page,
              },
            },
          });
        }
        refetchQueries.push({
          query: productsTotal,
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
  }, [searchCategory, getCategories, pageCategories]);

  useEffect(() => {
    getSubCategories({
      variables: {
        filters: {
          search: searchSubCategory,
          categoryId: selectCategory,
        },
        options: {
          limit: LIMIT,
          page: pageSubCategories,
        },
      },
    });
  }, [searchSubCategory, getSubCategories, pageSubCategories, selectCategory]);
  useEffect(() => {
    getProducts({
      variables: {
        filters: {
          search: searchProduct,
        },
        options: {
          limit: LIMIT,
          page: pageProducts,
        },
      },
    });
  }, [searchProduct, getProducts, pageProducts]);

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
  }, [searchProvider, getProviders, pageProviders]);

  useEffect(() => {
    if (isProductDelete?.Product_delete) {
      setalertSaveTrue(true);
    }
    if (isProductDelete?.Product_delete === false) {
      setalertSaveFalse(true);
    }
  }, [isProductDelete]);

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
    if (isProductSave?.Product_save) {
      setalertSaveTrue(true);
    }
    if (isProductSave?.Product_save === false) {
      setalertSaveFalse(true);
    }
  }, [isProductSave]);

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
    if (isSubCategoryDelete?.SubCategory_delete) {
      setalertSaveTrue(true);
    }
    if (isSubCategoryDelete?.SubCategory_delete === false) {
      setalertSaveFalse(true);
    }
  }, [isSubCategoryDelete]);

  useEffect(() => {
    let timer;
    if (alertSaveTrue) {
      timer = setTimeout(() => {
        setalertSaveTrue(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [alertSaveTrue]);

  useEffect(() => {
    let timer;
    if (alertSaveFalse) {
      timer = setTimeout(() => {
        setalertSaveFalse(false);
      }, 3000);
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
  const settingsModalCreateProduct = useDisclosure();
  const settingsModalUpdateProduct = useDisclosure();
  const settingsModalDeleteProduct = useDisclosure();

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
  const handleOpenModalCreateProduct = () => {
    setSelectCategory("");
    setImageProduct();
    setProductData({
      _id: "",
      name: "",
      price: "",
      amount: "",
      categoryId: "",
      subCategoryId: "",
      image: "",
    });
    setOverlay(<OverlayTwo />);
    settingsModalCreateProduct.onOpen();
  };
  const handleOpenModalCreateCategory = () => {
    setCategoryData({
      _id: "",
      name: "",
    });
    setOverlay(<OverlayTwo />);
    settingsModalCreateCategory.onOpen();
  };

  const handleOpenModalCreateSubCategory = () => {
    setSubCategoryData({
      _id: "",
      name: "",
      categoryId: "",
    });
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
  const handleOpenModalUpdateProduct = (data) => {
    setSelectCategory(data.categoryId);
    setImageProduct();
    setProductData({
      _id: data._id,
      name: data.name,
      price: data.price,
      amount: data.amount,
      isLeave: data.isLeave,
      isStay: data.isStay,
      categoryId: data.categoryId,
      subCategoryId: data.subCategoryId,
      providerId: data.providerId,
    });
    setOverlay(<OverlayTwo />);
    settingsModalUpdateProduct.onOpen();
  };
  const handleOpenModalDeleteProduct = (data) => {
    setProductData(data);
    setOverlay(<OverlayTwo />);
    settingsModalDeleteProduct.onOpen();
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
  const handleProductRegister = (values, { resetForm }) => {
    
    if (values._id) {
      productSave({
        variables: {
          productData: {
            _id: values._id,
            name: values.name,
            amount: values.amount === "" ? 0 : values.amount,
            price: values.price === "" ? 0 : values.price,
            categoryId: selectCategory,
            subCategoryId: values.subCategoryId,
            providerId: values.providerId,
            isLeave: values.isLeave === "" ? 0 : values.isLeave,
            isStay: values.isStay === "" ? 0 : values.isStay,
            image: imageProduct,
          },
        },
      });
    } else {
      delete values._id
      
      productSave({
        variables: {
          productData: {
            name: values.name,
            amount: values.amount === "" ? 0 : values.amount,
            price: values.price === "" ? 0 : values.price,
            categoryId: selectCategory,
            subCategoryId: values.subCategoryId,
            providerId: values.providerId !== "" && values.providerId,
            isLeave: values.isLeave === "" ? 0 : values.isLeave,
            isStay: values.isStay === "" ? 0 : values.isStay,
            image: imageProduct,
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
  const handleDeleteSubCategory = () => {
    deleteSubCategory({
      variables: {
        _id: subCategoryData._id,
      },
    });
  };
  const handleDeleteProduct = () => {
    deleteProduct({
      variables: {
        _id: productData._id,
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
  const handleSelectCategory = (e) => {
    setSelectCategory(e.target.value);
  };
  const handleSearchSubCategory = (values, { resetForm }) => {
    setSearchSubCategory(values.search);
    resetForm();
  };
  const handleSearchProduct = (values, { resetForm }) => {
    setSearchProduct(values.search);
    resetForm();
  };
  const handleSaveImageProduct = (event) => {
    if (event?.target?.validity && event?.target?.files) {
      setImageProduct(event?.target?.files[0]);
    }
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
    <Grid key="products" gap={5}>
      <CreateGeneralProducts
        titleTab="Productos"
        initialValues={initialValSearch}
        onSubmit={handleSearchProduct}
      />
      <Grid
        templateColumns="1fr auto" // Divide el espacio en dos columnas, la primera ocupa el ancho restante y la segunda se ajusta al contenido.
        justifyItems="center"
      >
        <PaginatorGeneral
          pagesTotal={pagesTotalProducts}
          page={pageProducts}
          setPage={setPageProducts}
        />
        <Flex justifySelf="end">
          <ButtonGeneral
            onClick={() => {
              setChangeView(!changeView);
            }}
            title={
              changeView ? (
                <AiOutlineUnorderedList fontSize={25} />
              ) : (
                <BsFillGrid3X3GapFill fontSize={25} />
              )
            }
          />
        </Flex>
      </Grid>

      <ProductList
        onClick={handleOpenModalCreateProduct}
        changeView={changeView}
        handleOpenModalUpdate={handleOpenModalUpdateProduct}
        handleOpenModalDelete={handleOpenModalDeleteProduct}
        products={products}
      />
    </Grid>,
    <Grid key="categories" gap={5}>
      <CreateGeneralProducts
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
        onClick={handleOpenModalCreateCategory}
        handleOpenModalUpdateCategory={handleOpenModalUpdateCategory}
        handleOpenModalDeleteCategory={handleOpenModalDeleteCategory}
        categories={categories}
      />
    </Grid>,
    <Grid key="subcategories" gap={5}>
      <CreateGeneralProducts
        titleTab="Sub Categorias"
        initialValues={initialValSearch}
        onSubmit={handleSearchSubCategory}
      />
      <PaginatorGeneral
        pagesTotal={pagesTotalSubCategories}
        page={pageSubCategories}
        setPage={setPageSubCategories}
      />
      <SubCategoryList
        onClick={handleOpenModalCreateSubCategory}
        handleOpenModalUpdateSubCategory={handleOpenModalUpdateSubCategory}
        handleOpenModalDeleteSubCategory={handleOpenModalDeleteSubCategory}
        subCategories={subCategories}
      />
    </Grid>,
    <Grid key="providers" gap={5}>
      <CreateGeneralProducts
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
        onClick={handleOpenModalCreateProvider}
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
    loadSubCategoryDelete,
    handleDeleteSubCategory,
    settingsModalCreateProduct,
    settingsModalUpdateProduct,
    settingsModalDeleteProduct,
    loadRegisterProduct,
    subCategories,
    initialValProductRegister,
    handleSelectCategory,
    selectCategory,
    handleProductRegister,
    handleSaveImageProduct,
    imageProduct,
    loadProductDelete,
    handleDeleteProduct,
    providers,
    loadProviders,
    loadProducts,
    loadSubCategories,
    loadCategories,
  };
};
