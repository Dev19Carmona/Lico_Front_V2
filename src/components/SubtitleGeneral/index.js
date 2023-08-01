import { Text } from "@chakra-ui/react";

export const SubtitleGeneral = ({ data, size = "xl", color = "" }) => {
  return (
    <Text fontFamily={'mono'} fontSize={size} textAlign="center" color={color}>
      {data}
    </Text>
  );
};
