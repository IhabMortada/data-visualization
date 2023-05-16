import { SnackbarProvider } from "notistack";
import { Box, Collapse } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={Collapse}
      >
        <Box className="App">
          <Header />
          <HomePage />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
