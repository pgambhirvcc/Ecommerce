import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import CartContext from "../context/CartContext";

const ProductCard = (props) => {
  const { cartData, setCartData } = useContext(CartContext);

  const handleAddToCart = () => {

    const checkIfProductPresent = cartData.find((cart) => cart.id === props.product.id);

    if (!checkIfProductPresent) {
        setCartData((prev) => [...prev, props.product]);
    } else {
        const updatedProducts = cartData.map((cart) => {
            if (cart.id === props.product.id) {
                cart.amount += 1;
            }

            return cart;
        })

        setCartData(updatedProducts);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.product.image}
        title={props.product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.product.description}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            Price - ${props.product.price}
          </Typography>

          <Chip label={props.product.category} />
        </Box>

        {
            props.readonly && <Typography>Amount : {props.product.amount}</Typography>
        }
      </CardContent>

      {!props.readonly ? (
        <CardActions>
          <Button size="small" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardActions>
      ) : null}
      
    </Card>
  );
};

export default ProductCard;
