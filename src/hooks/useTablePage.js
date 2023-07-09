import { CardHorizontal } from "@/components/CardHorizontal";
import { InputSearchGeneral } from "@/components/InputSearchGeneral";
import { Bill_save, Bills } from "@/graphql/Bill";
import { Products } from "@/graphql/Product";
import { Tables } from "@/graphql/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const useTablePage = (tableId) => {
  //States
  const [productSearch, setProductSearch] = useState("");
  //Queries
  const [getBills, { data: bills, loading: loadBills }] = useLazyQuery(Bills);
  const { data: products } = useQuery(Products);
  //Mutations
  const [billSave, { data: isBillSave, loading: loadSaveBill }] = useMutation(
    Bill_save,
    {
      refetchQueries: [
        {
          query: Bills,
          variables: {
            filters: {
              tableId,
            },
          },
        },
        {
          query: Tables,
        },
      ],
    }
  );
  //Constants
  const productsFormFieldProps = {
    data: products?.Products,
    name: "name",
    labelField: "name",
    valueField: "_id",
  };

  //Effects
  useEffect(() => {
    if (tableId) {
      getBills({
        variables: {
          filters: {
            tableId,
          },
        },
      });
    }
  }, [getBills, tableId]);

  //Initial Values
  const initialValuesProductSelect = {
    name: "",
  };

  //Handles
  //Handles Mutations
  const handleBillSave = () => {
    billSave({
      variables: {
        billData: {
          tableId,
        },
      },
    });
  };

  const handleAddProductSelect = (values) => {
   // console.log("okkkk", values);
  };

  //Handles states

  const handleProductSelectPlus = (productId) => {
   
    const _id = bills?.Bills[0]?._id
    billSave({
      variables: {
        billData: {
          _id,
          productId,
          amount:1
        },
      },
    });
  };

  //TabsSettings

  const index = [
    {
      name: "Productos",
    },
    {
      name: "Factura",
    },
  ];
  const components = [
    <Grid gap={5}>
      {
        bills?.Bills.length > 0 &&
      <>
      <InputSearchGeneral
        onSubmit={handleAddProductSelect}
        initialValues={initialValuesProductSelect}
        onInputChange={handleProductSelectPlus}
        formFieldProps={productsFormFieldProps}
      />
      </>
      }
      {
        bills?.Bills[0]?.products.map((product,i)=>(
          <CardHorizontal data={{head:product.name,image: product.image, body: product.amount}} key={i}/>
        ))

      }

    </Grid>,
    <Grid gap={5}></Grid>,
  ];

  return {
    index,
    components,
    handleBillSave,
    bills,
  };
};
