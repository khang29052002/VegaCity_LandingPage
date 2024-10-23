import React, { useState } from "react";
import Logo from "../Assets/Logo_1.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded"; // Import ShoppingCartRoundedIcon

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: "#home",
    },
    {
      text: "About",
      icon: <InfoIcon />,
      link: "#about",
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      link: "#contact",
    },
    {
      text: "Store",
      icon: <ShoppingCartRoundedIcon />,
      link: "/store",
    },
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" className="logo_image" />
      </div>

      <div className="navbar-links-container hidden md:flex space-x-6">
        {menuOptions.map((item) => (
          <a
            key={item.text}
            href={item.link}
            className="text-black-100 hover:text-blue-300"
          >
            {item.text}
          </a>
        ))}
      </div>

      <div className="navbar-menu-container md:hidden">
        <HiOutlineBars3
          onClick={() => setOpenMenu(true)}
          className="text-2xl text-gray-100 cursor-pointer"
        />
      </div>

      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component="a" href={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
