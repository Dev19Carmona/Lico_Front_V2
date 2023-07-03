import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ButtonGeneral } from "../ButtonGeneral";
import { useState, useEffect } from "react";

export const MessagesWindow = ({
  chat,
  handleAddMessage,
  initialValAddMessage,
  notification,
  newMessage,
}) => {
  //console.log("messageswindow", notification?.messageAdded);
  
  

  return (
    <Box margin={4} border={"1px solid"} p={4} borderRadius={9}>
      {chat?.messages.map((message, i) => (
        <Grid m={1.5} gap={2} p={2} border="1px solid" borderRadius={9} key={i}>
          <Text>{message.sender}:</Text>
          <Text>{message.content}</Text>
        </Grid>
      ))}
      {notification && (
        newMessage.map((message,i)=>(
        <Grid m={1.5} key={i} gap={2} p={2} border="1px solid" borderRadius={9}>
          <Text>{message.sender}:</Text>
          <Text>{message.content}</Text>
        </Grid>

        ))
      )}
      <Formik onSubmit={handleAddMessage} initialValues={initialValAddMessage}>
        {() => (
          <Form>
            <Grid gap={5}>
              <FormControl id="content">
                <Field
                  name="content"
                  as={Textarea}
                  type="content"
                  placeholder="Message..."
                />
              </FormControl>

              <ButtonGeneral
                title={"Enter"}
                colorA={"green.400"}
                colorB={"green.500"}
                type={"submit"}
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
