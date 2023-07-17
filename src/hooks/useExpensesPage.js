import { Providers } from "@/graphql/Provider";
import { useQuery } from "@apollo/client";

export const useExpensesPage = () => {
  const { data:providers } = useQuery(Providers);
  
  return {
    providers
  };
};
