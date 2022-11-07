import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { homePath } from "../../paths";

const navItems = [{ name: "Home", link: "/" }];

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", marginBottom: "80px" }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              navigate(homePath);
            }}
          >
            Magnet
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(item.link);
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
