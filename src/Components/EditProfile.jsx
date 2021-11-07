import { List, ListItem, Button, Card, Dialog } from "@mui/material";
import { useState } from "react";
import ChangePassword from "./Dialogs/changePassword";
import ChangeUserName from "./Dialogs/changeusername";
const EditProfile = () => {
  const [passwordDialog, setpasswordDialog] = useState(false);
  const [usernameDialog, setUsernameDialog] = useState(false);

  return (
    <Card>
      <List dense={true}>
        <ListItem>
          <Button variant="text" onClick={() => setUsernameDialog(true)}>
            change username
          </Button>
          <Dialog
            open={usernameDialog}
            onClose={() => setUsernameDialog(false)}
          >
            <ChangeUserName />
          </Dialog>
        </ListItem>
        <ListItem>
          <Button variant="text" onClick={() => setpasswordDialog(true)}>
            change password
          </Button>
          <Dialog
            open={passwordDialog}
            onClose={() => setpasswordDialog(false)}
          >
            <ChangePassword />
          </Dialog>
        </ListItem>
      </List>
    </Card>
  );
};
export default EditProfile;
