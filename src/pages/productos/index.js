import { ProductsContainer } from '@/containers/ProductsContainer'
import { Box } from '@chakra-ui/react'
import React from 'react'

function Productos() {
  return (
    <Box ml={250} minH={'100vh'}>
        <ProductsContainer/>

    </Box>
  )
}

export default Productos