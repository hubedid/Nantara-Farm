import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },});
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/page";
import Login from './pages/login/page';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}
