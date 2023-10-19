"use client";

// import Logo from "../../../assets/Logo_Farm.png";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

const DrawerContainer = ({
  children,
  height,
}: {
  children: React.ReactNode;
  height?: string;
}) => {

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

  return (
    <>
      <Box
        style={{ display: "flex", height: height ?? "auto", width: "100vw" }}
      >
        <Drawer
          style={{ width: 260 }}
          variant="permanent"
          anchor="left"
          PaperProps={{ elevation: 0 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 236,
              height: "100%",
              backgroundColor: "#F5F5F5",
              paddingRight: 12,
              paddingLeft: 12,
              paddingTop: 24,
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <img src={"/assets/Logo_Farm.png"} alt="" width={55} height={55} />
              <Typography fontWeight={"bold"} fontSize={32} color={"#FF7F48"}>
                Inspirer
              </Typography>
            </Box>
            <Toolbar />
            <List>
              {navList.map((nav) => {
                const active = nav.url === path;
                return (
                  <ListItem
                    key={nav.title}
                    disablePadding
                    sx={{
                      mt: "12px",
                      width: "90%",
                      borderRadius: "10px",
                      marginX: "auto",
                    }}
                  >
                    {/* F9FAFC */}
                    <ListItemButton
                      href={nav.url}
                      sx={{
                        boxShadow: `${active ? 2 : 0}`,
                        backgroundColor: `${active ? "#FFFFFF" : "#F5F5F5"}`,
                        width: "90%",
                        borderRadius: "10px",
                        marginX: "auto",
                        paddingX: 4,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, marginRight: 2 }}>
                        {nav.title === "Dashboard" && (
                          <DashboardOutlinedIcon
                            fontSize="large"
                            sx={{ color: ` ${active ? "#FF7F48" : "#777879"}` }}
                          />
                        )}
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
          </div>
        </Drawer>
        {children}
      </Box>
    </>
  );
};

export default DrawerContainer;
