import { useContext } from "react";
import { NavContext } from "../Context/NavContext";
import { Redirect } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import User from "../Context/UserContext";
const HomeRoute = () => {
  const [isAuth] = useContext(NavContext);
  return isAuth ? (
    <User>
      <HomePage />
    </User>
  ) : (
    <Redirect to="sign-in" />
  );
};

export default HomeRoute;
