import { useState, useEffect } from "react";

export const useFunctionsGeneral = () => {
  const [changeSell, setChangeSell] = useState(false)
  const [chekSwitch, setChekSwitch] = useState(false);
 
  const handleSwitchPriceProducts = () => {
    setChangeSell(!changeSell)
   };
  
  
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
  }

  return {
    chekSwitch,
    handleDateToday,
    redondeo,
    convertPriceWithPercent,
    handleSwitchPriceProducts,
    changeSell
  };
};
