import React, { useState } from "react";
import { Tab, Box, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import PinIcon from "@mui/icons-material/PushPin";
import UnpinIcon from "@mui/icons-material/PushPinOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import HelpIcon from "@mui/icons-material/Help";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

import "../../styles/TabItem.css";

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
      return <LocalPostOfficeIcon />;
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
  onDelete,
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

  return (
    <Box className="tab-item-container">
      <Tab
        label={
          <Box className="tab-content">
            <Box className="tab-icon">{getIconForTab(tab.label)}</Box>
            {tab.label}
            <IconButton
              size="small"
              onClick={() => onTogglePin(index)}
              className="tab-icon-button"
            >
              {tab.pinned ? (
                <UnpinIcon fontSize="small" />
              ) : (
                <PinIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(index)}
              className="tab-icon-button"
            >
              <DeleteIcon fontSize="small" />
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
        className={`${isDragging ? "tab-dragging" : ""} ${
          isSelected ? "tab-selected" : ""
        } tab-transition`}
      />
    </Box>
  );
};

export default TabItem;
