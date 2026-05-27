import React, { useState, useEffect } from 'react';
import useDarkModeSync from '../utils/useDarkModeSync';
import GlobalAppBarDrawer from '../components/GlobalAppBarDrawer';
import GlobalFooter from '../components/GlobalFooter';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Switch from '@mui/material/Switch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { addToCart } from '../utils/cartUtils';
import Popover from '@mui/material/Popover';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getCartCount } from '../utils/cartUtils';

// Import images from assets/mentshirts
export const tshirtImages = [
  { id: 201, src: require('../assets/mentshirts/mt1.jpeg'), name: 'Men T-Shirt 1', price: '₹899', company: 'Menswear', description: 'Casual t-shirt for everyday wear.', sizes: ['S', 'M', 'L', 'XL'], category: 'Casual' },
  { id: 202, src: require('../assets/mentshirts/mt2.jpeg'), name: 'Men T-Shirt 2', price: '₹999', company: 'Menswear', description: 'Trendy t-shirt for men.', sizes: ['M', 'L', 'XL'], category: 'Casual' },
  { id: 203, src: require('../assets/mentshirts/mt3.jpeg'), name: 'Men T-Shirt 3', price: '₹1099', company: 'Menswear', description: 'Premium quality t-shirt.', sizes: ['L', 'XL'], category: 'Casual' },
  { id: 204, src: require('../assets/mentshirts/mt4.jpeg'), name: 'Men T-Shirt 4', price: '₹1199', company: 'Menswear', description: 'Soft and comfortable fabric.', sizes: ['S', 'M', 'L', 'XL'], category: 'Casual' },
  { id: 205, src: require('../assets/mentshirts/mt5.jpeg'), name: 'Men T-Shirt 5', price: '₹899', company: 'Menswear', description: 'Trendy and comfortable t-shirt.', sizes: ['S', 'M', 'L', 'XL'], category: 'Casual' },
  { id: 206, src: require('../assets/mentshirts/mt6.jpeg'), name: 'Men T-Shirt 6', price: '₹999', company: 'Menswear', description: 'Soft cotton t-shirt for daily wear.', sizes: ['M', 'L', 'XL'], category: 'Casual' },
  { id: 207, src: require('../assets/mentshirts/mt7.jpeg'), name: 'Men T-Shirt 7', price: '₹1099', company: 'Menswear', description: 'Classic style t-shirt.', sizes: ['S', 'M', 'L'], category: 'Formal' },
  { id: 208, src: require('../assets/mentshirts/mt8.jpeg'), name: 'Men T-Shirt 8', price: '₹1199', company: 'Menswear', description: 'Premium quality t-shirt.', sizes: ['M', 'L', 'XL'], category: 'Formal' },
  { id: 209, src: require('../assets/mentshirts/mt9.jpeg'), name: 'Men T-Shirt 9', price: '₹899', company: 'Menswear', description: 'Trendy and comfortable t-shirt.', sizes: ['S', 'M', 'L', 'XL'], category: 'Casual' },
  { id: 210, src: require('../assets/mentshirts/mt10.jpeg'), name: 'Men T-Shirt 10', price: '₹999', company: 'Menswear', description: 'Soft cotton t-shirt for daily wear.', sizes: ['M', 'L', 'XL'], category: 'Casual' },
  { id: 211, src: require('../assets/mentshirts/mt11.jpeg'), name: 'Men T-Shirt 11', price: '₹1099', company: 'Menswear', description: 'Classic style t-shirt.', sizes: ['S', 'M', 'L'], category: 'Formal' },
  { id: 212, src: require('../assets/mentshirts/mt12.jpeg'), name: 'Men T-Shirt 12', price: '₹1199', company: 'Menswear', description: 'Premium quality t-shirt.', sizes: ['M', 'L', 'XL'], category: 'Formal' },
  { id: 213, src: require('../assets/mentshirts/mt13.jpeg'), name: 'Men T-Shirt 13', price: '₹899', company: 'Menswear', description: 'Trendy and comfortable t-shirt.', sizes: ['S', 'M', 'L', 'XL'], category: 'Casual' },
  { id: 214, src: require('../assets/mentshirts/mt14.jpeg'), name: 'Men T-Shirt 14', price: '₹999', company: 'Menswear', description: 'Soft cotton t-shirt for daily wear.', sizes: ['M', 'L', 'XL'], category: 'Casual' },
  { id: 215, src: require('../assets/mentshirts/mt15.jpeg'), name: 'Men T-Shirt 15', price: '₹1099', company: 'Menswear', description: 'Classic style t-shirt.', sizes: ['S', 'M', 'L'], category: 'Formal' },
  { id: 216, src: require('../assets/mentshirts/mt16.jpeg'), name: 'Men T-Shirt 16', price: '₹1199', company: 'Menswear', description: 'Premium quality t-shirt.', sizes: ['M', 'L', 'XL'], category: 'Formal' },
  { id: 217, src: require('../assets/mentshirts/mt17.jpeg'), name: 'Men T-Shirt 17', price: '₹1299', company: 'Menswear', description: 'Limited edition t-shirt.', sizes: ['S', 'M', 'L', 'XL'], category: 'Formal' },
];

function MenTShirtsPage() {
  const navigate = useNavigate();
  // --- State and logic (copied from HomePage for consistency) ---
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMen, setOpenMen] = useState(true); // Open by default for Men > T-Shirts
  const [openWomen, setOpenWomen] = useState(false);
  const [openKids, setOpenKids] = useState(false);
  const handleMenClick = () => setOpenMen((prev) => !prev);
  const handleWomenClick = () => setOpenWomen((prev) => !prev);
  const handleKidsClick = () => setOpenKids((prev) => !prev);
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useDarkModeSync(false);
  const user = JSON.parse(localStorage.getItem('user')) || { firstName: '', lastName: '' };
  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const handleLogout = () => { setAnchorEl(null); window.location.href = '/login'; };
  const handleThemeToggle = () => { setDarkMode((prev) => !prev); document.body.style.backgroundColor = !darkMode ? '#222' : '#fff'; };
  const open = Boolean(anchorEl);
  // Card popup
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const handleProductClick = (product) => { setSelectedProduct(product); setProductDialogOpen(true); };
  const handleProductDialogClose = () => { setProductDialogOpen(false); setSelectedProduct(null); setAddedToCart(false); };

  const handleAddToCart = () => {
    addToCart(selectedProduct, 1, selectedProduct.sizes?.[0] || null);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleViewCart = () => {
    handleProductDialogClose();
    navigate('/cart');
  };
  // AppBar search, favourite, filter logic (copied from HomePage)
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({ Formal: false, Casual: false });
  const [pendingFilters, setPendingFilters] = useState({ Formal: false, Casual: false });
  const [pendingPrice, setPendingPrice] = useState([100, 5000]);
  const [priceRange, setPriceRange] = useState([100, 5000]);
  const handleFilterClick = (event) => { setPendingFilters(selectedFilters); setPendingPrice(priceRange); setFilterAnchorEl(event.currentTarget); };
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleFilterChange = (event) => setPendingFilters((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
  const handlePendingPriceChange = (event, newValue) => setPendingPrice(newValue);
  const handleApplyFilters = () => { setSelectedFilters(pendingFilters); setPriceRange(pendingPrice); setFilterAnchorEl(null); };
  const handleClearFilters = () => { setPendingFilters({ Formal: false, Casual: false }); setPendingPrice([100, 5000]); setSelectedFilters({ Formal: false, Casual: false }); setPriceRange([100, 5000]); setFilterAnchorEl(null); };

  // Favourites logic (copied from HomePage)
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem('token');
  const BASE_URL = 'http://localhost:5000';
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/favourite`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavourites(res.data.map(f => String(f.productId)));
      } catch (err) {}
    };
    if (token) fetchFavourites();
  }, [token]);
  const handleFavourite = async (productId, isFav) => {
    if (!token) return alert('Login required');
    if (isFav) {
      await axios.delete(`${BASE_URL}/api/favourite/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
      setFavourites(favourites.filter(id => id !== productId));
    } else {
      await axios.post(`${BASE_URL}/api/favourite`, { productId }, { headers: { Authorization: `Bearer ${token}` } });
      setFavourites([...favourites, productId]);
    }
  };


  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: darkMode ? '#222' : '#fafafa' }}>
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
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.18)'
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
              PaperProps={{ sx: { p: 2, minWidth: 200, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.18)' } }}
            >
              <Typography align="center" variant="h6" sx={{ mt: 1, mb: 2 }}>{fullName}</Typography>
              <Button variant="outlined" color="error" startIcon={<CloseIcon />} onClick={handleLogout} sx={{ width: '100%' }}>Logout</Button>
            </Popover>
          </>
        }
        drawerContent={
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 2, mb: 1 }}>
              <Typography variant="h5" sx={{ fontFamily: 'cursive', fontWeight: 700, letterSpacing: 2, color: '#222', flex: 1 }}>ShopSphere</Typography>
              {darkMode ? <NightlightIcon sx={{ color: '#222', mr: 1 }} /> : <WbSunnyIcon sx={{ color: '#fbc02d', mr: 1 }} />}
              <Switch checked={darkMode} onChange={handleThemeToggle} color="default" />
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
                  <ListItem button selected sx={{ pl: 4 }}>
                    <ListItemText primary="T-Shirts" />
                  </ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { setDrawerOpen(false); window.location.href = '/men-shirts'; }}><ListItemText primary="Shirts" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/men-jeans'; }}><ListItemText primary="Jeans" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/men-pants'; }}><ListItemText primary="Pants" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/men-shoes'; }}><ListItemText primary="Shoes" /></ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={handleWomenClick} sx={{ pl: 2 }}>
                <ListItemText primary="Women" primaryTypographyProps={{ fontWeight: 600 }} />
                {openWomen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openWomen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/women-tops'; }}><ListItemText primary="Tops & Tees" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/women-dresses'; }}><ListItemText primary="Dresses" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/women-jeans'; }}><ListItemText primary="Jeans" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/women-kurtis'; }}><ListItemText primary="Kurtis" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/women-shoes'; }}><ListItemText primary="Shoes" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/women-handbags'; }}><ListItemText primary="Handbags" /></ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={handleKidsClick} sx={{ pl: 2 }}>
                <ListItemText primary="Kids" primaryTypographyProps={{ fontWeight: 600 }} />
                {openKids ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openKids} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/kids-tshirts'; }}><ListItemText primary="T-Shirts" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/kids-shirts'; }}><ListItemText primary="Shirts" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/kids-jeans'; }}><ListItemText primary="Jeans" /></ListItem>
                  <ListItem button sx={{ pl: 4 }}  onClick={() => { setDrawerOpen(false); window.location.href = '/kids-shorts'; }}><ListItemText primary="Shorts" /></ListItem>
                </List>
              </Collapse>
            
            </List>
          </>
        }
      />
      {/* Main Content */}
      <Box sx={{ flex: 1, width: '100vw', px: { xs: 2, sm: 4, md: 8 }, pt: 0, pb: 4, mt: '64px', overflowY: 'auto', background: darkMode ? '#222' : '#fafafa' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: darkMode ? '#b0b0b0' : '#222', textAlign: 'center', fontFamily: 'cursive' }}>
          Men T-Shirts Collection
        </Typography>
        <Grid container spacing={3} sx={{ m: 0, width: '100%', maxWidth: 1400, mx: 'auto', pr: { xs: 1, sm: 3, md: 6 } }}>
          {tshirtImages
            .filter(product => {
              // Search filter
              const search = searchTerm.trim().toLowerCase();
              const matchesSearch =
                !search ||
                product.name.toLowerCase().includes(search) ||
                product.company.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search);
              // Category filter
              const categoryActive = Object.keys(selectedFilters).filter(k => selectedFilters[k]);
              const inCategory = categoryActive.length === 0 || categoryActive.includes(product.category);
              // Price filter (convert price string to number)
              const priceNum = parseInt(product.price.replace(/[^\d]/g, ''));
              const inPrice = priceNum >= priceRange[0] && priceNum <= priceRange[1];
              return matchesSearch && inCategory && inPrice;
            })
            .map((product, idx) => {
              const isFav = favourites.includes(String(product.id));
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      background: darkMode ? '#181818' : '#fff',
                      boxShadow: darkMode ? '0 2px 12px #111' : '0 2px 12px #ccc',
                      transition: 'transform 0.25s cubic-bezier(.4,2,.3,.9), box-shadow 0.25s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.04)',
                        boxShadow: darkMode ? '0 6px 24px #222' : '0 6px 24px #aaa',
                      },
                      position: 'relative',
                      height: 340,
                      width: 320,
                      minWidth: 320,
                      maxWidth: 320,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      m: 'auto',
                      overflow: 'hidden',
                    }}
                    onClick={() => handleProductClick(product)}
                  >
                {/* Favourite Icon */}
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    zIndex: 3,
                    background: '#fff',
                    boxShadow: '0 2px 8px #ccc',
                    '&:hover': { background: '#ffeaea' }
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    handleFavourite(product.id, isFav);
                  }}
                  aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
                >
                  <FavoriteIcon color={isFav ? 'error' : 'disabled'} />
                </IconButton>
                <Box sx={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', mt: 2, mb: 1 }}>
                  <CardMedia
                    component="img"
                    image={product.src}
                    alt={product.name}
                    sx={{
                      maxWidth: '96%',
                      maxHeight: 190,
                      objectFit: 'contain',
                      borderRadius: 2,
                    }}
                  />
                </Box>
                <CardContent sx={{ flex: '1 1 auto', minHeight: 60, maxHeight: 90, textAlign: 'center', color: darkMode ? '#fff' : '#222', fontFamily: 'cursive', background: 'transparent', p: 1.2, overflow: 'hidden' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.98rem', lineHeight: 1.13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.89rem', lineHeight: 1.05, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.company}</Typography>
                  <Typography variant="body2" sx={{ mt: 0.7, fontSize: '0.86rem', lineHeight: 1.08, height: 32, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{product.description}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2, mt: 'auto', position: 'relative', zIndex: 2, background: 'transparent' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1.08rem' }}>{product.price}</Typography>
                </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        {/* Product Details Popup */}
        <Dialog
          open={productDialogOpen}
          onClose={handleProductDialogClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
              borderRadius: 3,
              border: '1px solid rgba(255,255,255,0.18)'
            }
          }}
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
            {selectedProduct?.name}
            <IconButton onClick={handleProductDialogClose} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {addedToCart && (
              <Alert severity="success" sx={{ mb: 2 }}>
                ✓ Product added to cart!
              </Alert>
            )}
            {selectedProduct && (
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: 'center' }}>
                <img
                  src={selectedProduct.src}
                  alt={selectedProduct.name}
                  style={{ width: 220, height: 'auto', borderRadius: 12, objectFit: 'cover', boxShadow: '0 2px 12px #ccc' }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>{selectedProduct.company}</Typography>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>Price: {selectedProduct.price}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>{selectedProduct.description}</Typography>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Sizes:</Typography>
                    {selectedProduct.sizes.map((size, i) => (
                      <Chip key={i} label={size} size="small" sx={{ mr: 1, mt: 1 }} />
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>{selectedProduct.delivery}</Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ gap: 1, p: 2 }}>
            <Button onClick={handleProductDialogClose} color="primary">Close</Button>
            <Button onClick={handleAddToCart} color="info" variant="outlined">
              🛒 Add to Cart
            </Button>
            {addedToCart && (
              <Button onClick={handleViewCart} color="success" variant="contained">
                View Cart
              </Button>
            )}
            <Button
              onClick={() => {
                if (selectedProduct?.id) {
                  navigate('/payment', { state: { productId: selectedProduct.id } });
                } else {
                  navigate('/payment');
                }
              }}
              color="success"
              variant="contained"
            >
              Payment
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <GlobalFooter />
    </Box>
  );
}

export default MenTShirtsPage;
