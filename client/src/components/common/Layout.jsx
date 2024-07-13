import React from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../Navigation/Sidebar';

const drawerWidth = 250;

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `0 px` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;