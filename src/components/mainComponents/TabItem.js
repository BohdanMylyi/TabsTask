import React, { useState } from "react";
import { Tab, Box, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import PinIcon from "@mui/icons-material/PushPin";
import UnpinIcon from "@mui/icons-material/PushPinOutlined";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import HelpIcon from "@mui/icons-material/Help";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

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
    case "Accounting":
      return <GroupAddIcon />;
    case "Verkauf":
      return <LoyaltyIcon />;
    case "Post Office":
      return <LocalPostOfficeIcon />
    default:
      return null;
  }
};

const TabItem = ({
  tab,
  index,
  onTogglePin,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const location = useLocation();

  const handleDragStart = (ev) => {
    setIsDragging(true);
    onDragStart(ev, index);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const isSelected = location.pathname === tab.path;

  const transitionLines = 8;

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "50px" }}>
      <Tab
        label={
          <Box
            sx={{ display: "flex", alignItems: "center", maxwidth: "144px" }}
          >
            <Box sx={{ marginRight: 1 }}>{getIconForTab(tab.label)}</Box>
            {tab.label}
            <IconButton
              size="small"
              onClick={() => onTogglePin(index)}
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
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={onDragOver}
        onDrop={(ev) => onDrop(ev, index)}
        sx={{
          backgroundColor: isDragging
            ? "#7F858D"
            : isSelected
            ? "#F1F5F8"
            : "transparent",
          borderTop: isSelected ? "2px solid #4690E2" : "none",
          transition: "background-color 0.2s, border-top 0.2s",
        }}
      />
      {index < transitionLines && (
        <Box
          sx={{
            width: "16px",
            height: "0px",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            transform: "rotate(-90deg)",
          }}
        />
      )}
    </Box>
  );
};

export default TabItem;
