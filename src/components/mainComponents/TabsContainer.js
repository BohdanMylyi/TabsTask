import React, { useState, useEffect } from "react";
import { Tabs, Box } from "@mui/material";
import Tab from "./TabItem";

const initialTabsData = [
  { label: "Dashboard", path: "/", pinned: false },
  { label: "Banking", path: "/banking", pinned: false },
  { label: "Statistics", path: "/statistics", pinned: false },
  { label: "Help", path: "/help", pinned: false },
  { label: "Phone", path: "/phone", pinned: false },
  { label: "Administration", path: "/administration", pinned: false },
  { label: "Accounting", path: "/accounting", pinned: false },
  { label: "Post Office", path: "/post-office", pinned: false },
  { label: "Verkauf", path: "/verkauf", pinned: false },
];

const TabsContainer = () => {
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
    <Tabs
      indicatorColor="primary"
      textColor="primary"
      centered
      sx={{ backgroundColor: "#FEFEFE", height: "72px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "48px",
          width: "50px",
        }}
      >
        <img src={require("../../icons/pinned.png")} alt="Icon Pinned" />
      </Box>
      {tabsData.map((tab, index) => (
        <Tab
          key={tab.label}
          tab={tab}
          index={index}
          onTogglePin={togglePinTab}
          onDragStart={dragStartHandler}
          onDragOver={dragOverHandler}
          onDrop={dropHandler}
        />
      ))}
    </Tabs>
  );
};

export default TabsContainer;
