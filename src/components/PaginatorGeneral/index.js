import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, HStack, IconButton } from "@chakra-ui/react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

export const PaginatorGeneral = ({ pagesTotal, setPage, page }) => {
  let pagesArray = [];

  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(startPage + 4, pagesTotal);

  for (let i = startPage; i <= endPage; i++) {
    pagesArray.push(i);
  }

  const handleMinus = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePlus = () => {
    if (page < pagesTotal) {
      setPage(page + 1);
    }
  };

  return (
    <Flex justifyContent="center">
      <HStack align="center" p={2}>
        <IconButton
          icon={<BiArrowToLeft />}
          aria-label="Ir al inicio"
          size="sm"
          onClick={() => setPage(1)}
          _hover={{ background: "red.500" }} // Ejemplo de efecto al pasar el cursor sobre el botón
          _focus={{ outline: "none" }} // Ejemplo de efecto al dar clic en el botón
        />
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Página anterior"
          size="sm"
          onClick={handleMinus}
          _hover={{ background: "red.500" }}
          _focus={{ outline: "none" }}
        />
        {pagesArray.map((pageNumber) => (
          <Button
            key={pageNumber}
            size="sm"
            variant={pageNumber === page ? "solid" : "outline"}
            onClick={() => setPage(pageNumber)}
            _hover={{ background: "blue.500" }}
            _focus={{ outline: "none" }}
          >
            {pageNumber}
          </Button>
        ))}
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Página siguiente"
          size="sm"
          onClick={handlePlus}
          _hover={{ background: "red.500" }}
          _focus={{ outline: "none" }}
        />
        <IconButton
          icon={<BiArrowToRight />}
          aria-label="Ir al final"
          size="sm"
          onClick={() => setPage(pagesTotal)}
          _hover={{ background: "red.500" }}
          _focus={{ outline: "none" }}
        />
      </HStack>
    </Flex>
  );
};
