import { useState, useEffect } from "react";
import { DAYS, MONTHS } from "../../../config/Constants";

export const useFunctionsGeneral = () => {
  const [changeSell, setChangeSell] = useState(true);
  const [chekSwitch, setChekSwitch] = useState(false);
  const [radioPayment, setRadioPayment] = useState("Efectivo");

  const handleSwitchPriceProducts = () => {
    setChangeSell(!changeSell);
  };
  const handleSwitchPriceProductsTables = () => {
    setChangeSell(true);
  };

  useEffect(() => {
    if (localStorage.getItem("changeSell")) {
      const changeSellStorage = JSON.parse(localStorage.getItem("changeSell"));
      setChekSwitch(changeSellStorage);
    } else {
      undefined;
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
  const convertPriceWithPercent = (percent, price) => {
    const total = (price * percent) / 100 + price;
    return redondeo(total);
  };
  const handlePaymentMethod = (method) => {
    setRadioPayment(method);
  };

  const convertPrice = (percent, price) => {
    const number = (price * percent) / 100 + price;
    return redondeo(number);
  };
  function getWeekNumber(dateStr) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    const firstDayOfWeek = 0;
    const dayOfWeek = date.getDay();
    const daysDiff = dayOfWeek - firstDayOfWeek;
    if (daysDiff < 0) {
      date.setDate(date.getDate() + daysDiff);
    }
    const firstSundayOfYear = new Date(
      date.getFullYear(),
      0,
      1 + (firstDayOfWeek - new Date(date.getFullYear(), 0, 1).getDay())
    );
    const fullWeeksDiff = Math.floor(
      (date - firstSundayOfYear) / (7 * 24 * 60 * 60 * 1000)
    );
    const weekNumber = fullWeeksDiff + 1;

    return weekNumber;
  }
  const shelledDate = (datetime = new Date()) => {
    const day = datetime.getDate();
    const month = datetime.getMonth() + 1;
    const monthNumberByName = datetime.getMonth();
    const year = datetime.getFullYear();
    const hours = datetime.getHours();
    const minuts = datetime.getMinutes();
    const seconds = datetime.getSeconds();
    const dayNumber = datetime.getDay();
    const weekNumber = getWeekNumber(datetime);
    const monthName = MONTHS[monthNumberByName];
    const dayName = DAYS[dayNumber];
    return {
      datetime,
      day,
      month,
      year,
      hours,
      minuts,
      seconds,
      dayName,
      monthName,
      weekNumber,
    };
  };
  const stylizeDate = () => {
    const { day, year, dayName, monthName } = shelledDate();
    return `${dayName}, ${day} de ${monthName} del ${year}`;
  };

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
    convertPrice,
    shelledDate,
    stylizeDate,
    getWeekNumber,
  };
};
