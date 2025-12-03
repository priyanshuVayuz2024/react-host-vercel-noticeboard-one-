import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { getMuiTheme } from "../../theme/muiTheme";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const CustomThemeSwitcherComp = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [muiTheme, setMuiTheme] = useState(getMuiTheme());
  const [currentTheme, setCurrentTheme] = useState("light");

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setMuiTheme(getMuiTheme());
    setCurrentTheme(newTheme);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    setCurrentTheme(saved);
    setMuiTheme(getMuiTheme());
  }, []);

  const toggleMenu = React.useCallback(
    (event) => {
      setMenuAnchorEl(isMenuOpen ? null : event.currentTarget);
      setIsMenuOpen((previousIsMenuOpen) => !previousIsMenuOpen);
    },
    [isMenuOpen]
  );

  return (
    <React.Fragment>
      <Tooltip title="Settings" enterDelay={1000}>
        <div>
          <IconButton type="button" aria-label="settings" onClick={toggleMenu}>
            <SettingsOutlinedIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Popover
        open={isMenuOpen}
        anchorEl={menuAnchorEl}
        onClose={toggleMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableAutoFocus
      >
        <Box sx={{ p: 2 }}>
          <FormControl>
            <FormLabel id="custom-theme-switcher-label">Theme</FormLabel>
            <RadioGroup
              aria-labelledby="custom-theme-switcher-label"
              defaultValue="light"
              name="custom-theme-switcher"
              value={currentTheme}
              onChange={handleThemeChange}
            >
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel value="red" control={<Radio />} label="Red" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Popover>
    </React.Fragment>
  );
};
