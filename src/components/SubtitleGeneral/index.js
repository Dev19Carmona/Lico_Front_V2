import { Text } from "@chakra-ui/react";

export const SubtitleGeneral = ({ data, size = "xl", color = "" }) => {
  return (
    <Text fontSize={size} textAlign="center" color={color}>
      {data}
    </Text>
  );
};
