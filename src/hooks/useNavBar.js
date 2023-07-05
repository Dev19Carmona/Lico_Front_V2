import { LoginContext } from "@/context/login"
import { useColorMode, useDisclosure } from "@chakra-ui/react"
import { useState, useContext, useEffect } from "react"

export const useNavBar = () => {
  //Context
  const {localSession}=useContext(LoginContext)
  //States
  const [showUser, setShowUser] = useState(false)
  const [loginOrRegister, setLoginOrRegister] = useState(false)

  //ModalOptions
  const LoginOpenAndClose = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode();
  //Handles
  const handleClickToChangeLoginOrRegister = () => {
    setLoginOrRegister(!loginOrRegister)
  }
  //Effects
  useEffect(() => {
    if (localSession) {
      setShowUser(true)
    }
  
    
  }, [localSession])
  
  return {
    showUser,
    setShowUser,
    LoginOpenAndClose,
    loginOrRegister, 
    setLoginOrRegister,
    handleClickToChangeLoginOrRegister,
    localSession,
    colorMode
  }
}