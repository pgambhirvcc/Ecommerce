import { AppBar, Badge, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const UsersNavbar = (prop) => {
  const { cartData } = useContext(CartContext);

  const navigate = useNavigate();

  const signoutUser = async () => {
    await signOut(auth);
    localStorage.removeItem('current-user');

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <AppBar color="secondary">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center" gap="20px">
            <Typography>Welcome {prop.user.email}</Typography>
            <Button variant="contained" onClick={() => navigate("/users/home")}>
              Home
            </Button>
          </Box>

          <Typography>
            <Badge
              badgeContent={cartData.length}
              color="primary"
              onClick={() => navigate("/users/cart")}
            >
              <ShoppingCartIcon color="action" />
            </Badge>
          </Typography>
        </Box>

        <Button
          onClick={signoutUser}
          style={{ margin: "20px" }}
          color="error"
          variant="contained"
        >
          Signout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UsersNavbar;
