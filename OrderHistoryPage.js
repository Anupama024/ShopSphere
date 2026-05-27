import React, { useEffect, useState } from 'react';
import useDarkModeSync from '../utils/useDarkModeSync';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import GlobalAppBarDrawer from '../components/GlobalAppBarDrawer';
import GlobalFooter from '../components/GlobalFooter';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardMedia, Typography, Grid, Paper, CircularProgress, Container, Alert, Badge } from '@mui/material';
import { getProductImage } from '../utils/productDetails';
import { getCartCount } from '../utils/cartUtils';

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ Formal: false, Casual: false });
  const [pendingFilters, setPendingFilters] = useState({ Formal: false, Casual: false });
  const [pendingPrice, setPendingPrice] = useState([100, 5000]);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')) || { firstName: '', lastName: '' };
  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const handleLogout = () => { setAnchorEl(null); window.location.href = '/login'; };
  const open = Boolean(anchorEl);
  const [priceRange, setPriceRange] = useState([100, 5000]);
  const handleFilterClick = (event) => { setPendingFilters(selectedFilters); setPendingPrice(priceRange); setFilterAnchorEl(event.currentTarget); };
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleFilterChange = (event) => setPendingFilters((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
  const handlePendingPriceChange = (event, newValue) => setPendingPrice(newValue);
  const handleApplyFilters = () => { setSelectedFilters(pendingFilters); setPriceRange(pendingPrice); setFilterAnchorEl(null); };
  const handleClearFilters = () => { setPendingFilters({ Formal: false, Casual: false }); setPendingPrice([100, 5000]); setSelectedFilters({ Formal: false, Casual: false }); setPriceRange([100, 5000]); setFilterAnchorEl(null); };
  const [openMen, setOpenMen] = useState(false);
  const [openWomen, setOpenWomen] = useState(false);
  const [openKids, setOpenKids] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleThemeToggle = () => setDarkMode((prev) => !prev);
  const handleMenClick = () => setOpenMen((prev) => !prev);
  const handleWomenClick = () => setOpenWomen((prev) => !prev);
  const handleKidsClick = () => setOpenKids((prev) => !prev);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/payment/history');
        const ordersData = res.data || [];
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  // Extract purchased products from orders
  const purchasedProducts = orders.flatMap(order => {
    if (order.cartItems && Array.isArray(order.cartItems)) {
      return order.cartItems.map(item => {
        // Try to get the correct image from productDetails
        const correctImage = getProductImage(item.name);
        return {
          ...item,
          image: correctImage || item.src,
          name: item.name,
          price: item.price,
          company: item.company,
          orderId: order._id,
          orderDate: order.createdAt
        };
      });
    }
    return [];
  });

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <GlobalAppBarDrawer
        darkMode={darkMode}
        appBarContent={
          <>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'cursive',
                fontWeight: 700,
                letterSpacing: 2,
                color: darkMode ? '#b0b0b0' : '#424242',
                flex: 0,
                mr: 1
              }}
            >
              ShopSphere
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center', background: darkMode ? '#333' : '#f0f0f0', borderRadius: 20, padding: '2px 10px', marginRight: 16, minWidth: 180 }}>
              <SearchIcon sx={{ color: darkMode ? '#b0b0b0' : '#424242', mr: 1 }} />
              <InputBase
                placeholder="Search…"
                sx={{ color: darkMode ? '#b0b0b0' : '#424242', width: 120 }}
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <IconButton
              sx={{ color: darkMode ? '#b0b0b0' : '#e53935', mr: 1 }}
              onClick={() => window.location.href = '/favourites'}
              aria-label="favourites"
            >
              <FavoriteIcon />
            </IconButton>
            <Tooltip title="View Cart">
              <IconButton onClick={() => navigate('/cart')} sx={{ color: darkMode ? '#b0b0b0' : '#424242', mr: 1 }}>
                <Badge badgeContent={getCartCount()} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton onClick={handleFilterClick} sx={{ color: darkMode ? '#b0b0b0' : '#424242', mr: 1 }}>
              <FilterListIcon />
            </IconButton>
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
                  maxHeight: 340,
                  overflowY: 'auto',
                  background: 'rgba(255,255,255,0.7) !important',
                  backdropFilter: 'blur(12px) !important',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10) !important',
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.18) !important'
                }
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Select Filters</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={pendingFilters.Formal}
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
                      checked={pendingFilters.Casual}
                      onChange={handleFilterChange}
                      name="Casual"
                      sx={{ color: '#424242' }}
                    />
                  }
                  label="Casual"
                />
              </FormGroup>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Price Range (₹{pendingPrice[0]} - ₹{pendingPrice[1]})</Typography>
              <Slider
                value={pendingPrice}
                onChange={handlePendingPriceChange}
                valueLabelDisplay="auto"
                min={100}
                max={5000}
                step={100}
                sx={{ width: 120, color: '#424242', ml: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" color="primary" size="small" onClick={handleApplyFilters}>Apply</Button>
                <Button variant="outlined" color="error" size="small" onClick={handleClearFilters}>Clear</Button>
              </Box>
            </Popover>
            <Tooltip title={fullName} arrow>
              <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
                <Avatar sx={{ bgcolor: darkMode ? '#424242' : '#b0b0b0', color: darkMode ? '#fff' : '#222' }}>{initials}</Avatar>
              </IconButton>
            </Tooltip>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  p: 2,
                  minWidth: 200,
                  background: 'rgba(255,255,255,0.7) !important',
                  backdropFilter: 'blur(12px) !important',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10) !important',
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.18) !important'
                }
              }}
            >
              <Typography align="center" variant="h6" sx={{ mt: 1, mb: 2 }}>{fullName}</Typography>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ width: '100%' }}
              >
                Logout
              </Button>
            </Popover>
          </>
        }
        drawerContent={
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                pl: 4,
                top: 0,
                borderBottom: '1px solid rgba(200,200,200,0.25)',
                boxShadow: '0 2px 8px 0 rgba(31,38,135,0.07)',
                zIndex: 1,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'cursive',
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: darkMode ? '#b0b0b0' : '#424242',
                  flex: 1
                }}
              >
                ShopSphere
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                {!darkMode && <WbSunnyIcon sx={{ color: '#fbc02d' }} />}
                {darkMode && <DarkModeIcon sx={{ color: '#90caf9' }} />}
                <Switch checked={darkMode} onChange={handleThemeToggle} color="default" />
              </div>
            </Box>
            <Divider />
            <List component="nav" disablePadding>
              <ListItem button onClick={() => window.location.href = '/home'} sx={{ pl: 2 }}>
                <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItem>
              <ListItem button onClick={() => window.location.href = '/orders'} sx={{ pl: 2 }}>
                <ListItemText primary="Order History" primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem button onClick={handleMenClick} sx={{ pl: 2 }}>
                <ListItemText primary="Men" primaryTypographyProps={{ fontWeight: 600 }} />
                {openMen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openMen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/men-tshirts'; }}>
                    <ListItemText primary="T-Shirts" />
                  </ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/men-shirts'; }}><ListItemText primary="Shirts" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/men-jeans'; }}><ListItemText primary="Jeans" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/men-pants'; }}><ListItemText primary="Pants" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/men-shoes'; }}><ListItemText primary="Shoes" /></ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={handleWomenClick} sx={{ pl: 2 }}>
                <ListItemText primary="Women" primaryTypographyProps={{ fontWeight: 600 }} />
                {openWomen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openWomen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/women-tops'; }}><ListItemText primary="Tops & Tees" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/women-dresses'; }}><ListItemText primary="Dresses" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/women-jeans'; }}><ListItemText primary="Jeans" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/women-kurtis'; }}><ListItemText primary="Kurtis" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/women-shoes'; }}><ListItemText primary="Shoes" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/women-handbags'; }}><ListItemText primary="Handbags" /></ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={handleKidsClick} sx={{ pl: 2 }}>
                <ListItemText primary="Kids" primaryTypographyProps={{ fontWeight: 600 }} />
                {openKids ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openKids} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/kids-tshirts'; }}><ListItemText primary="T-Shirts" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/kids-shirts'; }}><ListItemText primary="Shirts" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/kids-jeans'; }}><ListItemText primary="Jeans" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/kids-shorts'; }}><ListItemText primary="Shorts" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/kids-shoes'; }}><ListItemText primary="Shoes" /></ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/kids-toys'; }}><ListItemText primary="Toys" /></ListItem>
                </List>
              </Collapse>
            </List>
          </>
        }
      />

      <Box sx={{ flex: 1, width: '100vw', px: { xs: 2, sm: 4, md: 8 }, pt: 0, pb: 4, mt: '64px', overflowY: 'auto', background: darkMode ? '#222' : '#fafafa' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontFamily: 'cursive',
            fontWeight: 700,
            letterSpacing: 2,
            color: darkMode ? '#b0b0b0' : '#222',
            textAlign: 'center',
            mt: 2,
            mb: 4
          }}
        >
          Order History
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {purchasedProducts.length === 0 && (
              <Grid item xs={12}>
                <Typography align="center" color="textSecondary">No purchased products found.</Typography>
              </Grid>
            )}
            {purchasedProducts.map((product, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card onClick={() => handleOpenDialog(product)} style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image || 'https://via.placeholder.com/200'}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Price: ₹{product.price}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Company: {product.company}</Typography>
                    {product.selectedSize && <Typography variant="body2" sx={{ mb: 1 }}>Size: {product.selectedSize}</Typography>}
                    {product.quantity && <Typography variant="body2">Quantity: {product.quantity}</Typography>}
                    {product.orderDate && <Typography variant="caption" sx={{ color: 'textSecondary', display: 'block', mt: 1 }}>Ordered: {formatDate(product.orderDate)}</Typography>}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog open={dialogOpen} onClose={() => handleCloseDialog()} maxWidth="sm" fullWidth>
          <DialogTitle>Product Details</DialogTitle>
          <DialogContent>
            {selectedOrder && (
              <>
                {selectedOrder.image && <img src={selectedOrder.image} alt={selectedOrder.name} style={{ width: '100%', marginBottom: 16, borderRadius: 8 }} />}
                <Typography variant="h6" sx={{ mb: 1 }}>{selectedOrder.name}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Price: ₹{selectedOrder.price}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Company: {selectedOrder.company}</Typography>
                {selectedOrder.selectedSize && <Typography variant="body2" sx={{ mb: 1 }}>Size: {selectedOrder.selectedSize}</Typography>}
                {selectedOrder.quantity && <Typography variant="body2" sx={{ mb: 1 }}>Quantity: {selectedOrder.quantity}</Typography>}
                {selectedOrder.orderDate && <Typography variant="body2" sx={{ mb: 1 }}>Order Date: {formatDate(selectedOrder.orderDate)}</Typography>}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseDialog()} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <GlobalFooter />
    </>
  );
};

export default OrderHistoryPage;


