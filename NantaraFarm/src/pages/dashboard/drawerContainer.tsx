"use client";

import Logo from "../../assets/Logo_Farm.png"

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import imgLogo from 'public/images/img_logo_radiologi.webp';
// import HomeIcon from '@mui/icons-material/Home';
// import EventRepeatIcon from '@mui/icons-material/EventRepeat';
// import PersonIcon from '@mui/icons-material/Person';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { usePathname, useRouter } from 'next/navigation';
// import LogoutModal from '../Modal/LogoutModal';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import BiotechIcon from '@mui/icons-material/Biotech';
// import CoPresentIcon from '@mui/icons-material/CoPresent';
// import { useSelector } from 'react-redux';
// import { RootState } from '@src/types/redux';
// import { toast } from 'react-toastify';

const DrawerContainer = ({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: string;
}) => {
  //   const { token } = useSelector((state: RootState) => state.auth);

  //   const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  //   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  //   const router = useRouter();

  const navList = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Settings",
      url: "/settings",
    },
  ];

  const location = useLocation();
  const path = location.pathname;

  //   useEffect(() => {
  //     if (token) {
  //       setIsAuthenticated(true);
  //     } else {
  //       if (pathname !== '/') {
  //         toast.warning('Please relogin', { toastId: 'user-not-found' });
  //       }
  //       router.push('/login');
  //     }
  //   }, []);

  // nav.title === 'Dashboard' && active ? <img src='./assets/active-dashboard.svg'> : <img src='./assets/dashboard.svg'></img>
  return (
    <>
      <Box style={{ display: "flex", height: height ?? "auto"}}>
        <Drawer
          style={{ width: 348 }}
          variant="permanent"
          anchor="left"
          PaperProps={{ elevation: 0 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 300,
              height: "100%",
              backgroundColor: "#F5F5F5",
              paddingRight: 24,
              paddingLeft: 24,
              paddingTop: 16,
            }}
          >
            <Box marginTop={2} display={'flex'} justifyContent={'space-between'} alignItems={"center"}>
                <img src={Logo} alt="" width={55} height={55}/>
                <Typography fontWeight={'bold'} fontSize={32} color={'#FF7F48'}>
                    NantaraFarm
                </Typography>
            </Box>
            <Toolbar />
            <List>
              {navList.map((nav, index) => {
                const active = nav.url === path;
                return (
                  <ListItem
                    key={nav.title}
                    disablePadding
                    
                    sx={{
                      mt: "12px",
                      width: "80%",
                    borderRadius: "10px", 
                    marginX: "auto"
                    }}
                  >
                    {/* F9FAFC */}
                    <ListItemButton href={nav.url} sx={{
                        boxShadow: `${active ? 2 : 0}`,
                        backgroundColor: `${active ? "#FFFFFF" : "#F5F5F5"}`,
                        width: "80%",
                        borderRadius: "10px", 
                        marginX: "auto",
                        paddingX: 4,
                    }}>
                      <ListItemIcon sx={{ minWidth: 0, marginRight: 2 }}>
                        {nav.title === "Dashboard" && 
                          (<DashboardOutlinedIcon
                            fontSize="large"
                            sx={{ color: ` ${active ? "#FF7F48" : "#777879"}` }}
                          />)
                        }
                        {nav.title === "Settings" && (
                          <SettingsOutlinedIcon
                            fontSize="large"
                            sx={{ color: ` ${active ? "#FF7F48" : "#777879"}` }}
                          />
                        )}
                      </ListItemIcon>
                      <Typography
                        sx={{
                          color: ` ${active ? "#FF7F48" : "#000000"}`,
                          fontWeight: active ? "bold" : "normal",
                        }}
                        fontSize={20}
                      >
                        {nav.title ?? ""}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            {/* <div style={{ marginTop: "auto" }}>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton onClick={() => setShowLogoutModal(true)}>
                  <ListItemIcon sx={{ minWidth: 0, marginRight: 2 }}>
                    <LogoutIcon sx={{ color: "red" }} />
                  </ListItemIcon>
                  <Typography sx={{ color: "red", fontWeight: "bold" }}>
                    {"Logout"}
                  </Typography>
                </ListItemButton>
              </ListItem>
              <Divider />
              <Typography
                variant="subtitle2"
                sx={{ p: 2, mb: 2, color: "#777676" }}
              >
                Radiologi, Fakultas Kedokteran Universitas Indonesia
              </Typography>
            </div> */}
          </div>
        </Drawer>
        {children}
        {/* <LogoutModal
          visible={showLogoutModal}
          handleClose={() => setShowLogoutModal(false)}
        /> */}
      </Box>
    </>
  );
};

export default DrawerContainer;
