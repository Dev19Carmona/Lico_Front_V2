import { useChat } from "@/hooks/useChat";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  Text,
  UnorderedList,
  Flex,
  Avatar,
  Grid,
} from "@chakra-ui/react";

export const ChatFriendList = ({handleCreateChat}) => {
  const { users } = useChat();
  return (
    <>
    <Grid>
      Admins
    </Grid>
    <UnorderedList listStyleType={"none"}>
      {users?.Users.map((user, i) => (
        <ListItem cursor={'pointer'} key={i}>
          <Flex onClick = {() => {
            handleCreateChat(user.fullName)
          }} p={1} border={'0.1px solid'} gap={2} m={2} borderRadius={9}>
          <Avatar
                  size={"sm"}
                  src={user.avatar}
                />
            <Text>{user.fullName}</Text>
          </Flex>
        </ListItem>
      ))}
    </UnorderedList>
    </>
  );
};
