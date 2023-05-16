import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import logo from "../images/Beiersdorf-logo-2021.png"
import colors from "../styles/colors"

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const Logo = styled("img")({
    height: "50px",
    marginRight: "10px",
  })

  return (
    <Container>
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <Toolbar>
        <IconButton
          color={colors.Primary}
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Logo src={logo} alt="Beirsdorf Logo" />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color={colors.primary}
        >
          Data Science Hub
          <Typography sx={{ flexGrow: 1 }} color={colors.text}>
            Skin Study Dashboard
          </Typography>
        </Typography>
        <div>
          <IconButton
            size="large"
            color={colors.primary}
            onClick={handleMenuOpen}
            aria-controls="profile-menu"
            aria-haspopup="true"
            aria-label="profile"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            color={colors.primary}
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
    </Container>
  )
}

export default Header
