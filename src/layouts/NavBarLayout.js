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
import { BsSun, BsFillMoonFill } from "react-icons/bs";
import { AvatarEmotion } from "@/components/AvatarEmotion";
import { useNavBar } from "@/hooks/useNavBar";
import { ButtonGeneral } from "@/components/ButtonGeneral";
import { DrawerGeneral } from "@/components/DrawerGeneral";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import{ TbBrandAirtable } from "react-icons/tb"
import{ FaFileInvoiceDollar } from "react-icons/fa"
import{ GiExitDoor } from "react-icons/gi"
import{ MdLiquor } from "react-icons/md"
import { AnimatedLinkItem } from "@/components/AnimatedLinkItem";
export const NavBarLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const LinkItems = [
    { name: 'Inicio', icon: FiHome },
    { name: 'Mesas', icon: TbBrandAirtable },
    { name: 'Salidas', icon: GiExitDoor },
    { name: 'Facturas', icon: FaFileInvoiceDollar },
    { name: 'Productos', icon: MdLiquor },
  ];
  const {
    showUser,
    localSession,
    LoginOpenAndClose,
    loginOrRegister,
    handleClickToChangeLoginOrRegister
  } = useNavBar();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} >
      <Flex  h={16} alignItems={"center"} justifyContent={"space-around"}>
        <Box>Logo</Box>

        <Flex alignItems={"center"} gap={20}>
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
                <Avatar
                  size={"sm"}
                  src={localSession?.avatar}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <AvatarEmotion avatar={localSession?.avatar}/>
                </Center>
                <br />
                <Center>
                  <p>{localSession.fullName}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem onClick={()=>{
                  localStorage.removeItem("session")
                  setTimeout(() => {
                    location.reload();
                  }, 1000);
                  }}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <ButtonGeneral
              onClick={LoginOpenAndClose.onOpen}
              title={"Log In"}
              colorA={"blue.400"}
              colorB = {"blue.500"}
            />
          )}
        </Flex>
      </Flex>
      <DrawerGeneral
        isOpen={LoginOpenAndClose.isOpen}
        onClose={LoginOpenAndClose.onClose}
        body={!loginOrRegister ? <LoginForm /> : <RegisterForm/>}
        buttonExtra={<ButtonGeneral
          onClick={handleClickToChangeLoginOrRegister}
          title={!loginOrRegister?"Register":"Log In"}
          colorA={!loginOrRegister?"blue.400":"green.400"}
          colorB = {!loginOrRegister?"blue.500":"green.500"}
        />}
      />
      <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        
      </Flex>
      {LinkItems.map((link, i) => (
        <AnimatedLinkItem key={i} name={link.name} icon={link.icon} textAlign="rigth" mr={4}/>
      ))}
    </Box>
    </Box>
  );
};
