import React, { useState } from "react";
import {
  Drawer,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  HomeOutlined,
  PersonOutline,
  ForumOutlined,
  NotificationsNoneOutlined,
  HelpOutline,
  PeopleOutline,
  SecurityOutlined,
  ContactsOutlined,
  LocalHospitalOutlined,
  Inventory2Outlined,
  GroupsOutlined,
  FolderOutlined,
  AccountBalanceWalletOutlined,
  PaidOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  ChatBubbleOutlineOutlined,
  HowToVoteOutlined,
  PollOutlined,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  // Category 1
  { text: "Home", icon: <HomeOutlined />, url: "/home" },
  { text: "My Profile", icon: <PersonOutline />, url: "/profile" },
  {
    text: "Forum",
    icon: <ForumOutlined />,
    url: "/forum",
    children: [
      {
        text: "Notice Board",
        icon: <NotificationsNoneOutlined />,
        url: "/forum/notice-board",
      },
      {
        text: "Class fields",
        icon: <FolderOutlined />,
        url: "/forum/class-fields",
      },
      { text: "Gallery", icon: <Inventory2Outlined />, url: "/forum/gallery" },
      {
        text: "Polling Booth",
        icon: <HowToVoteOutlined />,
        url: "/forum/polling-booth",
      },
      { text: "Surveys", icon: <PollOutlined />, url: "/forum/surveys" },
    ],
  },
  { text: "Get Ready for GST", icon: <ReceiptLongOutlined />, url: "/gst" },
  { text: "Refer & Earn", icon: <PaidOutlined />, url: "/refer" },

  // Category 2
  { text: "Help Desk", icon: <HelpOutline />, url: "/help-desk" },
  { text: "Gatekeeper", icon: <PeopleOutline />, url: "/gatekeeper" },
  { text: "Facilities", icon: <SecurityOutlined />, url: "/facilities" },
  { text: "Directory", icon: <ContactsOutlined />, url: "/directory" },
  {
    text: "Vaccination Tracker",
    icon: <LocalHospitalOutlined />,
    url: "/vaccination-tracker",
  },

  // Category 3
  { text: "Assets", icon: <Inventory2Outlined />, url: "/assets" },
  { text: "Meetings", icon: <GroupsOutlined />, url: "/meetings" },
  { text: "Repository", icon: <FolderOutlined />, url: "/repository" },
  {
    text: "Accounts",
    icon: <AccountBalanceWalletOutlined />,
    url: "/accounts",
  },
  { text: "Mollak", icon: <AccountBalanceWalletOutlined />, url: "/mollak" },
  { text: "Income", icon: <PaidOutlined />, url: "/income" },
  { text: "Expenditure", icon: <ReceiptLongOutlined />, url: "/expenditure" },
  { text: "Workflow", icon: <FolderOutlined />, url: "/workflow" },

  // Support
  { text: "Setting", icon: <SettingsOutlined />, url: "/setting" },
  { text: "Help!", icon: <HelpOutline />, url: "/help" },
  { text: "Chat", icon: <ChatBubbleOutlineOutlined />, url: "/chat" },
];

export const SideBar = ({ open, setOpen, collapsedWidth, drawerWidth }) => {
  const [openItems, setOpenItems] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleToggleItem = (text) => {
    setOpenItems((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerVariant = isMobile ? "temporary" : "permanent";

  return (
    <Drawer
      variant={drawerVariant}
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          overflowX: "hidden",
          transition: "width 0.3s",
          backgroundColor: "var(--color-background)",
          color: "var(--color-icon)",
        },
      }}
      slotProps={{
        paper: {
          sx: {
            top: "65px",
            height: "calc(100% - 65px)",
          },
        },
      }}
    >
      <List className="!pt-0">
        {navItems.map((item) => {
          const isParent = !!item.children;
          const isOpen = openItems[item.text];
          const isActive = location.pathname === item.url;

          return (
            <div className="cursor-pointer" key={item.text}>
              <Tooltip title={!open ? item.text : ""} placement="right" arrow>
                <ListItem
                  button
                  onClick={() => {
                    if (isParent) {
                      handleToggleItem(item.text);
                    } else if (item.url) {
                      navigate(item.url);
                      if (isMobile) toggleDrawer(); // close on mobile
                    }
                  }}
                  sx={{
                    justifyContent: open ? "flex-start" : "center",
                    px: 2,
                    py: 1,
                    backgroundColor: isActive
                      ? "rgba(0, 0, 0, 0.1)"
                      : "inherit",
                    color: isActive ? theme.palette.primary.main : "inherit",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "0",
                      color: isActive
                        ? theme.palette.primary.main
                        : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                  {isParent &&
                    open &&
                    (isOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
              </Tooltip>

              {isParent && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => {
                      const isChildActive = location.pathname === child.url;
                      return (
                        <Tooltip
                          key={child.text}
                          title={!open ? child.text : ""}
                          placement="right"
                          arrow
                        >
                          <ListItem
                            button
                            onClick={() => {
                              navigate(child.url);
                              if (isMobile) toggleDrawer(); // close on mobile
                            }}
                            sx={{
                              pl: open ? 6 : 2,
                              justifyContent: open ? "flex-start" : "center",
                              py: 0.5,
                              backgroundColor: isChildActive
                                ? "rgba(0, 0, 0, 0.1)"
                                : "inherit",
                              color: isChildActive
                                ? theme.palette.primary.main
                                : "inherit",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 2 : 0,
                                color: isChildActive
                                  ? theme.palette.primary.main
                                  : "inherit",
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>
                            {open && <ListItemText primary={child.text} />}
                          </ListItem>
                        </Tooltip>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    </Drawer>
  );
};
