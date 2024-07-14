import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const ClassLayout = () => {
  return (
    <Container maxWidth="lg">
      {/* Top Row: Lessons, Assignment, Material */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              backgroundColor: 'orange',
              padding: 2,
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">Lessons</Typography>
            {/* Content for Lessons */}
            <h1>lorem200</h1>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              padding: 2,
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">Assignment</Typography>
            {/* Content for Assignment */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              padding: 2,
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">Material</Typography>
            {/* Content for Material */}
          </Box>
        </Grid>
      </Grid>

      {/* Announcement Section */}
      <Box
        sx={{
          backgroundColor: '#e3f2fd',
          padding: 2,
          borderRadius: 1,
          textAlign: 'center',
          marginTop: 4,
        }}
      >
        <Typography variant="h6">Announcement</Typography>
        {/* Content for Announcement */}
      </Box>
    </Container>
  );
};

export default ClassLayout;
