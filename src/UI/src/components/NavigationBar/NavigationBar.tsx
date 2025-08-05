import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { homePath } from "../../paths";

export interface NavigationBarProps {
  search: string;
  onSearchChange: (val: string) => void;
};

export const NavigationBar: React.FC<NavigationBarProps> = ({ search, onSearchChange }) => {
  const navigate = useNavigate();


  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(homePath)}
          >
            Magnet
          </Typography>
                  </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon />
          <InputBase
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{
              backgroundColor: "#f0f0f0",
              px: 1,
              borderRadius: 1,
              fontSize: 14,
              height: 36,
            }}
          />
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
