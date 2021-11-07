import { useContext } from "react";
import { NavContext } from "../Context/NavContext";
import { Redirect } from "react-router-dom";
import ProfilePage from "../Pages/ProfilePage";
import User from "../Context/UserContext";

const ProfileRoute = () => {
  const [isAuth] = useContext(NavContext);

  return isAuth ? (
    <User>
      <ProfilePage />
    </User>
  ) : (
    <Redirect to="sign-in" />
  );
};
export default ProfileRoute;
