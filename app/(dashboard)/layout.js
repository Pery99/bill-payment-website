"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  Home,
  CreditCard,
  Phone,
  Database,
  X,
  MenuIcon,
  Wallet,
  Settings,
  HelpCircle,
  TrendingUp,
  Bell,
  CopyPlus,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { generateAvatarFromName } from "@/generateAvatarFromName";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  const quickLinks = [
    {
      icon: <CreditCard className="text-blue-400" size={40} />,
      title: "Bills Payment",
      description: "Pay all your utility bills",
      onClick: () => router.push("/bills"),
    },
    {
      icon: <Phone className="text-green-400" size={40} />,
      title: "Airtime",
      description: "Quick mobile top-up",
      onClick: () => router.push("/airtime"),
    },
    {
      icon: <Database className="text-purple-400" size={40} />,
      title: "Data",
      description: "Purchase data plans",
      onClick: () => router.push("/data-create"),
    },
  ];

  const menuItems = [
    {
      icon: <Home />,
      label: "Dashboard",
      route: "/",
    },
    {
      icon: <Wallet />,
      label: "Wallet",
      route: "/wallet",
    },
    {
      icon: <Phone />,
      label: "Buy Airtime",
      route: "/airtime",
    },
    {
      icon: <Database />,
      label: "Buy Data",
      route: "/data-create",
    },
    {
      icon: <TrendingUp />,
      label: "Transactions",
      route: "/transactions",
    },
  ];

  const renderQuickLinks = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {quickLinks.map((link, index) => (
        <Card
          key={index}
          className="p-4 bg-white shadow-lg rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={link.onClick}
        >
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-full">{link.icon}</div>
            <div>
              <Typography variant="h6" className="text-gray-800">
                {link.title}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {link.description}
              </Typography>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const Sidebar = () => (
    <Card className="h-full w-full max-w-[280px] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-6 flex items-center justify-between">
        <Typography
          variant="h5"
          color="blue-gray"
          className="flex items-center gap-2"
        >
          <CopyPlus className="text-blue-500" /> BillApp
        </Typography>
      </div>

      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => router.push(item.route)}
            className={`hover:bg-blue-50 ${
              router.pathname === item.route
                ? "bg-blue-50 text-blue-500"
                : "text-gray-700"
            }`}
          >
            <ListItemPrefix>
              {React.cloneElement(item.icon, {
                className:
                  router.pathname === item.route
                    ? "text-blue-500"
                    : "text-gray-500",
              })}
            </ListItemPrefix>
            {item.label}
          </ListItem>
        ))}

        <hr className="my-4 border-blue-gray-50" />

        <ListItem>
          <ListItemPrefix>
            <Settings className="text-gray-500" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <HelpCircle className="text-gray-500" />
          </ListItemPrefix>
          Help & Support
        </ListItem>
      </List>
    </Card>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[280px]">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        className="lg:hidden"
      >
        <Sidebar />
      </Drawer>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <Button
              variant="text"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X /> : <MenuIcon />}
            </Button>
          </div>

          {/* Search and Notifications */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            <div className="relative">
              <Bell className="text-gray-600 cursor-pointer hover:text-blue-500" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
            <Menu>
              <MenuHandler>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img
                    src={
                      user?.photoURL ||
                      generateAvatarFromName(user?.displayName || user?.email)
                    }
                    alt="Profile"
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div>
                    <Typography variant="small" className="font-bold">
                      {user?.displayName ||
                        user?.email?.split("@")[0] ||
                        "User"}
                    </Typography>
                    <Typography variant="small" className="text-gray-500">
                      {user?.email || "user@example.com"}
                    </Typography>
                  </div>
                </div>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  className="flex items-center gap-2"
                  onClick={() => router.push("/profile")}
                >
                  <Settings className="h-4 w-4" /> Profile
                </MenuItem>
                <MenuItem
                  className="flex items-center gap-2 text-red-500"
                  onClick={() => dispatch(logout())}
                >
                  <LogOut className="h-4 w-4" /> Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {renderQuickLinks()}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
