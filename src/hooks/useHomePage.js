import { useBills } from "./Lists/useBills";

export const useHomePage = () => {
  const { useBillsPerVariables } = useBills();

  const weekNumbers = (array = []) => {
    const seenWeekNumbers = {};
    const weeklySum = {}; // Objeto para almacenar la suma de los totales por semana
    const weekNumbersArray = []; // Array para almacenar los números de semana
    const years = [];

    for (const item of array) {
      const weekNumber = item.dateInfo.weekNumber;
      const year = item.dateInfo.year;
      const total = item.total;

      if (!seenWeekNumbers[weekNumber]) {
        seenWeekNumbers[weekNumber] = true;
        weekNumbersArray.push(`${weekNumber}/${year}`);
        years.push(year);
        weeklySum[weekNumber] = total;
      } else {
        weeklySum[weekNumber] += total;
      }
    }

    // Convertimos los objetos a arrays para obtener el resultado deseado
    const weeklySumArray = Object.values(weeklySum);

    return { weekNumbers: weekNumbersArray, weeklySum: weeklySumArray, years };
  };
  const monthlySum = (array = []) => {
    const seenMonths = {};
    const monthlyTotal = {}; // Objeto para almacenar la suma de los totales por mes
    const monthYearArray = []; // Array para almacenar las combinaciones mes/año
    const years = [];

    for (const item of array) {
      const date = new Date(item.dateInfo.datetime);
      const month = date.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11 en JavaScript
      const year = date.getFullYear();
      const total = item.total;

      const monthYearCombination = `${item.dateInfo.monthName}/${year}`;

      if (!seenMonths[monthYearCombination]) {
        seenMonths[monthYearCombination] = true;
        monthYearArray.push(monthYearCombination);
        years.push(year);
        monthlyTotal[monthYearCombination] = total;
      } else {
        monthlyTotal[monthYearCombination] += total;
      }
    }

    // Convertimos los objetos a arrays para obtener el resultado deseado
    const monthlyTotalArray = Object.values(monthlyTotal);

    return {
      monthYearCombinations: monthYearArray,
      monthlyTotal: monthlyTotalArray,
      years,
    };
  };
  const dailySum = (array = []) => {
    const seenDays = {};
    const dailyTotal = {}; // Objeto para almacenar la suma de los totales por día
    const dayCombinationArray = []; // Array para almacenar las combinaciones día/mes/año
    const years = [];
  
    for (const item of array) {
      const date = new Date(item.dateInfo.datetime);
      const day = date.getDate();
      const month = date.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11 en JavaScript
      const year = date.getFullYear();
      const total = item.total;
  
      const dayCombination = `${day}/${month}/${year}`;
  
      if (!seenDays[dayCombination]) {
        seenDays[dayCombination] = true;
        dayCombinationArray.push(dayCombination);
        years.push(year);
        dailyTotal[dayCombination] = total;
      } else {
        dailyTotal[dayCombination] += total;
      }
    }
  
    // Convertimos los objetos a arrays para obtener el resultado deseado
    const dailyTotalArray = Object.values(dailyTotal);
  
    return { dayCombinations: dayCombinationArray, dailyTotal: dailyTotalArray, years };
  };
  

  const billsBuy = useBillsPerVariables({
    variables: {
      filters: [
        {
          key: "type",
          value: "Compra",
        },
      ],
    },
  });
  const billsSell = useBillsPerVariables({
    variables: {
      filters: [
        {
          key: "type",
          value: "Venta",
        },
      ],
    },
  });

  const buyWeekStatistics = weekNumbers(billsBuy?.Bills);
  const sellWeekStatistics = weekNumbers(billsSell?.Bills);

  const buyMonthlyStatistics = monthlySum(billsBuy?.Bills);
  const sellMonthlyStatistics = monthlySum(billsSell?.Bills);

  const buyDailyStatistics = dailySum(billsBuy?.Bills);
  const sellDailyStatistics = dailySum(billsSell?.Bills);

  
  
  return {
    sellWeekStatistics,
    buyWeekStatistics,
    buyMonthlyStatistics,
    sellMonthlyStatistics,
    buyDailyStatistics, 
    sellDailyStatistics,
  };
};
