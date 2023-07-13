import { useState, useEffect } from "react";

export const useTableSwitch = (alertSwitch) => {
  const [chekSwitch, setChekSwitch] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("tableSwitch")) {
      const tableSwitchs = JSON.parse(localStorage.getItem("tableSwitch"))
      setChekSwitch(tableSwitchs)
    }
  }, [alertSwitch])
  return {
    chekSwitch
  }
}