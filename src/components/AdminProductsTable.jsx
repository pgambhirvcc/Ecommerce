import { DataGrid } from "@mui/x-data-grid";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminProductsTable = () => {
  const [productsData, setProductsData] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setOpenNotificationMessage] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const getProductsData = async () => {
    const collectionRef = collection(db, "products");
    const dataFromFirebase = await getDocs(collectionRef);

    const extractedData = dataFromFirebase.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    setProductsData(extractedData);
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setOpenNotification(true);
      setOpenNotificationMessage("Product Deleted Succesfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      setOpenNotification(true);
      setOpenNotificationMessage("Product Deletion Failed");
    }
  };

  const handleDeleteProductInBatch = async () => {
    for (const productId of selectedProducts) {
      await handleDeleteProduct(productId);
    }
  };

  const handleUpdateProduct = async (product) => {
    try {
      const collectionRef = doc(db, "products", product.id);
      await updateDoc(collectionRef, product);
      setOpenNotification(true);
      setOpenNotificationMessage("Product Updated Successfully");
      // HACK
      setTimeout(() => {
        window.location.reload();
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      resizable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            justifyContent="flex-start"
            alignContent="center"
            height="100%"
          >
            <img
              style={{ borderRadius: "50%" }}
              width={50}
              src={params.value}
            />
          </Box>
        );
      },
    },
    { field: "id", headerName: "ID", resizable: false, flex: 1 },
    {
      field: "title",
      headerName: "Title",
      resizable: false,
      flex: 1,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      resizable: false,
      flex: 1,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      resizable: false,
      flex: 1,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      resizable: false,
      flex: 1,
      editable: true,
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            justifyContent="flex-start"
            alignContent="center"
            height="100%"
          >
            <Typography variant="span">$ {params.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <Box display="flex" gap="8px">
            <IconButton
              color="error"
              onClick={() => handleDeleteProduct(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" marginBottom="8px">
        <Button
          disabled={selectedProducts.length === 0}
          variant="contained"
          color="error"
          width="100%"
          onClick={handleDeleteProductInBatch}
        >
          Delete Selected
        </Button>
      </Box>
      <DataGrid
        editMode="row"
        rows={productsData}
        columns={columns}
        onRowSelectionModelChange={(data) => {
          setSelectedProducts(data);
        }}
        processRowUpdate={handleUpdateProduct}
      />

      <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        message={notificationMessage}
      />
    </div>
  );
};

export default AdminProductsTable;
