import { motion } from "framer-motion";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { BsSun, BsFillMoonFill, BsCart4 } from "react-icons/bs";
import { AvatarEmotion } from "@/components/AvatarEmotion";
import { useNavBar } from "@/hooks/useNavBar";
import { ButtonGeneral } from "@/components/ButtonGeneral";
import { DrawerGeneral } from "@/components/DrawerGeneral";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { FiHome } from "react-icons/fi";
import { FaFileInvoiceDollar, FaBox } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { AnimatedLinkItem } from "@/components/AnimatedLinkItem";
import { useQuery } from "@apollo/client";
import { Companies } from "@/graphql/Company";
import { ADMIN, SELLER } from "../../config/Constants";
import { AiOutlineBell } from "react-icons/ai";
import { useState } from "react";
import { BiSolidBellRing } from "react-icons/bi";
import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";
import { useRouter } from "next/router";
import { useLoader } from "@/hooks/functions/userLoader";
import { RocketLoader } from "@/components/RocketLoader";

export const NavBarLayout = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const LinkItems = [
    { name: "Inicio", icon: FiHome, typeUser: [ADMIN.name, SELLER.name] },
    { name: "Ventas", icon: BsCart4, typeUser: [ADMIN.name, SELLER.name] },
    { name: "Salidas", icon: GiExitDoor, typeUser: [ADMIN.name] },
    { name: "Facturas", icon: FaFileInvoiceDollar, typeUser: [ADMIN.name] },
    { name: "Productos", icon: FaBox, typeUser: [ADMIN.name] },
  ];
  const {
    showUser,
    localSession,
    LoginOpenAndClose,
    loginOrRegister,
    handleClickToChangeLoginOrRegister,
  } = useNavBar();
  const { stylizeDate } = useFunctionsGeneral();
  const showLinks = (roles) =>
    roles.some((rol) => rol === localSession?.rol.name);
  const [angle, setAngle] = useState(0);
  const handleHover = () => {
    setAngle(45);
  };

  const handleMouseLeave = () => {
    setAngle(0);
  };

  const { setAlertLogIn, alertLogIn } = useLoader();

  return (
    <Box>
      {
        alertLogIn&&
        <RocketLoader title="Cerrando Sesion..."/>
      }
      <Flex
        ml={10}
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        mr={5}
      >
        <Box
          letterSpacing={2}
          fontSize="sm"
          fontWeight="thin"
        >
          {stylizeDate()}
        </Box>
        <Flex alignItems={"center"} gap={15}>
          <motion.div animate={{ rotate: angle }}>
            <Box
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
              cursor={"pointer"}
            >
              {localSession?.rol.name === ADMIN.name &&
                (angle === 0 ? (
                  <AiOutlineBell fontSize={25} />
                ) : (
                  <BiSolidBellRing fontSize={25} />
                ))}
            </Box>
          </motion.div>
          <Box cursor={"pointer"} onClick={toggleColorMode}>
            {colorMode === "light" ? <BsFillMoonFill /> : <BsSun />}
          </Box>
          {showUser ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={localSession?.avatar} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <AvatarEmotion avatar={localSession?.avatar} />
                </Center>
                <br />
                <Center>
                  <p>{localSession.fullName}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("session");
                    setAlertLogIn(true)
                    setTimeout(async() => {
                    setAlertLogIn(false)
                      await router.push("/");
                      router.reload();
                    }, 4000);
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : // <ButtonGeneral
          //   onClick={LoginOpenAndClose.onOpen}
          //   title={"Log In"}
          //   colorA={"blue.400"}
          //   colorB={"blue.500"}
          // />
          undefined}
        </Flex>
      </Flex>
      <DrawerGeneral
        isOpen={LoginOpenAndClose.isOpen}
        onClose={LoginOpenAndClose.onClose}
        body={!loginOrRegister ? <LoginForm /> : <RegisterForm />}
        buttonExtra={
          <ButtonGeneral
            onClick={handleClickToChangeLoginOrRegister}
            title={!loginOrRegister ? "Register" : "Log In"}
            colorA={!loginOrRegister ? "blue.400" : "green.400"}
            colorB={!loginOrRegister ? "blue.500" : "green.500"}
          />
        }
      />
      {localSession && (
        <Flex
          gap={15}
          shadow={"2xl"}
          borderRightRadius={9}
          h="full"
          borderRight="1px"
          borderRightColor={"white"}
          //w={{ base: "full", md: 60 }}
          pos="fixed"
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
          alignContent="center"
          //h="full"
        >
          {LinkItems.map(
            (link, i) =>
              showLinks(link.typeUser) && (
                <AnimatedLinkItem
                  key={i}
                  name={link.name}
                  icon={link.icon}
                  textAlign="rigth"
                  mr={4}
                />
              )
          )}
        </Flex>
      )}
    </Box>
  );
};
