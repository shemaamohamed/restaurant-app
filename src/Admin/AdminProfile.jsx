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
import { logout } from "../features/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import profile from '../assets/profile.png'

function AdminProfile() {
  const navigate= useNavigate();
  const name=localStorage.getItem('name');
  const email=localStorage.getItem('email');
  const adminData = {
    name: name,
    email: email,
    bio: "Experienced admin skilled in managing restaurant operations",
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('')

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
                  src={profile}
                  sx={{ width: 150, height: 150 }}
                />
                <Typography variant="h5">{adminData.name}</Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {adminData.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Bio:</strong> {adminData.bio}
                </Typography>
                <Stack direction="row" spacing={2}>
                  
                  <Button onClick={()=>{
                  handleLogout()}} variant="outlined" color="error">
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
