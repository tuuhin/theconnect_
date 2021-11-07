import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Cookies from "js-cookie";
const CommentBox = (props) => {
  const postId = props.id;
  const [user_id, username] = useContext(UserContext);
  const [showcomments, setShowcomments] = useState(false);
  const [comments, setComments] = useState(props.comments);
  const [commentCount, setCommentCount] = useState(comments.length);
  const [comment, setComment] = useState("");
  const addComment = () => {
    if (comment.length) {
      fetch("view/add-comment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
        },
        body: JSON.stringify({
          userId: user_id,
          comment: comment,
          postId: postId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            comments.unshift({
              username: username,
              comment: comment,
            });
            setComments(comments);
            setComment("");
            setShowcomments(true);
            setCommentCount(commentCount + 1);
          }
        });
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Comments({commentCount})
        </Typography>
        <IconButton onClick={() => setShowcomments(!showcomments)}>
          {showcomments ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>

      <Collapse in={showcomments} sx={{ width: "100%" }}>
        <Box sx={{ maxHeight: 120, overflowY: "auto", mb: 2 }}>
          {comments.length !== 0 ? (
            <List dense={true}>
              {comments.map((e, i) => (
                <ListItem key={i}>
                  <ListItemText primary={e.username} secondary={e.comment} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color={"text.secondary"}>No Commnets</Typography>
          )}
        </Box>
      </Collapse>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          placeholder={"Add a comment"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button sx={{ ml: 3 }} onClick={addComment}>
          comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentBox;
