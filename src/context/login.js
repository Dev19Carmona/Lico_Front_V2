import { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [localSession, setLocalSession] = useState();



  useEffect(() => {
    const localSessionToken = localStorage.getItem("session");
    const localSessionUser = jwt.decode(localSessionToken);
    // const localSessionUser = decodedToken?._doc;
    if (localSessionToken !== null) {
      setLocalSession(localSessionUser);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ localSession }}>
      {children}
    </LoginContext.Provider>
  );
};