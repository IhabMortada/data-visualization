import { SnackbarProvider } from 'notistack';
import { Collapse } from '@mui/material';
import "./App.css"
import HomePage from "./pages/HomePage"
import Header from "./components/Header"
function App() {
  return (
    <div className="App">
      <Header/>
        <SnackbarProvider
            maxSnack={1}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            TransitionComponent={Collapse}
        >

        <HomePage />
        </SnackbarProvider>
    </div>
  )
}

export default App
