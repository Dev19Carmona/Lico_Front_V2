import { GraphicsGeneral } from "@/components/GraphicsGeneral";
import { SubtitleGeneral } from "@/components/SubtitleGeneral";
import { useHomePage } from "@/hooks/useHomePage";
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

export const HomeContainer = () => {
  const {
    sellWeekStatistics,
    buyWeekStatistics,
    buyMonthlyStatistics,
    sellMonthlyStatistics,
    buyDailyStatistics, 
    sellDailyStatistics,
  } = useHomePage();
  return (
      <Grid gap={5} borderRadius={9} bg={"gray.100"} p={5}>
        <Flex gap={{base:"5px",md:"50px", lg:"120px"}} justifyContent={"center"}>
          <SubtitleGeneral size="3xl" data={"Estadisticas"} />
        </Flex>
        <SimpleGrid gap={5} columns={{base:1,md:2,lg:3}}>

        <Box p={1} border={"1px solid black"} borderRadius={5}>
        <SubtitleGeneral size="xl" data={"Mes a mes"} />
          <GraphicsGeneral
            labels={{ a: "Ventas Mensuales", b: "Compras Mensuales" }}
            dataVertical={sellMonthlyStatistics.monthlyTotal}
            dataHorizontal={sellMonthlyStatistics.monthYearCombinations}
            dataHorizontalB={buyMonthlyStatistics.monthlyTotal}
          />
        </Box>
        <Box p={1} border={"1px solid black"} borderRadius={5}>
        <SubtitleGeneral size="xl" data={"Semanal"} />
          <GraphicsGeneral
            labels={{ a: "Ventas Semanales", b: "Compras Semanales" }}
            dataVertical={sellWeekStatistics.weeklySum}
            dataHorizontal={sellWeekStatistics.weekNumbers}
            dataHorizontalB={buyWeekStatistics.weeklySum}
          />
        </Box>
        <Box p={1} border={"1px solid black"} borderRadius={5}>
        <SubtitleGeneral size="xl" data={"Diario"} />
          <GraphicsGeneral
            labels={{ a: "Ventas Diarias", b: "Compras del dia" }}
            dataVertical={sellDailyStatistics.dailyTotal}
            dataHorizontal={sellDailyStatistics.dayCombinations}
            dataHorizontalB={buyDailyStatistics.dailyTotal}
          />
        </Box>
        </SimpleGrid>
        
      </Grid>
  );
};
