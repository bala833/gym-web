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
    subManusLists: ["home"],
  },
  {
    title: "Account",
    icon: <GroupOutlinedIcon />,
    subManusLists: ["account"],
    subNav: [
      {
        title: "Profile",
        icon: <ManageAccountsOutlinedIcon />,
        path: "/account",
        activename: "account",
      },
    ],
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    subManusLists: ["user"],

    subNav: [
      {
        title: "User",
        icon: <PermIdentityOutlinedIcon />,
        path: "/user",
        activename: "user",
      },
    ],
  },
  {
    title: "Team",
    path: "/team",
    icon: <DashboardIcon />,
    subManusLists: ["team"],
  },
  {
    title: "Razor Pay",
    icon: <DashboardIcon />,
    subManusLists: ["razorpay"],

    subNav: [
      {
        title: "Razorpay",
        path: "/razorpay",
        icon: <DashboardIcon />,
        activename: "razorpay",
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
