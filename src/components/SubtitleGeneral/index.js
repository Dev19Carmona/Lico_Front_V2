import { Text } from "@chakra-ui/react";

export const SubtitleGeneral = ({ data, size = "xl" }) => {
  return (
    <Text fontFamily={'mono'} fontSize={size} textAlign="center">
      {data}
    </Text>
  );
};
