import { Genders } from "@/graphql/Gender";
import { User_login, User_save } from "@/graphql/User";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { CLIENT_ID } from "../../config/Constants";
import { Grid } from "@chakra-ui/react";
import { useNavBar } from "./useNavBar";


export const useRegisterLogin = () => {
  //Hooks
  const {
    setShowUser,
  } = useNavBar();
  //Mutations
  const [userSave, { data: IsUserCreate, loading:loadRegister }] = useMutation(User_save);
  //Queries
  const { data: genders } = useQuery(Genders);
  const [login,{ data: token }] = useLazyQuery(User_login);
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
          rolId: CLIENT_ID,
        },
      },
    });
    resetForm()

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
    resetForm()
    setTimeout(() => {
      location.reload();
    }, 1000);
  };
  //States
  
  //Effects
  useEffect(() => {
    if (token) {
      if (token?.User_login!==null) {
        localStorage.setItem("session",token?.User_login)
      }
    }
  
    
  }, [token])
  
  

  return {
    genders,
    handleUserRegister,
    handleUserLogin,
    initialValRegister,
    initialValLogin,
  };
};
