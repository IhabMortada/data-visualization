import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../images/Beiersdorf-logo-2021.png";
import colors from "../styles/colors";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const Logo = styled("img")({
    height: "50px",
    marginRight: "10px",
    paddingTop:"5px"
  });

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colors.white,
        display: "flex",
        justifyItems: "space-between",
      }}
    >
      <Toolbar>
        <IconButton
          color="primary"
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Logo src={logo} alt="Beiersdorf Logo" />
          <Typography sx={{ flexGrow: 1 }} color={colors.text}>
            Data Science Hub
          </Typography>
        </Box>
        <div>
          <IconButton
            size="large"
            color="primary"
            onClick={handleMenuOpen}
            aria-controls="profile-menu"
            aria-haspopup="true"
            aria-label="profile"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {["Profile", "Settings", "Logout"].map((title, index) => (
              <MenuItem onClick={handleMenuClose} key={index.toString()}>
                {title}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
