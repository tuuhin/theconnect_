import { Container, Typography } from "@mui/material";
import CurrentUserPosts from "../Components/CurrentUserPost";
import EditProfile from "../Components/EditProfile";
const ProfilePage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Typography sx={{ mt: 6 }} variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <EditProfile />
      <Typography sx={{ mt: 6 }} variant="h5" gutterBottom>
        User's Posts
      </Typography>
      <CurrentUserPosts />
    </Container>
  );
};
export default ProfilePage;
