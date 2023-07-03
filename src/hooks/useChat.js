import { LoginContext } from "@/context/login"
import { addMessage, createChat, getChats, messageAdded } from "@/graphql/Chat"
import { Users } from "@/graphql/User"
import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client"
import { useState, useContext, useEffect } from "react"
import { ADMIN_ID } from "../../config/Constants"

export const useChat = () => {
  //Context
  const {localSession}=useContext(LoginContext)
  //States
  const [showChat, setShowChat] = useState(false)
  const [navOptions, setNavOptions] = useState("friends")
  const [chat, setChat] = useState({})
  const [newMessage, setnewMessage] = useState([]);
  //Mutations
  const [startChat,{data:isChatCreate}]=useMutation(createChat,{
    refetchQueries:[
      {
        query:getChats,
          variables:{
            filters:{
              participant:localSession?.fullName
            }
          }
      }
    ]
  })
  const [Add_message,{data:isAddMessage}]=useMutation(addMessage,{
    refetchQueries:[
      {
        query:getChats,
          variables:{
            filters:{
              participant:localSession?.fullName
            }
          }
      }
    ]
  })
  //Queries
  const{data:users}=useQuery(Users,{
    variables:{
      filters:{
        rolId:ADMIN_ID
      }
    }
  })
  const{data:chats}=useQuery(getChats,{
    variables:{
      filters:{
        participant:localSession?.fullName
      }
    }
  })
  //Suscriptions
  const{data:notification}=useSubscription(messageAdded,{
    variables:{
      chatId:chat?._id
    }
  })
  //Handles
  const handleShowChat = () => {
    setShowChat(!showChat)
  }
  const handleNavOptions = (option) =>{
    setNavOptions(option)
  }
  const handleCreateChat = (participant) => {
    const participants = [
      localSession?.fullName,
      participant
    ]
    startChat({
      variables:{
        participants
      }
    })
  }
  const handleGoChat = (chat) => {
    setChat(chat)
  }
  const handleAddMessage = (values, {resetForm}) => {
    Add_message({
      variables:{
        chatId: chat?._id,
        sender: localSession?.fullName,
        content:values.content
      }
    })
    resetForm();
  }
  //Initial Values
  const initialValAddMessage = {
    content : ""
  };
  //console.log("-.-",notification);
 //Effects
 useEffect(() => {
  if (notification?.messageAdded) {
    setnewMessage([
      ...newMessage,
      {
        sender: notification?.messageAdded.sender,
        content: notification?.messageAdded.content,
      },
    ]);
  }
}, [notification?.messageAdded]);
  useEffect(() => {
    if (navOptions) {
      setnewMessage([])
    }
  
    
  }, [navOptions])
  
  return {
    handleShowChat,
    showChat,
    localSession,
    users,
    navOptions,
    handleNavOptions,
    handleCreateChat,
    chats,
    chat,
    handleGoChat,
    handleAddMessage,
    initialValAddMessage,
    notification,
    newMessage,
  }
}