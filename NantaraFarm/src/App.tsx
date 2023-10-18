import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },});
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
// import DaftarUser from "./pages/daftar_user/daftar_user";
import Dashboard from "./pages/dashboard/page";
// import './App.css'

// const router = createBrowserRouter([{ path: "*", Component: Root}, ], { basename: "/sipreman" });

// const ProtectedRoute = () => {
//   const token = localStorage.getItem("access_token");

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <UserProvider>
//       <Outlet />
//     </UserProvider>
//   );
// };

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<ProtectedRoute/>}> */}

            <Route path="/dashboard" element={<Dashboard/>} />
            
          {/* </Route> */}
          {/* <Route path="/" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

// function Root() {
//   return (
//     <Routes>
//       {/* <Route element={<ProtectedRoute/>}> */}

//         <Route path="/dashboard" element={<Dashboard/>} />
        
//       {/* </Route> */}
//       {/* <Route path="/" element={<Login />} /> */}
//     </Routes>
//   );
// }
