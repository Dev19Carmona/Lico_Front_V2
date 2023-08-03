import { ButtonGeneral } from '@/components/ButtonGeneral';
import { LoginForm } from '@/components/LoginForm';
import { SubtitleGeneral } from '@/components/SubtitleGeneral';
import { TableContainer } from '@/containers/TableContainer'
import { LoginContext } from '@/context/login';
import { Tables } from '@/graphql/Table';
import { useFunctionsGeneral } from '@/hooks/functions/useFunctionsGeneral';
import { useQuery } from '@apollo/client';
import { Box, Flex, Grid, Heading, Img } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import React, {useContext, useEffect} from 'react'
import { GiReturnArrow } from 'react-icons/gi';

function Mesa() {
  const localSession = useContext(LoginContext);
  const router = useRouter()

  const{handleSwitchPriceProductsTables} = useFunctionsGeneral()

  const{data:tables}=useQuery(Tables,{
    variables:{
      filters:{
        _id:router.query.id
      }
    }
  })

  useEffect(() => {
    localStorage.setItem("changeSell",true)
  }, []);
  return (
    <>
      {localSession?.localSession ? (
        <Box ml={"65px"} minH={"100vh"}>
          <Flex justifyContent={"space-around"}>
            <Grid>
              <ButtonGeneral
                onClick={() => {
                  handleSwitchPriceProductsTables();
                  router.push("/ventas");
                }}
                title={<GiReturnArrow fontSize={25} />}
              />
            </Grid>
            <SubtitleGeneral size='4xl' data={tables?.Tables[0].name}/>
            {/* <Heading>{tables?.Tables[0].name}</Heading> */}
            <Grid></Grid>
          </Flex>
          <TableContainer tableId={router.query.id} />
        </Box>
      ) : (
        <Box ml={50} minH={"100vh"}>
          <Box borderBottom={"1px"} borderColor="black">
            <Img
              src={"https://i.ytimg.com/vi/m7ZZNsa0pOA/maxresdefault.jpg"}
              roundedTop={"sm"}
              h="full"
              w="full"
              alt={"Not Found"}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default Mesa