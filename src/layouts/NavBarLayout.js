import { ReactNode } from "react";
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

export const NavBarLayout = () => {
  const { data: company } = useQuery(Companies);
  const { colorMode, toggleColorMode } = useColorMode();
  const LinkItems = [
    { name: "Inicio", icon: FiHome },
    { name: "Ventas", icon: BsCart4 },
    { name: "Salidas", icon: GiExitDoor },
    { name: "Facturas", icon: FaFileInvoiceDollar },
    { name: "Productos", icon: MdLiquor },
  ];
  const {
    showUser,
    localSession,
    LoginOpenAndClose,
    loginOrRegister,
    handleClickToChangeLoginOrRegister,
  } = useNavBar();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex h={16} alignItems={"center"} justifyContent={"right"} mr={2}>
        <Flex alignItems={"center"} gap={5}>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <BsFillMoonFill /> : <BsSun />}
          </Button>
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
        <Box
          bg={"white"}
          borderRight="1px"
          borderRightColor={"white"}
          w={{ base: "full", md: 60 }}
          pos="fixed"
          h="full"
        >
          <Flex
            h="20"
            alignItems="center"
            mx="8"
            justifyContent="space-between"
          >
            <Grid fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              {company?.Companies[0].name}
            </Grid>
          </Flex>
          {LinkItems.map((link, i) => (
            <AnimatedLinkItem
              key={i}
              name={link.name}
              icon={link.icon}
              textAlign="rigth"
              mr={4}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
