import BaseDialog from "./baseDialog";
import Cookies from "js-cookie";

const ChangeUserName = () => {
  const updateusername = (oldfield, newfield, password) => {
    fetch("update/username", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
      },
      body: JSON.stringify({
        oldusername: oldfield,
        newusername: newfield,
        password: password,
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
      title="change username"
      type="text"
      oldlabel="Old Username"
      newlabel="New Username"
      requirespassword={true}
      update={updateusername}
    />
  );
};
export default ChangeUserName;
