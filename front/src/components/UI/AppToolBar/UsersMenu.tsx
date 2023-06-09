import React, { useState } from "react";
import { Avatar, Badge, Box, Grid, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarIcon from "@mui/icons-material/Star";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useRouter } from "next/router";
import { logout } from "@/features/users/usersThunks";
import EditModalForm from "@/components/Forms/AuthForms/EditModalForm";
import { selectUser } from "@/features/users/usersSlice";
import { apiURL } from "@/configs/constants";
import { unsetLocation } from "@/features/locations/locationsSlice";

const UsersMenu = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await router.push('/');
  };

  const openAdminMenu = async () => {
    await router.push('/admin');
    dispatch(unsetLocation());
  };

  const handleEditProfile = () => {
    setIsModalOpen(true);
    // window.history.pushState(null, "", "/profile/edit");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // window.history.pushState(null, "", "/");
  };

  return (
    <Grid item>
      <Box sx={{ display: 'flex' }} onClick={handleClick} color="inherit">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          sx={{mr: 2}}
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar src={apiURL + user?.avatar}/>
      </Box>
      <Menu
        anchorEl={anchorEl}
        keepMounted open={Boolean(anchorEl)}
        onClick={handleClose}
        sx={{mt: 2}}
      >
        <Box sx={{borderBottom: "1px solid #333333", pb: 1}}>
          <MenuItem onClick={() => router.push('/my-locations')}>
            <ListItemIcon>
              <LocationOnIcon/>
            </ListItemIcon>
            My locations
          </MenuItem>
          <MenuItem onClick={() => router.push('/my-favorites')}>
            <ListItemIcon>
              <BookmarkIcon/>
            </ListItemIcon>
            My favorites
          </MenuItem>
          <MenuItem onClick={() => router.push('/my_documents')}>
            <ListItemIcon>
              <StarIcon/>
            </ListItemIcon>
            My feedbacks
          </MenuItem>
        </Box>
        {user && user.role === "admin" ? (
            <Box sx={{borderBottom: "1px solid #333333", pb: 1, mt: 1}}>
              <MenuItem onClick={openAdminMenu}>
                <ListItemIcon>
                  <AdminPanelSettingsIcon/>
                </ListItemIcon>
                Admin Menu
              </MenuItem>
            </Box>
        ) : null}
        <Box sx={{mt: 1}}>
          <MenuItem onClick={handleEditProfile}>
            <ListItemIcon>
              <ManageAccountsIcon/>
            </ListItemIcon>
            Edit profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon/>
            </ListItemIcon>
            Logout
          </MenuItem>
        </Box>
      </Menu>

      <EditModalForm isOpen={isModalOpen} onClose={closeModal}/>

    </Grid>
  );
};

export default UsersMenu;