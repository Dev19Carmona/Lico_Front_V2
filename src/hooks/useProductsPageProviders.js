import { CreateGeneralProducts } from "@/components/CreateGeneralProducts";
import { ModalGeneral } from "@/components/ModalGeneral";
import { ProviderList } from "@/components/ProviderList";
import { Category_save } from "@/graphql/Category";
import { Provider_delete, Provider_save, Providers } from "@/graphql/Provider";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Grid, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
export const useProductsPageProviders = () => {
  //State
  const [alertSaveTrue, setalertSaveTrue] = useState(false);
  const [alertSaveFalse, setalertSaveFalse] = useState(false);
  const [providerData, setProviderData] = useState({
    _id: "",
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  console.log("ESTE ES",providerData._id);
  const [categoryData, setCategoryData] = useState({
    name: "",
  });

  //InitialValues
  const initialValProviderRegister = {
    _id: providerData._id,
    name: providerData.name,
    phone: providerData.phone,
    address: providerData.address,
    email: providerData.email,
  };

  const initialValCategoryRegister = {
    name: categoryData.name,
  };

  //Queries
  const { data: providers } = useQuery(Providers);

  //Mutations
  const [
    providerSave,
    { data: isProviderCreate, loading: loadRegisterProvider },
  ] = useMutation(Provider_save, {
    refetchQueries: [
      {
        query: Providers,
      },
    ],
  });

  const [
    categorySave,
    { data: isCategorySave, loading: loadRegisterCategory },
  ] = useMutation(Category_save);

  const [
    deleteProvider,
    { data: isProviderDelete, loading: loadProviderDelete },
  ] = useMutation(Provider_delete, {
    refetchQueries: [
      {
        query: Providers,
      },
    ],
  });

  //Effects
  useEffect(() => {
    if (isProviderCreate?.Provider_save) {
      setalertSaveTrue(true);
    }
    if (isProviderCreate?.Provider_save === false) {
      setalertSaveFalse(true);
    }
  }, [isProviderCreate]);
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
  const settingsModalCreateCategory = useDisclosure();
  const settingsModalUpdateProvider = useDisclosure();
  const settingsModalDeleteProvider = useDisclosure();
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
    // setProviderData({
    //   name: "",
    //   phone: "",
    //   address: "",
    //   email: "",
    // });
    setOverlay(<OverlayTwo />);
    settingsModalCreateCategory.onOpen();
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
    categorySave({
      variables: {
        categoryData: {
          name: values.name,
        },
      },
    });
  };

  const handleDeleteProvider = () => {
    deleteProvider({
      variables: {
        _id: providerData._id,
      },
    });
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
      />
      {/* <ProviderList
        handleOpenModalUpdateProvider={handleOpenModalUpdateProvider}
        providers={providers}
      /> */}
    </Grid>,
    <Box key={1} bg="red.500" p={4}>
      <Text color="white">Sub Categorias </Text>
    </Box>,
    <Grid>
      <CreateGeneralProducts
        onClick={handleOpenModalCreateProvider}
        title={<MdCreateNewFolder size={25} />}
        titleTab="Proveedores"
      />
      <Grid>
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
    handleDeleteProvider
  };
};
