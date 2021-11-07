import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();
const User = (props) => {
  const [user_id, setUser_id] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    fetch("auth/current-user")
      .then((res) => res.json())
      .then((d) => {
        setUser_id(d.user_id);
        setUsername(d.username);
      });
  }, []);
  return (
    <UserContext.Provider value={[user_id, username]}>
      {props.children}
    </UserContext.Provider>
  );
};
export default User;
