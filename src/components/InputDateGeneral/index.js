import React, { useState } from 'react';
import { ChakraProvider, Box, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const InputDateGeneral = ({
  handleDateChange = () => {},
  selectedDate = {},
  placeholderText = "Selecciona una fecha",
  keyName ,
}) => {
  
  return (
    <ChakraProvider cursor={'pointer'}>
      <Box  p={4}>
        <DatePicker
          minDate={selectedDate?.start}
          maxDate={new Date()}
          selected={selectedDate?.[keyName]}
          onChange={(date) => handleDateChange({[keyName]:date})}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholderText}
          customInput={<Input />}
        />
      </Box>
    </ChakraProvider>
  );
};
