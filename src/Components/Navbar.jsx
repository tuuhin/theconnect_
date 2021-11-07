import { Box, AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { NavContext } from "../Context/NavContext";
const Navbar = () => {
  const [isAuth, setisAuth] = useContext(NavContext);

  const logOut = () => {
    fetch("auth/logout").then((res) =>
      res.json().then((data) => console.log(data))
    );
    setisAuth(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              The Connect
            </Button>
          </Box>
          {isAuth ? (
            <Box>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={logOut}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" component={Link} to="/sign-up">
                SIGN UP
              </Button>
              <Button color="inherit" component={Link} to="/sign-in">
                SIGN IN
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
