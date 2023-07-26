import { useState, useEffect } from "react";

export const useFunctionsGeneral = () => {
  const [changeSell, setChangeSell] = useState(true)
  const [chekSwitch, setChekSwitch] = useState(false);
  const [radioPayment, setRadioPayment] = useState("Efectivo");
 
  const handleSwitchPriceProducts = () => {
    setChangeSell(!changeSell)
   };
  const handleSwitchPriceProductsTables = () =>{
    setChangeSell(true)

  }
  
  useEffect(() => {
    if (localStorage.getItem("changeSell")) {
      const changeSellStorage = JSON.parse(localStorage.getItem("changeSell"));
      setChekSwitch(changeSellStorage);
    }else{
      undefined
    }
  }, [changeSell]);

  const handleDateToday = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
      day = "0" + dia;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return day + "/" + month + "/" + year;
  };

  const redondeo = (number) => {
    let decimal = number % 1;
    let entero = Math.floor(number);
    let multiplo = Math.floor(entero / 100) * 100;
    if (decimal < 0.5) {
      return parseFloat(multiplo.toFixed(2));
    } else {
      return parseFloat((multiplo + 100).toFixed(2));
    }
  };
  const convertPriceWithPercent = (percent,price) => {
    const total = (price * percent)/100 + price
    return redondeo(total)
  };
  const handlePaymentMethod = (method) => {
    setRadioPayment(method)
  }
  const handleUnixToDDMMYYYY = (unixTimestamp) => {
    try {
      // Convertir el timestamp Unix a milisegundos
      const milliseconds = unixTimestamp * 1000;
  
      // Crear un objeto de fecha a partir de los milisegundos
      const dateObj = new Date(milliseconds);
  
      // Obtener los componentes de la fecha (día, mes y año)
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1; // Los meses en JavaScript son base 0, por lo que se suma 1
      const year = dateObj.getFullYear();
  
      // Formatear la fecha como DD/MM/YYYY
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      return formattedDate;
    } catch (error) {
      console.error(`Error al formatear la fecha: ${error}`);
      return null;
    }
  }

  return {
    chekSwitch,
    handleDateToday,
    redondeo,
    convertPriceWithPercent,
    handleSwitchPriceProducts,
    changeSell,
    radioPayment,
    handlePaymentMethod,
    handleSwitchPriceProductsTables,
    handleUnixToDDMMYYYY,
  };
};
