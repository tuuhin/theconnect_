import Post from "./Post";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
const Posts = () => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    console.log("calling all posts");
    fetch("view/all-posts", {
      method: "GET",
      headers: {
        "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setPosts(data.helper);
        }
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {posts !== null ? (
        posts.length !== 0 ? (
          posts.map((e) => (
            <Grid item key={e.id} sm={12} xs={12} md={6}>
              <Post
                id={e.id}
                title={e.creator}
                created_at={e.created_at}
                content={e.content}
                likes={e.like}
                likeCount={e.likeCount}
                comments={e.comment}
                delete={false}
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
        <Box sx={{ m: "auto" }}>
          <CircularProgress size={50} />
          <Typography>Loading...</Typography>
        </Box>
      )}
    </Grid>
  );
};
export default Posts;
