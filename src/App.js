import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import Dashboard from './components/Dashboard';
import Banking from './components/Banking';
import Phone from './components/Phone';
import Statistics from './components/Statistics';
import Administration from './components/Administration';
import Help from './components/Help';

const initialTabsData = [
  { label: 'Dashboard', path: '/' },
  { label: 'Banking', path: '/banking' },
  { label: 'Statistics', path: '/statistics' },
  { label: 'Help', path: '/help' },
  { label: 'Phone', path: '/phone' },
  { label: 'Administration', path: '/administration'}
];

const App = () => {
  const [tabsData, setTabsData] = useState(initialTabsData);

  const dragStartHandler = (ev, index) => {
    ev.dataTransfer.setData("text/plain", index);
  };

  const dragOverHandler = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  const dropHandler = (ev, index) => {
    ev.preventDefault();
    const draggedIndex = ev.dataTransfer.getData("text/plain");
    
    if (draggedIndex !== index) {
      const updatedTabs = [...tabsData];
      const [draggedTab] = updatedTabs.splice(draggedIndex, 1);
      updatedTabs.splice(index, 0, draggedTab);
      setTabsData(updatedTabs);
    }
  };

  return (
    <Router>
      <Box sx={{ width: '100%', marginTop: 2 }}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {tabsData.map((tab, index) => (
            <Tab
              key={tab.label}
              label={tab.label}
              component={Link}
              to={tab.path}
              id={tab.label}
              draggable
              onDragStart={(ev) => dragStartHandler(ev, index)}
              onDragOver={dragOverHandler}
              onDrop={(ev) => dropHandler(ev, index)}
            />
          ))}
        </Tabs>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/help" element={<Help />} />
          <Route path="/phone" element={<Phone />} />
          <Route path="/administration" element={<Administration />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
