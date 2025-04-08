import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import ProductCard from "../../components/ProductCard";
import { Box } from "@mui/material";

const HomePage = () => {
  // SHOW LIST OF PRODUCTS

  const [productsData, setProductsData] = useState([]);

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

  return (
    <Box
      marginTop="100px"
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      gap="30px"
    >
      {productsData.map((product, index) => {
        return <ProductCard key={index} product={product} />;
      })}
    </Box>
  );
};

export default HomePage;
