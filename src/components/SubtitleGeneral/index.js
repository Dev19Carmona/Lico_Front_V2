import { Text } from "@chakra-ui/react";

export const SubtitleGeneral = ({ data }) => {
  return (
    <Text fontFamily={'mono'} fontSize={"xl"} textAlign="center">
      {data}
    </Text>
  );
};
