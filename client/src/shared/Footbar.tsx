// Footer.jsx
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

const StyledBottomNavigation = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StyledIcon = styled.div`
  color: black;
  font-size: 36px;
`;

const Footer = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleProfileClick = () => {
    setSelectedValue("profile");
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  useEffect(() => {
    switch (selectedValue) {
      case "addBankAccount":
        document.location.href = "/";
        break;
      case "addCardDetails":
        document.location.href = "/add-card";
        break;
      case "logout":
        document.location.href = "/logout";
        break;
    }
  }, [selectedValue]);

  return (
    <>
      <StyledBottomNavigation>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<StyledIcon as={HomeIcon} />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<StyledIcon as={FavoriteIcon} />}
        />
        <BottomNavigationAction
          label="Add"
          value="add"
          icon={<StyledIcon as={AddIcon} />}
          onClick={()=>{document.location.href='/add-expense'}}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<StyledIcon as={PersonIcon} />}
          onClick={handleProfileClick}
        />
      </StyledBottomNavigation>

      <Drawer
        anchor="bottom"
        open={Boolean(selectedValue)}
        onClose={handleClose}
      >
        <List>
          <ListItem button onClick={() => setSelectedValue("addBankAccount")}>
            <ListItemText primary="Add Bank Account" />
          </ListItem>
          <ListItem button onClick={() => setSelectedValue("addCardDetails")}>
            <ListItemText primary="Add Card Details" />
          </ListItem>
          <ListItem button onClick={() => setSelectedValue("logout")}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Footer;
