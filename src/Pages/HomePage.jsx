import { Alert, Container, Snackbar, Typography } from "@mui/material";
import CreatePost from "../Components/CreatePost";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Cookies from "js-cookie";
import Posts from "../Components/Post/Posts";

const HomePage = () => {
  const [postAlerts, setpostAlerts] = useState(false);
  const [user_id, username] = useContext(UserContext);
  const [alertHead, setAlertHead] = useState("info");
  const [alertBody, setAlertBody] = useState("");
  const [clear, setClear] = useState(false);
  const createPost = (text) => {
    setpostAlerts(!postAlerts);
    if (text.length) {
      setAlertBody("adding post");
      fetch("view/create-post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
        },
        body: JSON.stringify({ user_id: user_id, content: text }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "error") {
            setAlertHead("error");
            setAlertBody(data.helper);
          } else if (data.status === "success") {
            setAlertHead("success");
            setAlertBody(data.helper);
            setClear(true);
          } else {
            setAlertHead("warning");
            setAlertBody("Something went wrong");
          }
        });
    } else {
      setAlertHead("warning");
      setAlertBody("blank field cannot be added");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Typography sx={{ mt: 2 }} variant="h5" gutterBottom>
        Create Post
      </Typography>
      <CreatePost title={username} create={createPost} clear={clear} />
      <Typography sx={{ mt: 2 }} variant="h5" gutterBottom>
        All Posts
      </Typography>
      <Posts />
      <Snackbar
        open={postAlerts}
        autoHideDuration={1000}
        onClose={() => {
          setpostAlerts(!postAlerts);
          setAlertBody("");
          setAlertHead("info");
        }}
      >
        <Alert
          onClose={() => {
            setpostAlerts(!postAlerts);
            setAlertBody("");
            setAlertHead("info");
          }}
          severity={alertHead}
          sx={{ width: "100%" }}
        >
          {alertBody}
        </Alert>
      </Snackbar>
    </Container>
  );
};
export default HomePage;
