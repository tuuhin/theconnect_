import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";

import { useState } from "react";
const CreatePost = (props) => {
  const [textfield, setTextfield] = useState("");
  return (
    <Card>
      <CardHeader
        title={props.title}
        avatar={<Avatar>{props.avatar}</Avatar>}
      />
      <CardContent>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            multiline
            fullWidth
            value={textfield}
            onChange={(e) => setTextfield(e.target.value)}
          />
          <Button
            sx={{ mt: 2 }}
            fullWidth
            variant="contained"
            onClick={() => {
              props.create(textfield);

              if (props.clear) {
                setTextfield("");
              }
            }}
          >
            POST
          </Button>
          <FormHelperText>refresh the page to see the new post</FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
};
export default CreatePost;
