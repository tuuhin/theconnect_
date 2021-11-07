import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
  Collapse,
  Alert,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, Redirect } from "react-router-dom";
import { useState, useContext } from "react";
import { NavContext } from "../Context/NavContext";

const SignInRoute = () => {
  return <SignIn />;
};
const SignIn = () => {
  const [isAuth, setisAuth] = useContext(NavContext);
  const [error, seterror] = useState(false);
  const [errorbody, seterrorbody] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [severity, setseverity] = useState("warning");

  const LogInReq = () => {
    if (!username.length && !password.length) {
      seterror(true);
      seterrorbody("username and password required");
    } else if (!username.length) {
      seterror(true);
      seterrorbody("username field is missing");
    } else if (!password.length) {
      seterror(true);
      seterrorbody("password is missing");
    } else {
      fetch("auth/sign-in", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((res) => {
          if (res.status === 202) {
            setisAuth(true);
          }
          return res.json();
        })
        .then((data) => {
          if (data.error !== undefined) {
            seterror(true);
            setseverity("error");
            seterrorbody(data.error);
          }
          if (data.success !== undefined) {
            alert("successfully signed in");
          }
        });
    }
  };
  return isAuth ? (
    <Redirect to="/" />
  ) : (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mb: 2, width: 56, height: 56, bgcolor: "red" }}></Avatar>
        <Typography variant="h5" component="h1">
          Sign In
        </Typography>
        <Collapse in={error} sx={{ width: "100%" }}>
          <Alert
            severity={severity}
            onClose={() => {
              seterror(false);
            }}
          >
            {errorbody}
          </Alert>
        </Collapse>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                onClick={LogInReq}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
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
                to="/sign-up"
              >
                Dont have a account? Sign up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SignInRoute;
