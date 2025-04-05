import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const INPUT_DEFAULT = {
  title: "",
  description: "",
  image: "",
  category: "",
  price: 0,
};

import CloseIcon from "@mui/icons-material/Close";
import { categories } from "../constant";
import { db } from "../firebaseConfig";
import { validateInput } from "../utils";

const CreateProduct = (props) => {
  const [productInfo, setProductInfo] = useState(INPUT_DEFAULT);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [formDisabled, setFormDisabled] = useState(true);

  useEffect(() => {
    const isDisabled = validateInput([
      productInfo.title,
      productInfo.description,
      productInfo.image,
      productInfo.category,
      productInfo.price
    ]);
    setFormDisabled(isDisabled);
  }, [productInfo]);

  const handleOnCreate = async () => {
    try {
      const collectionRef = collection(db, "products");

      await addDoc(collectionRef, productInfo);
      setProductInfo(INPUT_DEFAULT);
      setOpenNotification(true);
      setNotificationMessage("Product Created Successfully");

      setTimeout(() => {
        props.setIsDialogOpen(false);

        // Hack
        window.location.reload();
      }, 2000);
    } catch (error) {
      alert("Product Creating Flaied... Check Console :(");
      console.log(error);
    }
  };

  return (
    <Dialog open={props.isDialogOpen}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>Create a Product</DialogTitle>

        <IconButton
          onClick={() => props.setIsDialogOpen(false)}
          style={{ marginRight: "10px" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <DialogContentText>
          You can create a product which will be visible to other users
        </DialogContentText>

        <Box display="flex" flexDirection="column" gap="20px">
          <TextField
            placeholder="Enter product title"
            value={productInfo.title}
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                title: e.target.value,
              })
            }
          />

          <TextField
            multiline
            placeholder="Enter product description"
            value={productInfo.description}
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                description: e.target.value,
              })
            }
          />

          <TextField
            placeholder="Enter product image url"
            value={productInfo.image}
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                image: e.target.value,
              })
            }
          />

          <TextField
            placeholder="Enter Price"
            value={productInfo.price}
            type="number"
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                price: e.target.value,
              })
            }
          />

          <Select
            value={productInfo.category}
            label="Select Category"
            labelId="Select Category"
            onChange={(e) =>
              setProductInfo({
                ...productInfo,
                category: e.target.value,
              })
            }
          >
            {categories.map((category, index) => {
              return (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>

          <Button
            disabled={formDisabled}
            variant="contained"
            onClick={handleOnCreate}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>

      <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        message={notificationMessage}
      />
    </Dialog>
  );
};

export default CreateProduct;
