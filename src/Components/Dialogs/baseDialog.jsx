import {
  Typography,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
const BaseDialog = (props) => {
  const [oldfield, setOldfield] = useState("");
  const [newfield, setNewfield] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        m: 5,
      }}
    >
      <Typography>{props.title}</Typography>
      
      <FormControl noValidate>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid item lg={12} xs={12} sm={12} md={12}>
            <TextField
              fullWidth
              label={props.oldlabel}
              type={props.type}
              value={oldfield}
              onChange={(e) => setOldfield(e.target.value)}
            />
          </Grid>
          <Grid item lg={12} xs={12} sm={12} md={12}>
            <TextField
              fullWidth
              label={props.newlabel}
              type={props.type}
              value={newfield}
              onChange={(e) => setNewfield(e.target.value)}
            />
          </Grid>
          {props.requirespassword ? (
            <Grid item lg={12} xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                label="Enter Password"
                type="password"
                value={password}
                helperText={"enter your password to update values"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
        <Button
          onClick={() => props.update(oldfield, newfield, password)}
          variant={"contained"}
        >
          update
        </Button>
        <FormHelperText>
          the changes would be applied after refreshing the page
        </FormHelperText>
      </FormControl>
    </Box>
  );
};
export default BaseDialog;
