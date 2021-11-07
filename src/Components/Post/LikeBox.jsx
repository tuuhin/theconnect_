import { ThumbUp, ThumbUpAltOutlined } from "@mui/icons-material";
import { Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Cookies from "js-cookie";

const LikeBox = (props) => {
  const postId = props.id;
  const likes = props.likes;
  const [user_id] = useContext(UserContext);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likestate, setlikestate] = useState(likes.includes(user_id));
  const likepost = () => {
    fetch("view/like-post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
      },
      body: JSON.stringify({
        userId: user_id,
        postId: postId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          if (data.helper === "add") {
            setLikeCount(likeCount + 1);
            setlikestate(true);
          } else if (data.helper === "remove") {
            setLikeCount(likeCount - 1);
            setlikestate(false);
          }
        }
      });
  };
  return (
    <Box
      sx={{
        ml: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Typography>{likeCount}</Typography>
      <IconButton onClick={likepost}>
        {likestate ? <ThumbUp /> : <ThumbUpAltOutlined />}
      </IconButton>
    </Box>
  );
};
export default LikeBox;
