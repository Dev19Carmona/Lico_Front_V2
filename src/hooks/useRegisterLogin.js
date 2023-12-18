import { Genders } from "@/graphql/Gender";
import { User_login, User_save } from "@/graphql/User";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useLoader } from "./functions/userLoader";

export const useRegisterLogin = () => {
  const router = useRouter();
  //Hooks
  //Mutations
  const [userSave, { data: IsUserCreate, loading: loadRegister }] =
    useMutation(User_save);

  //Queries
  const { data: genders } = useQuery(Genders);
  const [login, { data: token, loading: loadLogin }] = useLazyQuery(User_login);
  //initalValues
  const initialValRegister = {
    fullName: "",
    address: "",
    confirmPassword: "",
    password: "",
    email: "",
    genderId: "",
    nit: "",
    phone: "",
    rolPassword: "",
  };
  const initialValLogin = {
    email: "",
    password: "",
  };
  //Handles
  const handleUserRegister = (values, { resetForm }) => {
    userSave({
      variables: {
        userData: {
          fullName: values.fullName,
          address: values.address,
          confirmPassword: values.confirmPassword,
          password: values.password,
          email: values.email,
          genderId: values.genderId,
          nit: values.nit,
          phone: values.phone,
          rolPassword: values.rolPassword,
        },
      },
    });
    resetForm();
  };
  const handleUserLogin = (values, { resetForm }) => {
    login({
      variables: {
        userLogin: {
          email: values.email,
          password: values.password,
        },
      },
    });
    resetForm();
  };
  //States
  const [alertSaveTrue, setalertSaveTrue] = useState(false);
  const [alertSaveFalse, setalertSaveFalse] = useState(false);

  const { setAlertLogIn, alertLogIn } = useLoader();

  const [alertLogInTrue, setalertLogInTrue] = useState(false);
  const [alertLogInFalse, setalertLogInFalse] = useState(false);
  //Effects
  useEffect(() => {
    if (token?.User_login) {
      setalertLogInTrue(true);
      if (token?.User_login !== null) {
        localStorage.setItem("session", token?.User_login);
        setTimeout(() => {
          setAlertLogIn(true);
          router.reload();
        }, 1000);
      }
    } else {
      if (token?.User_login === null) {
        setalertLogInFalse(true);
      }
    }
  }, [token, router, setAlertLogIn]);

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

  useEffect(() => {
    let timer;
    if (alertLogInTrue) {
      timer = setTimeout(() => {
        setalertLogInTrue(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [alertLogInTrue]);

  useEffect(() => {
    let timer;
    if (alertLogInFalse) {
      timer = setTimeout(() => {
        setalertLogInFalse(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [alertLogInFalse]);

  useEffect(() => {
    if (IsUserCreate?.User_save) {
      setalertSaveTrue(true);
    }
    if (IsUserCreate?.User_save === false) {
      setalertSaveFalse(true);
    }
  }, [IsUserCreate]);

  return {
    genders,
    handleUserRegister,
    handleUserLogin,
    initialValRegister,
    initialValLogin,
    alertSaveTrue,
    alertSaveFalse,
    loadRegister,
    alertLogInTrue,
    alertLogInFalse,
    loadLogin,
    alertLogIn,
  };
};
