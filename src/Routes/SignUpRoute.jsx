import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
  Collapse,
  Alert,
  FormControl,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, Redirect } from "react-router-dom";
import { useState, useContext } from "react";

import { NavContext } from "../Context/NavContext";

const SignUpRoute = () => {
  return <SignUp />;
};

const SignUp = () => {
  const [error, seterror] = useState(false);
  const [errorbody, seterrorbody] = useState(
    "madnatory field are found missing"
  );
  const [isAuth, setisAuth] = useContext(NavContext);
  const [severity, setseverity] = useState("warning");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const signUpReq = () => {
    if (!(firstName.length && lastName.length)) {
      seterror(true);
      seterrorbody("first name and the last name are required");
    } else if (!email.length) {
      seterror(true);
      seterrorbody("email field is absent");
    } else if (username.length < 2) {
      seterror(true);
      seterrorbody("username is required");
    } else if (password.length < 6) {
      seterror(true);
      seterrorbody("min 6 chars for password required");
    } else {
      seterror(false);

      fetch("auth/sign-up", {
        method: "POST",
        headers: { "Content-type": "application/json" },

        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email: email,
          username: username,
          password: password,
        }),
      })
        .then((res) => {
          if (res.status === 201) {
            setisAuth(true);
          }
          return res.json();
        })
        .then((data) => {
          if (data.error !== undefined) {
            setseverity("error");
            seterror(true);
            seterrorbody(data.error);
          } else if (data.success !== undefined) {
            alert("successfully signed in");
          }
        });
    }
  };
  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mb: 2, width: 56, height: 56, bgcolor: "red" }}></Avatar>
        <Typography variant="h5" component="h1">
          Sign Up
        </Typography>
        <Collapse in={error} sx={{ width: "100%", mt: 2, mb: 2 }}>
          <Alert
            severity={severity}
            onClose={() => {
              seterror(false);
              setTimeout(() => {
                setseverity("warning");
              }, 100);
            }}
          >
            {errorbody}
          </Alert>
        </Collapse>
        <FormControl noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => setfirstName(e.target.value)}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="UserName"
                name="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                id="password"
                helperText={"minimum 6 chars.."}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signUpReq}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                sx={{ textTransform: "none" }}
                variant="text"
                size="small"
                component={Link}
                to="/sign-in"
              >
                Already have an account? Sign in
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Container>
  );
};
export default SignUpRoute;
