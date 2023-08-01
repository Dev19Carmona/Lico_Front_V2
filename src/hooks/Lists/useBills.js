import { Bills } from "@/graphql/Bill"
import { useQuery } from "@apollo/client"

export const useBills = () => {
  const useBillsPerVariables = (variables = {}) => {
    const {data:bills}=useQuery(Bills,variables)
    return bills
  }
  return {
    useBillsPerVariables
  }
}