import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import PinIcon from "@mui/icons-material/PushPin";
import UnpinIcon from "@mui/icons-material/PushPinOutlined";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import HelpIcon from "@mui/icons-material/Help";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";

import Dashboard from "./components/Dashboard";
import Banking from "./components/Banking";
import Phone from "./components/Phone";
import Statistics from "./components/Statistics";
import Administration from "./components/Administration";
import Help from "./components/Help";

const initialTabsData = [
  { label: "Dashboard", path: "/", pinned: false },
  { label: "Banking", path: "/banking", pinned: false },
  { label: "Statistics", path: "/statistics", pinned: false },
  { label: "Help", path: "/help", pinned: false },
  { label: "Phone", path: "/phone", pinned: false },
  { label: "Administration", path: "/administration", pinned: false },
];

const getIconForTab = (label) => {
  switch (label) {
    case "Dashboard":
      return <DashboardIcon />;
    case "Banking":
      return <AccountBalanceIcon />;
    case "Statistics":
      return <DashboardIcon />;
    case "Help":
      return <HelpIcon />;
    case "Phone":
      return <ContactPhoneIcon />;
    case "Administration":
      return <AdminPanelSettingsIcon />;
    default:
      return null;
  }
};

const App = () => {
  const [tabsData, setTabsData] = useState(initialTabsData);

  useEffect(() => {
    const storedTabs = localStorage.getItem("tabsOrder");
    if (storedTabs) {
      const parsedTabs = JSON.parse(storedTabs);
      setTabsData(parsedTabs);
    }
  }, []);

  const updateLocalStorage = (newTabs) => {
    localStorage.setItem("tabsOrder", JSON.stringify(newTabs));
  };

  const dragStartHandler = (ev, index) => {
    if (tabsData[index].pinned) {
      ev.preventDefault();
      return;
    }
    ev.dataTransfer.setData("text/plain", index);
  };

  const dragOverHandler = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  const dropHandler = (ev, index) => {
    ev.preventDefault();
    const draggedIndex = ev.dataTransfer.getData("text/plain");

    if (tabsData[index].pinned) {
      alert("You cannot replace a pinned tab!");
      return;
    }

    if (draggedIndex !== index) {
      const updatedTabs = [...tabsData];
      const [draggedTab] = updatedTabs.splice(draggedIndex, 1);
      updatedTabs.splice(index, 0, draggedTab);

      setTabsData(updatedTabs);
      updateLocalStorage(updatedTabs);
    }
  };

  const togglePinTab = (index) => {
    const updatedTabs = [...tabsData];
    updatedTabs[index].pinned = !updatedTabs[index].pinned;
    setTabsData(updatedTabs);
    updateLocalStorage(updatedTabs);
  };

  return (
    <Router>
      <Box sx={{ width: "100%", marginTop: 2 }}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{
            backgroundColor: "#F1F5F8",
          }}
        >
          {tabsData.map((tab, index) => (
            <Tab
              key={tab.label}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      marginRight: 1,
                    }}
                  >
                    {getIconForTab(tab.label)}
                  </Box>
                  {tab.label}
                  <IconButton
                    size="small"
                    onClick={() => togglePinTab(index)}
                    sx={{ marginLeft: 1 }}
                  >
                    {tab.pinned ? (
                      <UnpinIcon fontSize="small" />
                    ) : (
                      <PinIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              }
              component={Link}
              to={tab.path}
              id={tab.label}
              draggable={!tab.pinned}
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
