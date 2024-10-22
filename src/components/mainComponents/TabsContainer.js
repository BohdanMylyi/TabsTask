import React, { useState, useEffect } from "react";
import {
  Tabs,
  Box,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import Tab from "./TabItem";
import "../../styles/TabsContainer.css";

const initialTabsData = [
  { label: "Dashboard", path: "/", pinned: false },
  { label: "Banking", path: "/banking", pinned: false },
  { label: "Stats", path: "/statistics", pinned: false },
  { label: "Help", path: "/help", pinned: false },
  { label: "Phone", path: "/phone", pinned: false },
  { label: "Admin", path: "/administration", pinned: false },
  { label: "Accounting", path: "/accounting", pinned: false },
  { label: "Post Office", path: "/post-office", pinned: false },
  { label: "Verkauf", path: "/verkauf", pinned: false },
];

const TabsContainer = () => {
  const [tabsData, setTabsData] = useState(initialTabsData);
  const [overflowTabs, setOverflowTabs] = useState([]);

  const isExtraSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isSmall = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isMedium = useMediaQuery((theme) =>
    theme.breakpoints.between("md", "xl")
  );
  const isExtraLarge = useMediaQuery((theme) => theme.breakpoints.up("xl"));

  const visibleTabsCount = isExtraSmall
    ? 1
    : isSmall
    ? 3
    : isMedium
    ? 6
    : isExtraLarge
    ? 7
    : 10;

  useEffect(() => {
    const storedTabs = localStorage.getItem("tabsOrder");
    if (storedTabs) {
      const parsedTabs = JSON.parse(storedTabs);
      setTabsData(parsedTabs);
    }
  }, []);

  useEffect(() => {
    const overflow = tabsData.slice(visibleTabsCount);
    setOverflowTabs(overflow);
  }, [tabsData, visibleTabsCount]);

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

  const deleteTab = (index) => {
    const updatedTabs = [...tabsData];
    updatedTabs.splice(index, 1);
    setTabsData(updatedTabs);
    updateLocalStorage(updatedTabs);
  };

  const handleDropdownChange = (event) => {
    const selectedTab = tabsData.find(
      (tab) => tab.label === event.target.value
    );
    if (selectedTab) {
      window.location.href = selectedTab.path;
    }
  };

  return (
    <Box className="tabs-container">
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        centered
        className="tabs-header"
      >
        <Box className="pinned-icon">
          <img src={require("../../icons/pinned.png")} alt="Icon Pinned" />
        </Box>
        {tabsData.slice(0, visibleTabsCount).map((tab, index) => (
          <Tab
            key={tab.label}
            tab={tab}
            index={index}
            onTogglePin={togglePinTab}
            onDragStart={dragStartHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
            onDelete={deleteTab}
          />
        ))}
      </Tabs>
      {overflowTabs.length > 0 && (
        <FormControl variant="standard" className="dropdown-container">
          <Select
            labelId="overflow-tabs-label"
            onChange={handleDropdownChange}
            displayEmpty
            defaultValue=""
            className="dropdown-select"
          >
            {overflowTabs.map((tab) => (
              <MenuItem key={tab.label} value={tab.label}>
                {tab.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default TabsContainer;
