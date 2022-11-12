import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
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
import { GetUserByToken, Logout } from "../../Api/services";
import { GlobalGymInfo } from "../../context";

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

const Sidebar = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [activemenu, setactivemenu] = useState("");
  const [menuName, setMenuName] = useState("profile");
  const [menuColor, setMenuColor] = useState("profile");

  const showSubnav = useCallback(
    () => [setMenuName("asdfasdf"), setSubnav(true)],
    [menuName, menuColor, subnav]
  );
  const closeSubnav = useCallback(
    () => [setMenuName("jhggjhgg"), setSubnav(false)],
    [menuName, menuColor, subnav]
  );

  const changeValueSelected = () => {
    setMenuName("asdfasdfasfd");
  };

  const handleActiveMenu = () => {
    setSubnav(true);
  };
  useEffect(() => {
    console.log("balaaaaaaaa");
  }, []);

  return (
    <>
      {/* parent */}

      <div className="menu-list" onMouseLeave={closeSubnav}>
        <div onMouseOverCapture={showSubnav}>
          {item.path ? (
            <Link
              to={item?.path ? item?.path : "/bala"}
              className="warpsidebar-link"
              key={item.title}
            >
              <div
                className="d-flex  align-items-center  "
                style={{
                  marginLeft: "-1px",
                  color: item?.subManusLists?.includes(menuColor)
                    ? "yellow"
                    : "",
                }}
              >
                <span className="warpsidebar-icon">{item.icon}</span>
                <span className="warpsidebr-text">{item.title}</span>
              </div>
            </Link>
          ) : (
            <div
              className="d-flex  align-items-center  "
              style={{
                marginLeft: "-1px",
                color: item?.subManusLists?.includes(menuColor) ? "yellow" : "",
              }}
              key={item.title}
            >
              <span className="warpsidebar-icon">{item.icon}</span>
              <span className="warpsidebr-text">{item.title}</span>
            </div>
          )}
          {/* 1 child level  */}
          {(item?.subManusLists?.includes(menuName) ? !subnav : subnav) &&
            item.subNav?.map((subitem, index) => {
              return (
                <>
                  <Link
                    className="warpsubsidebar-link"
                    to={subitem.path}
                    key={index}
                  >
                    <div className="child-list mt-3" key={index}>
                      <div
                        className="d-flex  align-items-center  "
                        style={{
                          marginLeft: "-1px",
                          color: subitem.activename === menuColor ? "red" : "",
                        }}
                      >
                        {subitem?.icon && (
                          <span className="warpsub-icon">{subitem.icon}</span>
                        )}
                        <span className="warpsub-text">
                          {subitem.title} {subitem.activename}
                        </span>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
