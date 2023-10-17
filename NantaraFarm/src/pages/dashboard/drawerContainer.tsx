'use client';

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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import imgLogo from 'public/images/img_logo_radiologi.webp';
// import HomeIcon from '@mui/icons-material/Home';
// import EventRepeatIcon from '@mui/icons-material/EventRepeat';
// import PersonIcon from '@mui/icons-material/Person';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { usePathname, useRouter } from 'next/navigation';
// import LogoutModal from '../Modal/LogoutModal';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// import BiotechIcon from '@mui/icons-material/Biotech';
// import CoPresentIcon from '@mui/icons-material/CoPresent';
// import { useSelector } from 'react-redux';
// import { RootState } from '@src/types/redux';
// import { toast } from 'react-toastify';

const DrawerContainer = ({ children, height }: { children: React.ReactNode; height?: string }) => {
//   const { token } = useSelector((state: RootState) => state.auth);

//   const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   const router = useRouter();

  const navList = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Settings',
      url: '/settings',
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

  return (
    isAuthenticated && (
      <div style={{ display: 'flex', height: height ?? 'auto' }}>
        <Drawer style={{ width: 248 }} variant='permanent' anchor='left' PaperProps={{ elevation: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 248, height: '100%' }}>
            <Toolbar />
            <a href='/dashboard'>
              <div style={{ position: 'relative', marginLeft: 30, width: 180, height: 60, cursor: 'pointer' }}>
                <Image alt='logo-radiologi' src={imgLogo} fill={true} style={{ objectFit: 'contain' }} />
              </div>
            </a>
            <Box
              sx={{
                p: 2,
                py: 0.5,
                mt: 2,
                ml: 2,
                mr: 'auto',
                borderRadius: 6,
                bgcolor: alpha('#4A58F6', 0.25),
              }}>
              <Typography color={'#4A58F6'} fontWeight={'bold'}>
                PPDS
              </Typography>
            </Box>
            <List>
              {navList.map((nav, index) => {
                const active = nav.url === pathname;
                return (
                  <ListItem
                    key={nav.title}
                    disablePadding
                    sx={{
                      mt: '12px',
                      borderLeft: '2px solid',
                      borderColor: `${active ? '#3608C0' : 'white'}`,
                    }}>
                    <ListItemButton href={nav.url}>
                      <ListItemIcon sx={{ minWidth: 0, marginRight: 2 }}>
                        {nav.title === 'Dashboard' && <HomeIcon sx={{ color: ` ${active ? '#3608C0' : '#777676'}` }} />}
                        {nav.title === 'Scientific Activities' && (
                          <BiotechIcon sx={{ color: ` ${active ? '#3608C0' : '#777676'}` }} />
                        )}
                        {nav.title === 'Scientific Presentation' && (
                          <CoPresentIcon sx={{ color: ` ${active ? '#3608C0' : '#777676'}` }} />
                        )}
                        {nav.title === 'Journal Activities' && (
                          <LibraryBooksIcon sx={{ color: ` ${active ? '#3608C0' : '#777676'}` }} />
                        )}
                        {nav.title === 'Monthly Activities' && (
                          <EventRepeatIcon sx={{ color: ` ${active ? '#3608C0' : '#777676'}` }} />
                        )}
                        {nav.title === 'Profile' && <PersonIcon sx={{ color: ` ${active ? '#3608C0' : '#777676'}` }} />}
                      </ListItemIcon>
                      <Typography
                        sx={{ color: ` ${active ? '#3608C0' : '#777676'}`, fontWeight: active ? 'bold' : 'normal' }}>
                        {nav.title ?? ''}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <div style={{ marginTop: 'auto' }}>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton onClick={() => setShowLogoutModal(true)}>
                  <ListItemIcon sx={{ minWidth: 0, marginRight: 2 }}>
                    <LogoutIcon sx={{ color: 'red' }} />
                  </ListItemIcon>
                  <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{'Logout'}</Typography>
                </ListItemButton>
              </ListItem>
              <Divider />
              <Typography variant='subtitle2' sx={{ p: 2, mb: 2, color: '#777676' }}>
                Radiologi, Fakultas Kedokteran Universitas Indonesia
              </Typography>
            </div>
          </div>
        </Drawer>
        {children}
        <LogoutModal visible={showLogoutModal} handleClose={() => setShowLogoutModal(false)} />
      </div>
    )
  );
};

export default DrawerContainer;
