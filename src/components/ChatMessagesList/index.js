import { Flex, Grid } from "@chakra-ui/react"

export const ChatMessagesList = ({chats, handleGoChat, handleNavOptions}) => {
  return (
    <>
    <Grid>
      Chats
    </Grid>
    <Grid>
      {
        chats?.getChats.map((chat,i)=>(
          <Flex onClick={()=>{
            handleGoChat(chat)
            handleNavOptions(chat._id)
          }} cursor={'pointer'} borderRadius={9} p={2} border={'0.2px solid'} key={i}>
            {chat.participants[1]}
          </Flex>
        ))
      }
    </Grid>
    </>
  )
}