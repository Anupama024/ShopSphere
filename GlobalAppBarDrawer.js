

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Popover from '@mui/material/Popover';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import { Typography as MuiTypography, Box as MuiBox, Button as MuiButton, Avatar, Tooltip, IconButton, Badge } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import { getCartCount } from '../utils/cartUtils';

// You can add more props to customize content, pass handlers, etc.

const GlobalAppBarDrawer = ({
  drawerContent,
  appBarContent,
  darkMode,
  onThemeToggle,
  filterAnchorEl,
  handleFilterClick,
  handleFilterClose,
  pendingFilters,
  handleFilterChange,
  pendingPrice,
  handlePendingPriceChange,
  handleApplyFilters,
  handleClearFilters,
  pendingAge,
  handlePendingAgeChange,
  showAgeGenderFilters,
  favouriteButtonProps,
  searchTerm: controlledSearchTerm,
  setSearchTerm: setControlledSearchTerm
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMen, setOpenMen] = useState(false);
  const [openWomen, setOpenWomen] = useState(false);
  const [openKids, setOpenKids] = useState(false);
  const [internalDark, setInternalDark] = useState(darkMode || false);
  const [cartCount, setCartCount] = useState(0);
  
  // AppBar state for HomePage-like functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Update cart count on mount and when storage changes
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);
  // filterAnchorEl, pendingFilters, pendingPrice, selectedFilters, priceRange, open are now managed by parent and passed as props
  // User info for avatar
  const user = JSON.parse(localStorage.getItem('user')) || { firstName: '', lastName: '' };
  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
  // AppBar handlers (HomePage style)
  const handleSearchChange = (e) => {
    if (setControlledSearchTerm) {
      setControlledSearchTerm(e.target.value);
    } else {
      setSearchTerm(e.target.value);
    }
  };
  const handleFavouriteClick = () => { window.location.href = '/favourites'; };
  const handleCartClick = () => { navigate('/cart'); };
  // Filter handlers are now passed as props from parent
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const handleLogout = () => { setAnchorEl(null); window.location.href = '/login'; };

  const isDark = darkMode !== undefined ? darkMode : internalDark;
  const handleThemeToggle = () => {
    if (typeof onThemeToggle === 'function') {
      onThemeToggle();
    } else {
      setInternalDark((prev) => !prev);
    }
  };
  const handleMenClick = () => setOpenMen((prev) => !prev);
  const handleWomenClick = () => setOpenWomen((prev) => !prev);
  const handleKidsClick = () => setOpenKids((prev) => !prev);
  const navigate = useNavigate();

  useEffect(() => {
    const currentDark = document.body.classList.contains('dark-mode');
    if (darkMode !== undefined) {
      if (darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: { darkMode } }));
    } else if (currentDark !== internalDark) {
      document.body.classList.toggle('dark-mode', internalDark);
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: { darkMode: internalDark } }));
    }
  }, [darkMode, internalDark]);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ width: '100%', top: 0, background: isDark ? 'rgba(18,18,18,0.94)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', color: isDark ? '#e0e0e0' : '#424242', boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.35)' : '0 2px 8px rgba(0,0,0,0.1)', zIndex: 1300, borderBottom: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.18)' }}>
        <Toolbar sx={{ minHeight: 64, px: 3 }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          {/*
            To ensure avatar and filter popovers have a light blur background,
            pass PaperProps={{ sx: { background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.18)' } }}
            to your Popover components in appBarContent, just like in HomePage.
          */}
          {appBarContent ? appBarContent : (
            <>
              <MuiTypography
                variant="h5"
                sx={{
                  fontFamily: 'cursive',
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: isDark ? '#e0e0e0' : '#424242',
                  flex: 0,
                  mr: 1
                }}
              >
                ShopSphere
              </MuiTypography>
              <div style={{ flexGrow: 1 }} />
              {/* Search */}
              <div style={{ display: 'flex', alignItems: 'center', background: isDark ? '#222' : '#f0f0f0', borderRadius: 20, padding: '2px 10px', marginRight: 16, minWidth: 180, height: 40 }}>
                <svg style={{ color: isDark ? '#b0b0b0' : '#424242', marginRight: 8, width: 24, height: 24 }} focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                <input
                  placeholder="Search…"
                  style={{ color: isDark ? '#e0e0e0' : '#424242', width: 120, height: 36, background: 'transparent', border: 'none', outline: 'none', fontSize: 16, padding: '0 8px' }}
                  aria-label="search"
                  value={controlledSearchTerm !== undefined ? controlledSearchTerm : searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              {/* Favourite Icon */}
              <svg onClick={handleFavouriteClick} style={{ color: isDark ? '#b0b0b0' : '#e53935', marginRight: 16, width: 28, height: 28, verticalAlign: 'middle', cursor: 'pointer' }} focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
              {/* Cart Icon with Badge */}
              <Tooltip title="View Cart">
                <IconButton onClick={handleCartClick} sx={{ mr: 1, color: isDark ? '#b0b0b0' : '#424242' }}>
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              {/* Filter Icon */}
              <IconButton onClick={handleFilterClick} sx={{ color: isDark ? '#b0b0b0' : '#424242', mr: 1 }} aria-label="filter">
                <FilterListIcon />
              </IconButton>
              {/* Filter Popover (MUI, like HomePage) */}

              <Popover
                open={Boolean(filterAnchorEl)}
                anchorEl={filterAnchorEl}
                onClose={handleFilterClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                PaperProps={{
                  sx: {
                    p: 2,
                    minWidth: 200,
                    maxHeight: 400,
                    overflowY: 'auto',
                    background: isDark ? 'rgba(25,25,25,0.95)' : 'rgba(255,255,255,0.92)',
                    color: isDark ? '#e0e0e0' : '#424242',
                    backdropFilter: 'blur(12px)',
                    boxShadow: isDark ? '0 10px 36px rgba(0,0,0,0.45)' : '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                    borderRadius: 3,
                    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.18)'
                  }
                }}
              >
                <MuiTypography variant="subtitle1" sx={{ mb: 1 }}>Select Filters</MuiTypography>
                {showAgeGenderFilters && (
                  <>
                    <MuiTypography variant="subtitle2" sx={{ mb: 1, mt: 1 }}>Age Group (0-15)</MuiTypography>
                    <Slider
                      value={pendingAge || [0, 15]}
                      onChange={handlePendingAgeChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={15}
                      sx={{ mb: 2, width: 120, color: '#424242', ml: 1 }}
                    />
                    <MuiTypography variant="subtitle2" sx={{ mb: 1 }}>Gender</MuiTypography>
                    <FormGroup row>
                      <FormControlLabel
                        control={<Checkbox checked={pendingFilters?.Boy || false} onChange={handleFilterChange} name="Boy" sx={{ color: '#424242' }} />}
                        label="Boy"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={pendingFilters?.Girl || false} onChange={handleFilterChange} name="Girl" sx={{ color: '#424242' }} />}
                        label="Girl"
                      />
                    </FormGroup>
                    <Divider sx={{ my: 1 }} />
                  </>
                )}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={pendingFilters?.Formal || false}
                        onChange={handleFilterChange}
                        name="Formal"
                        sx={{ color: '#424242' }}
                      />
                    }
                    label="Formal"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={pendingFilters?.Casual || false}
                        onChange={handleFilterChange}
                        name="Casual"
                        sx={{ color: '#424242' }}
                      />
                    }
                    label="Casual"
                  />
                </FormGroup>
                <Divider sx={{ my: 1 }} />
                <MuiTypography variant="subtitle2" sx={{ mb: 1 }}>Price Range (₹{pendingPrice?.[0]} - ₹{pendingPrice?.[1]})</MuiTypography>
                <Slider
                  value={pendingPrice || [100, 5000]}
                  onChange={handlePendingPriceChange}
                  valueLabelDisplay="auto"
                  min={100}
                  max={5000}
                  step={100}
                  sx={{ width: 120, color: '#424242', ml: 1 }}
                />
                <MuiBox sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <MuiButton variant="outlined" color="primary" size="small" onClick={handleApplyFilters}>Apply</MuiButton>
                  <MuiButton variant="outlined" color="error" size="small" onClick={handleClearFilters}>Clear</MuiButton>
                </MuiBox>
              </Popover>
              {/* Avatar */}
              <Tooltip title={fullName} arrow>
                <MuiBox sx={{ display: 'inline-flex', alignItems: 'center', marginLeft: 1 }}>
                  <MuiButton onClick={handleAvatarClick} sx={{ minWidth: 0, p: 0.5, borderRadius: '50%' }}>
                    <Avatar sx={{ bgcolor: isDark ? '#424242' : '#b0b0b0', color: isDark ? '#fff' : '#222' }}>{initials || 'U'}</Avatar>
                  </MuiButton>
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                      sx: {
                        p: 2,
                        minWidth: 200,
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.18)'
                      }
                    }}
                  >
                    <MuiTypography align="center" variant="h6" sx={{ mt: 1, mb: 2 }}>{fullName || 'User'}</MuiTypography>
                    <MuiButton
                      variant="outlined"
                      color="error"
                      startIcon={<LogoutIcon />}
                      onClick={handleLogout}
                      sx={{ width: '100%' }}
                    >
                      Logout
                    </MuiButton>
                  </Popover>
                </MuiBox>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
  anchor="left"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
  PaperProps={{
    sx: {
      background: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
      borderRadius: 0,
      border: 'none',

      top: '64px',                         // 👈 push below AppBar
      height: 'calc(100vh - 64px)',        // 👈 FIXED HEIGHT
      overflowY: 'auto'                    // 👈 SCROLL ENABLED
    }
  }}
>
        {/* Spacer for AppBar height */}
        <div style={{ width: 280 }}>
          {drawerContent || (
            <>
              <MuiBox sx={{ display: 'flex', alignItems: 'center', px: 2, py: 2, mb: 1 }}>
                <MuiTypography variant="h5" sx={{ fontFamily: 'cursive', fontWeight: 700, letterSpacing: 2, color: '#222', flex: 1 }}>ShopSphere</MuiTypography>
                {!isDark && <WbSunnyIcon sx={{ color: '#fbc02d', mr: 1 }} />}
                {isDark && <DarkModeIcon sx={{ color: '#90caf9', mr: 1 }} />}
                <Switch checked={isDark} onChange={handleThemeToggle} color="default" />
              </MuiBox>
              <Divider />
              <List component="nav" disablePadding>
                <ListItem button onClick={() => { setDrawerOpen(false); navigate('/home'); }} sx={{ pl: 2 }}>
                  <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItem>
                <ListItem button onClick={() => { setDrawerOpen(false); navigate('/orders'); }} sx={{ pl: 2 }}>
                  <ListItemText primary="Order History" primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <ListItem button onClick={handleMenClick} sx={{ pl: 2 }}>
                  <ListItemText primary="Men" primaryTypographyProps={{ fontWeight: 600 }} />
                  {openMen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/men-tshirts'); }}>
                      <ListItemText primary="T-Shirts" />
                    </ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/men-shirts'); }}><ListItemText primary="Shirts" /></ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/men-jeans'); }}><ListItemText primary="Jeans" /></ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/men-pants'); }}><ListItemText primary="Pants" /></ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/men-shoes'); }}><ListItemText primary="Shoes" /></ListItem>
                  </List>
                </Collapse>
                <ListItem button onClick={handleWomenClick} sx={{ pl: 2 }}>
                  <ListItemText primary="Women" primaryTypographyProps={{ fontWeight: 600 }} />
                  {openWomen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openWomen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/women-tops'); }}><ListItemText primary="Tops & Tees" /></ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/women-dresses'); }}><ListItemText primary="Dresses" /></ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/women-jeans'); }}><ListItemText primary="Jeans" /></ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/women-kurtis'); }}><ListItemText primary="Kurtis" /></ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/women-heels'); }}><ListItemText primary="Heels" /></ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/women-handbags'); }}><ListItemText primary="Handbags" /></ListItem>
                  </List>
                </Collapse>
                <ListItem button onClick={handleKidsClick} sx={{ pl: 2 }}>
                  <ListItemText primary="Kids" primaryTypographyProps={{ fontWeight: 600 }} />
                  {openKids ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openKids} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/kids-tshirts'); }}><ListItemText primary="T-Shirts" /></ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/kids-shirts'); }}><ListItemText primary="Shirts" /></ListItem>
                  
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/kids-jeans'); }}><ListItemText primary="Jeans" /></ListItem>
                    <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); navigate('/kids-shorts'); }}><ListItemText primary="Shorts" /></ListItem>
                  </List>
                </Collapse>
              </List>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default GlobalAppBarDrawer;
