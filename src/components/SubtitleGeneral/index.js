import { Text } from "@chakra-ui/react";

export const SubtitleGeneral = ({ data }) => {
  return (
    <Text fontFamily={'mono'} fontSize={"xl"} letterSpacing={1} textAlign="center">
      {data}
    </Text>
  );
};