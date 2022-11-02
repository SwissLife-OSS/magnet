import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

const drawerWidth = 240;
const navItems = [{ name: "Home", link: "/" }];

interface Props {
  viewer?: () => Window;
}

const useStyles = makeStyles({
  navLinks: {
    color: "white",
    textDecoration: "none",
  },
  navLinksMobile: {
    textDecoration: "none",
    color: "black",
  },
  navLinksHomeMobile: {
    textDecoration: "none",
    color: "black",
  },
});

const Nav: React.FC = (props: Props) => {
  const { viewer } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link className={classes.navLinksHomeMobile} to={"/"}>
          Magnet
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link
            key={item.name}
            className={classes.navLinksMobile}
            to={item.link}
          >
            <ListItem key={item.name} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    viewer !== undefined ? () => viewer().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link className={classes.navLinks} to={"/"}>
              Magnet
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: "#fff" }}>
                <Link className={classes.navLinks} to={item.link}>
                  {item.name}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 4 }}></Box>
    </Box>
  );
};

export default Nav;
