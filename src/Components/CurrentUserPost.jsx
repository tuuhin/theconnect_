import {
  Grid,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import Post from "./Post/Post";
import Cookies from "js-cookie";
const CurrentUserPosts = () => {
  const [user_id] = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  const [postAlerts, setpostAlerts] = useState(false);
  const [alertHead, setAlertHead] = useState("info");
  const [alertBody, setAlertBody] = useState("Deleting the post..");
  useEffect(() => {
    console.log("calling usesers  posts");
    fetch(`view/user-posts/${user_id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPosts(data.helper);
        }
      });
  }, [user_id]);
  const deletePost = (postId) => {
    setpostAlerts(!postAlerts);

    fetch(`view/delete-post/${postId}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPosts(posts.filter((entry) => entry.id !== postId));
          setAlertHead("success");
          setAlertBody(data.helper);
        } else if (data.status === "error") {
          setAlertHead("error");
          setAlertBody(data.helper);
        } else {
          setAlertHead("warning");
          setAlertBody("something went wrong");
        }
      });
  };
  return (
    <>
      <Grid container spacing={2}>
        {posts !== null ? (
          posts.length !== 0 ? (
            posts.map((e) => (
              <Grid item key={e.id} sm={12} xs={12} md={6}>
                <Post
                  id={e.id}
                  delete={true}
                  deletePost={deletePost}
                  title={e.creator}
                  created_at={e.created_at}
                  content={e.content}
                  likes={e.like}
                  likeCount={e.likeCount}
                  comments={e.comment}
                />
              </Grid>
            ))
          ) : (
            <Typography
              color={"text.secondary"}
              sx={{ ml: "auto", mr: "auto", mt: 4 }}
            >
              No Posts
            </Typography>
          )
        ) : (
          <Box sx={{ ml: "auto", mr: "auto" }}>
            <CircularProgress size={50} />
            <Typography>Loading...</Typography>
          </Box>
        )}
      </Grid>
      <Snackbar
        open={postAlerts}
        autoHideDuration={1000}
        onClose={() => {
          setpostAlerts(!postAlerts);

          setAlertHead("info");
          setAlertBody("Deleting the post");
        }}
      >
        <Alert
          onClose={() => {
            setpostAlerts(!postAlerts);
            setAlertHead("info");
            setAlertBody("Deleting the post");
          }}
          severity={alertHead}
          sx={{ width: "100%" }}
        >
          {alertBody}
        </Alert>
      </Snackbar>
    </>
  );
};
export default CurrentUserPosts;
