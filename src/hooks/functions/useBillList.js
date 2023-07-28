import { Bills } from "@/graphql/Bill";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export const useBillList = () => {
  const [type, setType] = useState();
  const {
    data: bills,
    loading: loadBills,
    error: errorBills,
  } = useQuery(Bills, {
    variables: {
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

  return {
    handleSetType,
    bills,
  };
};
