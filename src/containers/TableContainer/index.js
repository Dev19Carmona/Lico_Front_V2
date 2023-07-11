import { TabsGeneral } from "@/components/TabsGeneral";
import { useTablePage } from "@/hooks/useTablePage";
import { Grid } from "@chakra-ui/react";

export const TableContainer = ({ tableId }) => {
  const { indexTabsTable, components, bills } =
    useTablePage(tableId);

  return (
    <Grid gap={5} m={5}>
      
      <TabsGeneral
        index={indexTabsTable}
        components={components}
      />
      <Grid>{bills?.Bills[0]?._id}</Grid>
    </Grid>
  );
};
