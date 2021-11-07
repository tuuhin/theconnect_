import BaseDialog from "./baseDialog";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Cookies from "js-cookie";
const ChangePassword = () => {
  const [user_id] = useContext(UserContext);
  const updatepassword = (oldfield, newfield) => {
    fetch("update/password", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
      },
      body: JSON.stringify({
        userId: user_id,
        oldpassword: oldfield,
        newpassword: newfield,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert(data.helper);
        } else {
          alert(data.helper);
        }
      });
  };
  return (
    <BaseDialog
      title="change password"
      type="password"
      oldlabel="Old Password"
      newlabel="New Password"
      requirespassword={false}
      update={updatepassword}
    />
  );
};
export default ChangePassword;
