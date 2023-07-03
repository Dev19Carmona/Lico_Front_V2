import { Button, ButtonProps, Flex } from "@chakra-ui/react";
export const ButtonGeneral = ({ title, onClick = () => {}, colorA, colorB, type='button' }) => {
  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        <Button
          //{...props}
          /* flex={1} */
          type={type}
          rounded={'full'}
          onClick={onClick}
          px={4}
          fontSize={"sm"}
          bg={colorA}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: colorB,
          }}
          _focus={{
            bg: colorB,
          }}
        >
          {title}
        </Button>
      </Flex>
    </>
  );
};
