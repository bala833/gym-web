import React, { useState, useEffect, useContext } from "react";
import { IconButton } from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link, Router } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useHistory } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "./header.css";
import SideBar from "../sideBar/sideBar";
import { base_url, GetUserByToken, Logout } from "../../Api/services";
import { GlobalGymInfo } from "../../context";
import { SidebarData } from "../../utils/sidebarData/sidebarData";
import { ToastMessage } from "../../utils/toastMessage/toast";

const Header = () => {
  const { logout } = useContext(GlobalGymInfo);

  const pages = ["User", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "l"];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userDetail, setUserDetail] = useState({});
  let history = useHistory();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const GetUserDetail = async () => {
    const response = await GetUserByToken();
    if (response?.status === 400 && response?.data) {
      if (response.data == "Invalid Token") {
        localStorage.removeItem("token");
        Logout();
        console.log("Invalid Token", response?.data);
        history.push("/");
      }
    } else {
      setUserDetail(response.data);
      console.log(response.data, "oooooooooooooo");
    }
  };

  useEffect(() => {
    GetUserDetail();
  }, []);

  const LogoutUser = async () => {
    const response = await Logout();
    if (response?.status === 200 && response?.data) {
      localStorage.removeItem("token");
      logout();
      ToastMessage("success", "Successfully Logged out");
      console.log("Logout Successfull");
      history.push("/");
    } else {
      console.error("error LogoutUser");
    }
  };
  const GoForAdmin = async () => {
    history.push(window.open(`${base_url}admin`, "_blank"));
  };
  const GoForAccount = async () => {
    history.push("/account");
  };

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(true);
  const closeSubnav = () => setSubnav(false);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 240 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ overflow: "hidden" }}
    >
      <div className="row" style={{ marginBottom: "32px" }}>
        <div className="">
          <AdbIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
        </div>
      </div>
      <Divider />

      <div className="container-fluid sidbar-content">
        <div className="mt-4">
          {SidebarData?.map((item, index) => {
            return <SideBar item={item} key={index} />;
          })}
        </div>
      </div>
    </Box>
  );

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "rgb(247 250 255)" }}>
        <Toolbar disableGutters>
          <Grid item xs={1}>
            <Link className="warpsidebar-link" to="/">
              <div className="d-flex justify-content-center">
                <h6 style={{ color: "black" }}>LOGO</h6>
              </div>
            </Link>
          </Grid>
          <Grid item xs={1}>
            <div>
              <React.Fragment key={"left"}>
                {/* <Button onClick={toggleDrawer("left", true)}>{"left"}</Button> */}
                <IconButton size="large" onClick={toggleDrawer("left", true)}>
                  <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                  anchor={"left"}
                  open={state["left"]}
                  onClose={toggleDrawer("left", false)}
                  onOpen={toggleDrawer("left", true)}
                >
                  {list("left")}
                </SwipeableDrawer>
              </React.Fragment>
            </div>
          </Grid>

          <Grid item xs={8}></Grid>
          <Grid item xs={2}>
            {" "}
            <div
              className="d-flex justify-content-end mr-1"
              style={{ marginRight: "12px" }}
            >
              <h6
                style={{ color: "black", marginRight: "5px" }}
                className="mr-1"
              >
                {userDetail.first_name}
              </h6>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    style={{ width: 45, height: 45 }}
                    // sx={{ width: 56, height: 56 }}
                    alt={userDetail.first_name?.toUpperCase()}
                    src={userDetail?.picture}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="admin" onClick={handleCloseUserMenu}>
                  <Typography textalign="center">
                    <span onClick={GoForAdmin}>Admin</span>
                  </Typography>
                </MenuItem>

                <MenuItem key="logout" onClick={handleCloseUserMenu}>
                  <Typography textalign="center">
                    <span onClick={LogoutUser}>Logout</span>
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
