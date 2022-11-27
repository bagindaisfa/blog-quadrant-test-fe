import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Routes from "../../Config/Routes";
import { useHistory } from "react-router-dom";
import { Avatar, Menu, MenuItem, Paper } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { getDataUserLogin } from "../../Config/helper/localStorage";
import "./styles.css";
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

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const Name = JSON.parse(localStorage.getItem("quadrant"));
  const usr = getDataUserLogin();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <div
          style={{
            position: "absolute",
            right: 0,
            display: "flex",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <Avatar style={{ textTransform: "capitalize", marginTop: "17px" }}>
            {Name.namaPengguna.charAt(0)}
          </Avatar>
          <Typography
            style={{
              fontSize: "22px",
              marginLeft: "15px",
              textTransform: "capitalize",
              marginTop: "22px",
            }}
          >
            {Name.namaPengguna}
          </Typography>
          <KeyboardArrowDownIcon
            style={{ fontSize: "35px", marginLeft: "25px", marginTop: "20px" }}
          />
        </div>
        <Paper>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{ width: 280, maxWidth: "100%" }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                history.push("/");
                localStorage.removeItem("quadrant");
                window.location.reload();
              }}
            >
              <LogoutIcon style={{ marginRight: "15px" }} />
              Logout
            </MenuItem>
          </Menu>
        </Paper>
      </AppBar>
      <Main open={open}>
        <Routes />
      </Main>
    </Box>
  );
}
