import { Bills, billsTotal } from "@/graphql/Bill";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { LIMIT } from "../../../config/Constants";

export const useBillList = () => {
  const [type, setType] = useState("Venta");
  const [pageBills, setPageBills] = useState(1);
  const {data:totalBills} = useQuery(billsTotal,{
    variables:{
      filters:[
        {
          key: "type",
          value: type
        }
      ]
    }
  })
  const {
    data: bills,
    loading: loadBills,
    error: errorBills,
  } = useQuery(Bills, {
    variables: {
      options:{
        page: pageBills,
        limit:LIMIT
      },
      filters: [
        {
          key: "type",
          value: type,
        }
      ]
    },
  });
  const handleSetType = (value) => {
    setType(value);
  };
  
  const pagesTotalBills = Math.ceil(totalBills?.billsTotal / LIMIT)

  return {
    handleSetType,
    bills,
    pagesTotalBills,
    setPageBills,
    pageBills,
    setType,
    type,
  };
};
