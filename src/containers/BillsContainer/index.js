import { BillList } from "@/components/BillList";
import { BillTable } from "@/components/BillTable";
import { ButtonGeneral } from "@/components/ButtonGeneral";
import { CardSelectionGeneral } from "@/components/CardSelectionGeneral";
import { InputDateGeneral } from "@/components/InputDateGeneral";
import { ModalGeneral } from "@/components/ModalGeneral";
import { PaginatorGeneral } from "@/components/PaginatorGeneral";
import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";
import { useBillsPage } from "@/hooks/useBillsPage";
import { Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
import { GiReturnArrow } from "react-icons/gi";

export const BillsContainer = () => {
  const {
    options,
    handleShowBills,
    showBills,
    handleDefaultBills,
    handleSetType,
    bills,
    settingsModalShowBill,
    overlay,
    handleOpenModalShowBill,
    bill,
    pagesTotalBills,
    setPageBills,
    pageBills,
    handleDateChange,
    selectedDate,
  } = useBillsPage();
  console.log(bill?.seller?.fullName)
  return (
    <Grid  gap={3}>
      <Box
        borderRadius={10}
        boxShadow={"xl"}
        justifyContent={"space-around"}
        key={1}
        p={4}
        display="flex"
        gridTemplateColumns="1fr"
      >
        {!showBills.compras && !showBills.ventas ? (
          <Box></Box>
        ) : (
          <Box>
            <ButtonGeneral
              onClick={() => {
                handleDefaultBills();
              }}
              title={<GiReturnArrow />}
            />
          </Box>
        )}
        <Box letterSpacing={2} fontSize={30}>
          {!showBills.compras && !showBills.ventas
            ? "Facturas"
            : showBills.compras && !showBills.ventas
            ? "Compras"
            : !showBills.compras && showBills.ventas && "Ventas"}
        </Box>
        <Box></Box>
      </Box>
      
      {!showBills.compras && !showBills.ventas ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={10}>
          {options.map((opt, i) => (
            <Grid
              onClick={() => {
                handleSetType(opt.id);
                handleShowBills(opt.id === "Venta" ? true : false);
              }}
              key={i}
            >
              <CardSelectionGeneral icono={opt.icono} texto={opt.texto} />
            </Grid>
          ))}
        </SimpleGrid>
      ) : (
        <>
          <Flex justifyContent={"center"}>
            <Box >
              <InputDateGeneral
                 selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                keyName={"start"}
                placeholderText="Fecha inicial"
              />
            </Box>
            <Box>
              <InputDateGeneral
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                keyName={"end"}
                placeholderText="Fecha final"
              />
            </Box>
          </Flex>
          <PaginatorGeneral
            pagesTotal={pagesTotalBills}
            setPage={setPageBills}
            page={pageBills}
          />
        </>
      )}
      

      {showBills.compras && !showBills.ventas && (
        <Grid>
          <BillList onClick={handleOpenModalShowBill} data={bills?.Bills} />
        </Grid>
      )}
      {!showBills.compras && showBills.ventas && (
        <Grid>
          <BillList onClick={handleOpenModalShowBill} data={bills?.Bills} />
        </Grid>
      )}
    
      <ModalGeneral
        title={""}
        body={
          <BillTable
          user={bill?.seller?.fullName}
          billNumber={bill?.billNumber}
            date={`${bill?.dateInfo?.dayName}, ${bill?.dateInfo?.day} de ${bill?.dateInfo?.monthName} del ${bill?.dateInfo?.year}`}
            productList={bill?.products}
            total={bill?.total}
            onlyWrite={true}
            methods={{
              a: "Metodo de pago:",
              b: bill?.paymentMethod,
              c: "Semana #",
              d: bill?.dateInfo?.weekNumber,
            }}
            companyData={bill?.company}
          />
        }
        size="4xl"
        overlay={overlay}
        isOpen={settingsModalShowBill.isOpen}
        onClose={settingsModalShowBill.onClose}
      />
    </Grid>
  );
};
