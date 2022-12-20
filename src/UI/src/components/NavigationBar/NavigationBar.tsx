import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { homePath } from "../../paths";

const navItems = [{ name: "Home", link: "/" }];

const useStyles = makeStyles({
  navBox: {
    display: "flex",
    marginBottom: "80px",
  },
  navTypography: {
    flexGrow: 1,
    cursor: "pointer",
  },
  navItemButton: {
    color: "#fff",
  },
});

export const NavigationBar: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.navBox}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            className={classes.navTypography}
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
                className={classes.navItemButton}
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
