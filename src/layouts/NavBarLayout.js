import { motion } from "framer-motion";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Grid,
  useColorModeValue,
  NavItem,
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
import { FaFileInvoiceDollar } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { MdLiquor } from "react-icons/md";
import { AnimatedLinkItem } from "@/components/AnimatedLinkItem";
import { useQuery } from "@apollo/client";
import { Companies } from "@/graphql/Company";
import { ADMIN_NAME, SELLER_NAME } from "../../config/Constants";
import { AiOutlineBell } from "react-icons/ai";
import { useState } from "react";
import { BiSolidBellRing } from "react-icons/bi";

export const NavBarLayout = () => {
  const { data: company } = useQuery(Companies);
  const { colorMode, toggleColorMode } = useColorMode();
  const LinkItems = [
    { name: "Inicio", icon: FiHome, typeUser: [ADMIN_NAME, SELLER_NAME] },
    { name: "Ventas", icon: BsCart4, typeUser: [ADMIN_NAME, SELLER_NAME] },
    { name: "Salidas", icon: GiExitDoor, typeUser: [ADMIN_NAME] },
    { name: "Facturas", icon: FaFileInvoiceDollar, typeUser: [ADMIN_NAME] },
    { name: "Productos", icon: MdLiquor, typeUser: [ADMIN_NAME] },
  ];
  const {
    showUser,
    localSession,
    LoginOpenAndClose,
    loginOrRegister,
    handleClickToChangeLoginOrRegister,
  } = useNavBar();

  const showLinks = (roles) =>
    roles.some((rol) => rol === localSession?.rol.name);
  const [angle, setAngle] = useState(0);
  const handleHover = () => {
    setAngle(45);
  };

  const handleMouseLeave = () => {
    setAngle(0);
  };
  return (
    <Box>
      <Flex
        ml={10}
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        mr={5}
      >
        <Box letterSpacing={2} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {company?.Companies[0].name}
        </Box>
        <Flex alignItems={"center"} gap={15}>
          <motion.div animate={{ rotate: angle }}>
            <Box
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
              cursor={"pointer"}
            >
              {localSession?.rol.name === ADMIN_NAME &&
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
                    setTimeout(() => {
                      location.reload();
                    }, 1000);
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <ButtonGeneral
              onClick={LoginOpenAndClose.onOpen}
              title={"Log In"}
              colorA={"blue.400"}
              colorB={"blue.500"}
            />
          )}
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
          bg={"white"}
          shadow={"2xl"}
          borderRightRadius={9}
          h="50%"
          borderRight="1px"
          borderRightColor={"white"}
          //w={{ base: "full", md: 60 }}
          pos="fixed"
          flexDirection="column"
          justifyContent="center"
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
