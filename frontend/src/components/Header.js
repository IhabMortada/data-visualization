import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  Container,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import "../styles/styles.css"

// Import your company logo file here
import logo from "../images/Beiersdorf-logo-2021.png"

const Header = () => {
  // Define a custom styled component for the logo image
  const Logo = styled("img")({
    height: "50px",
    marginRight: "10px",
  })

  return (
    <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}>
      <Toolbar>
        <Logo className="Logo" src={logo} alt="Company Logo" />

        <Typography variant="h6 " color="inherit">
          Skin Study Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
