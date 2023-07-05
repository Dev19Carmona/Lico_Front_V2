import { Grid, Flex, Box, IconComponent } from '@chakra-ui/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'; // Importa el hook useRouter

export const AnimatedLinkItem = ({ name, icon: IconComponent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter(); // Obtiene la instancia del router de Next.js

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleClick = () => {
    router.push(`/${name.toLowerCase()}`); // Navega a la ruta correspondiente al hacer clic
  };

  return (
    <Grid
      cursor="pointer"
      m={12}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={handleClick} // Agrega el evento onClick para manejar la navegación
      
    >
      <Flex
        as={motion.div}
        whileHover={{ scale: 1.2, borderColor: '#000' }}
        transition={{ duration: 0.2 }}
        justifyContent="space-between"
        alignItems="center"
        borderLeft="1px"
        borderTop="1px"
        borderRight="2px"
        borderBottom="2px"
        borderColor={isHovered ? 'blue.400' : 'black'}
        borderRadius="md"
        p={2}
        bg={isHovered ? 'blue.400' : 'white'}
      >
        <Box>
          <IconComponent size={24} color={isHovered ? 'white' : 'black'} />
        </Box>
        <Box letterSpacing={2} color={isHovered ? 'white' : 'black'}>{name}</Box>
      </Flex>
    </Grid>
  );
};
