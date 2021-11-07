import { Delete } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CardActions,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import CommentBox from "./CommentBox";
import LikeBox from "./LikeBox";
const Post = (props) => {
  return (
    <Card>
      <CardHeader
        title={props.title}
        subheader={props.created_at}
        avatar={<Avatar />}
        action={
          props.delete ? (
            <IconButton onClick={() => props.deletePost(props.id)}>
              <Delete />
            </IconButton>
          ) : (
            <></>
          )
        }
      />
      <CardContent>{props.content}</CardContent>
      <CardActions>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Divider />
          <LikeBox {...props} />

          <CommentBox {...props} />
        </Box>
      </CardActions>
    </Card>
  );
};
export default Post;
