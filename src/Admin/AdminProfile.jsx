import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Stack,
  Grid2,
} from "@mui/material";

function AdminProfile() {
  const adminData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123456789",
    profileImage: "https://via.placeholder.com/150", // Placeholder image
    bio: "Admin with extensive experience in managing teams and projects.",
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Grid2 container justifyContent="center">
        <Grid2 item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="column" alignItems="center" spacing={2}>
                <Avatar
                  alt="Profile"
                  src={adminData.profileImage}
                  sx={{ width: 150, height: 150 }}
                />
                <Typography variant="h5">{adminData.name}</Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {adminData.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {adminData.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Bio:</strong> {adminData.bio}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="primary">
                    Edit Profile
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Logout
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default AdminProfile;
