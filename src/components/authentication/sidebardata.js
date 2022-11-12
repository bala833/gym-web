import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

export const SidebarData = [
  {
    title: "Dashbaord",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    title: "Account",
    icon: <GroupOutlinedIcon />,
    subManusLists: ["profile"],
    subNav: [
      {
        title: "Profile",
        icon: <ManageAccountsOutlinedIcon />,
        path: "/account",
        activename: "profile",
      },
    ],
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    subNav: [
      {
        title: "User",
        icon: <PermIdentityOutlinedIcon />,
        path: "/user-list",
        activename: "user",
      },
    ],
  },
  {
    title: "Team",
    path: "/team",
    icon: <DashboardIcon />,
  },
  {
    title: "Razor Pay",
    icon: <DashboardIcon />,

    subNav: [
      {
        title: "Razorpay",
        path: "/razorpay",
        icon: <DashboardIcon />,
        activename: "dff",
      },
      {
        title: "Message 2",
        path: "/messages/message2",
        icon: <DashboardIcon />,
        activename: "ss",
      },
    ],
  },
  {
    title: "Support",
    path: "/support",
    icon: <DashboardIcon />,
  },
];

export const SidebarDataDemo = [
  {
    title: "Overview",
    path: "/overview",
    icon: <DashboardIcon />,

    subNav: [
      {
        title: "Users",
        path: "/overview/users",
        icon: <DashboardIcon />,
      },
      {
        title: "Revenue",
        path: "/overview/revenue",
        icon: <DashboardIcon />,
      },
    ],
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <DashboardIcon />,

    subNav: [
      {
        title: "Reports",
        path: "/reports/reports1",
        icon: <DashboardIcon />,
        cName: "sub-nav",
      },
      {
        title: "Reports 3",
        path: "/reports/reports3",
        icon: <DashboardIcon />,
      },
      {
        title: "Reports 2",
        path: "/reports/reports2",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Products",
    path: "/products",
    icon: <DashboardIcon />,
  },
  {
    title: "Team",
    path: "/team",
    icon: <DashboardIcon />,
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <DashboardIcon />,

    subNav: [
      {
        title: "Message 1",
        path: "/messages/message1",
        icon: <DashboardIcon />,
      },
      {
        title: "Message 2",
        path: "/messages/message2",
        icon: <DashboardIcon />,
      },
    ],
  },
  {
    title: "Support",
    path: "/support",
    icon: <DashboardIcon />,
  },
];
