import {
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { validateInput } from "../../utils";
import { auth, db } from "../../firebaseConfig";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    dob: new Date(),
    password: "",
  });

  const navigate = useNavigate();

  const [formDisabled, setFormDisabled] = useState(true);
  const [openNotification, setOpenNotification] = useState(false);

  const handleSignup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      );
      if (user) {
        const userObject = {
          name: signupData.name,
          email: signupData.email,
          dob: signupData.dob,
          admin: false
        };
        const collectionRef = collection(db, "users");
        await addDoc(collectionRef, userObject);

        setOpenNotification(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  // if all the fields are having a value, then return false other wise return true.
  useEffect(() => {
    const isDisabled = validateInput([
      signupData.name,
      signupData.email,
      signupData.password,
    ]);
    setFormDisabled(isDisabled);
  }, [signupData]);

  return (
    <Card className="auth-card">
      <CardContent>
        <Box display="flex" flexDirection="column" gap="12px">
          <Typography variant="h3">Signup Here!</Typography>

          <TextField
            id="FullName"
            label="Full Name"
            variant="outlined"
            value={signupData.name}
            onChange={(e) =>
              setSignupData({ ...signupData, name: e.target.value })
            }
          />
          <TextField
            id="Email"
            label="Email"
            type="email"
            variant="outlined"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />

          <TextField
            id="dob"
            type="date"
            variant="outlined"
            value={signupData.dob}
            onChange={(e) =>
              setSignupData({ ...signupData, dob: e.target.value })
            }
          />

          <TextField
            id="Password"
            label="Password"
            type="password"
            variant="outlined"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSignup}
            disabled={formDisabled}
          >
            <LoginIcon />
            Signup
          </Button>

          <Box textAlign="center">
            <Link to="/login">Already have an account ?</Link>
          </Box>
        </Box>
      </CardContent>

      <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        message="Signup Completed Successfully"
      />
    </Card>
  );
};

export default SignupPage;
