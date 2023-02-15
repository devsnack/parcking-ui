import React from "react";
import CLink from "../customlink";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  zIndex: -1,
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

//
export default function SidebarMenu({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [subMenu, setSubMenu] = React.useState(false);
  const [subMenuEMP, setSubMenuEMP] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"employee"} disablePadding>
            <ListItemButton onClick={() => setSubMenuEMP(!subMenuEMP)}>
              <ListItemIcon>
                <PersonIcon></PersonIcon>
              </ListItemIcon>
              <ListItemText primary={"Employée"} />
              {subMenuEMP ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={subMenuEMP} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <CLink href="/vehicule" style={{ color: "inherit" }}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    {" "}
                    <PersonAddIcon></PersonAddIcon>
                  </ListItemIcon>
                  <ListItemText primary="Ajouter Employee" />
                </ListItemButton>
              </CLink>
              <CLink href="/" style={{ color: "inherit" }}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FolderSharedIcon></FolderSharedIcon>
                  </ListItemIcon>
                  <ListItemText primary="Afficher details" />
                </ListItemButton>
              </CLink>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={() => setSubMenu(!subMenu)}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {subMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={subMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <CLink href="/vehicule">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </CLink>
              <CLink href="/" style={{ color: "inherit" }}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="BackHome" />
                </ListItemButton>
              </CLink>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader className="content" />
        {children}
      </Main>
    </Box>
  );
}

{
  /*<div className={style.container}>
        <aside className={style.aside}>hello</aside>
        <main className={`${style.content} `}>{children}</main>
      </div> */
}
