import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import Dashboard from './components/Dashboard';
import Banking from './components/Banking';
import Phone from './components/Phone';
import Statistics from './components/Statistics';
import Help from './components/Help';

const App = () => {
  return (
    <Router>
      <Box sx={{ width: '100%', marginTop: 2 }}>
        <Tabs indicatorColor="primary" textColor="primary" centered>
          <Tab label="Dashboard" component={Link} to="/" />
          <Tab label="Banking" component={Link} to="/banking" />
          <Tab label="Statistics" component={Link} to="/statistics" />
          <Tab label="Help" component={Link} to="/help" />
          <Tab label="Phone" component={Link} to="/phone" />
        </Tabs>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/help" element={<Help />} />
          <Route path="/phone" element={<Phone />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
