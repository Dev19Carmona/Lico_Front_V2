import { useState } from "react";

export const useLoader = () => {
  const [alertLogIn, setAlertLogIn] = useState(false);
  return {
    setAlertLogIn,
    alertLogIn,
  };
};
