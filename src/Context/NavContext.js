import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
export const NavContext = createContext();

const LogStatus = (props) => {
  const [isAuth, setisAuth] = useState(true);
  useEffect(() => {
    const token = Cookies.get("csrf_access_token");
    if (token !== undefined) {
      setisAuth(true);
    } else {
      setisAuth(false);
    }
  }, []);

  return (
    <NavContext.Provider value={[isAuth, setisAuth]}>
      {props.children}
    </NavContext.Provider>
  );
};
export default LogStatus;
