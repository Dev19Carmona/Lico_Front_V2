import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
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

export const NavBarLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    showUser,
    localSession,
    LoginOpenAndClose,
    loginOrRegister,
    setLoginOrRegister,
    handleClickToChangeLoginOrRegister
  } = useNavBar();
  // console.log(localSession?.avatar);
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} >
      <Flex h={16} alignItems={"center"} justifyContent={"space-around"}>
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
          colorA={"blue.400"}
          colorB = {"blue.500"}
        />}
      />
    </Box>
  );
};
