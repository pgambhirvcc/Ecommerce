import { useContext, useMemo } from "react";
import CartContext from "../../context/CartContext";
import { Box } from "@mui/material";
import ProductCard from "../../components/ProductCard";

const CartPage = () => {
  const { cartData } = useContext(CartContext);

  const totalPrice = useMemo(() => {
    return cartData.reduce((acc, cV) => {
      return acc + cV.amount * cV.price;
    }, 0);
  }, [cartData]);

  if (cartData.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        No items added to Cart
      </Box>
    );
  }

  return (
    <Box
      marginTop="80px"
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      gap="20px"
    >
      {cartData.map((product) => {
        return <ProductCard readonly={true} product={product} />;
      })}

      <Box
        position="fixed"
        bottom="10px"
        backgroundColor="black"
        width="100vw"
        height="100px"
        color="white"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <span style={{ fontSize: 50 }}>Total Price: ${totalPrice}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
