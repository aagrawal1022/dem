import React from "react";
import styled from "@emotion/styled";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
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
  color: yellow,
  font-size: 36px;
`;

const Footer = () => {
  return (
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
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<StyledIcon as={PersonIcon} />}
      />
    </StyledBottomNavigation>
  );
};

export default Footer;
