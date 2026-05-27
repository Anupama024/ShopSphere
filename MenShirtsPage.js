import React, { useState } from 'react';
import useDarkModeSync from '../utils/useDarkModeSync';
import { useNavigate } from 'react-router-dom';
import GlobalAppBarDrawer from '../components/GlobalAppBarDrawer';
import GlobalFooter from '../components/GlobalFooter';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import Popover from '@mui/material/Popover';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { addToCart, getCartCount } from '../utils/cartUtils';

// Import images from assets/menshirts
export const shirtImages = [
  { id: 101, src: require('../assets/menshirts/ms1.jpeg'), name: 'Men Shirt 1', price: '₹1299', company: 'Menswear', description: 'Classic formal shirt.', sizes: ['S', 'M', 'L', 'XL'], delivery: 'Delivery by Apr 25, 2026', category: 'Formal' },
  { id: 102, src: require('../assets/menshirts/ms2.jpeg'), name: 'Men Shirt 2', price: '₹1399', company: 'Menswear', description: 'Premium cotton shirt.', sizes: ['M', 'L', 'XL'], delivery: 'Delivery by Apr 26, 2026', category: 'Formal' },
  { id: 103, src: require('../assets/menshirts/ms3.jpeg'), name: 'Men Shirt 3', price: '₹1499', company: 'Menswear', description: 'Trendy casual shirt.', sizes: ['L', 'XL'], delivery: 'Delivery by Apr 27, 2026', category: 'Casual' },
  { id: 104, src: require('../assets/menshirts/ms4.jpeg'), name: 'Men Shirt 4', price: '₹1599', company: 'Menswear', description: 'Soft and comfortable fabric.', sizes: ['S', 'M', 'L', 'XL'], delivery: 'Delivery by Apr 28, 2026', category: 'Casual' },
  { id: 105, src: require('../assets/menshirts/ms5.jpeg'), name: 'Men Shirt 5', price: '₹1299', company: 'Menswear', description: 'Trendy and comfortable shirt.', sizes: ['S', 'M', 'L', 'XL'], delivery: 'Delivery by Apr 29, 2026', category: 'Casual' },
  { id: 106, src: require('../assets/menshirts/ms6.jpeg'), name: 'Men Shirt 6', price: '₹1399', company: 'Menswear', description: 'Soft cotton shirt for daily wear.', sizes: ['M', 'L', 'XL'], delivery: 'Delivery by Apr 30, 2026', category: 'Casual' },
  { id: 107, src: require('../assets/menshirts/ms7.jpeg'), name: 'Men Shirt 7', price: '₹1499', company: 'Menswear', description: 'Classic style shirt.', sizes: ['S', 'M', 'L'], delivery: 'Delivery by May 1, 2026', category: 'Formal' },
  { id: 108, src: require('../assets/menshirts/ms8.jpeg'), name: 'Men Shirt 8', price: '₹1599', company: 'Menswear', description: 'Premium quality shirt.', sizes: ['M', 'L', 'XL'], delivery: 'Delivery by May 2, 2026', category: 'Formal' },
  { id: 109, src: require('../assets/menshirts/ms9.jpeg'), name: 'Men Shirt 9', price: '₹1699', company: 'Menswear', description: 'Modern fit shirt.', sizes: ['S', 'M', 'L', 'XL'], delivery: 'Delivery by May 3, 2026', category: 'Casual' },
  { id: 110, src: require('../assets/menshirts/ms10.jpeg'), name: 'Men Shirt 10', price: '₹1799', company: 'Menswear', description: 'Elegant striped shirt.', sizes: ['M', 'L', 'XL'], delivery: 'Delivery by May 4, 2026', category: 'Formal' },
  { id: 111, src: require('../assets/menshirts/ms11.jpeg'), name: 'Men Shirt 11', price: '₹1899', company: 'Menswear', description: 'Slim fit designer shirt.', sizes: ['L', 'XL'], delivery: 'Delivery by May 5, 2026', category: 'Casual' },
  { id: 112, src: require('../assets/menshirts/ms12.jpeg'), name: 'Men Shirt 12', price: '₹1999', company: 'Menswear', description: 'Luxury linen shirt.', sizes: ['S', 'M', 'L', 'XL'], delivery: 'Delivery by May 6, 2026', category: 'Formal' },
  { id: 113, src: require('../assets/menshirts/ms13.jpeg'), name: 'Men Shirt 13', price: '₹2099', company: 'Menswear', description: 'Printed casual shirt.', sizes: ['M', 'L', 'XL'], delivery: 'Delivery by May 7, 2026', category: 'Casual' },
];

function MenShirtsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem('token');
  const BASE_URL = 'http://localhost:5000';
  React.useEffect(() => {
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
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
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

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
    setAddedToCart(false);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, 1, selectedProduct.sizes?.[0] || null);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleViewCart = () => {
    handleCloseDialog();
    window.location.href = '/cart';
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
              <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ width: '100%' }}>Logout</Button>
            </Popover>
          </>
        }
      />
      <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#222' : '#fafafa', pt: '64px', px: { xs: 2, sm: 4, md: 8 }, overflow: 'visible' }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'cursive', fontWeight: 700, letterSpacing: 2, color: darkMode ? '#b0b0b0' : '#222', textAlign: 'center', mt: 2, mb: 4 }}>
          Men Shirts
        </Typography>
        <Grid container spacing={3}>
          {shirtImages
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
                    onClick={() => handleOpenDialog(product)}
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
                    <Box sx={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', mt: 2, mb: 1, overflow: 'visible' }}>
                      <CardMedia
                        component="img"
                        image={product.src}
                        alt={product.name}
                        sx={{
                          width: '96%',
                          height: 190,
                          objectFit: 'contain',
                          borderRadius: 2,
                          overflow: 'visible'
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
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Product Details</DialogTitle>
          <DialogContent>
            {addedToCart && (
              <Alert severity="success" sx={{ mb: 2 }}>
                ✓ Product added to cart!
              </Alert>
            )}
            {selectedProduct && (
              <>
                <img src={selectedProduct.src} alt={selectedProduct.name} style={{ width: '100%', marginBottom: 16 }} />
                <Typography variant="h6">{selectedProduct.name}</Typography>
                <Typography>Amount: {selectedProduct.price}</Typography>
                <Typography>Company: {selectedProduct.company}</Typography>
                <Typography>Description: {selectedProduct.description}</Typography>
                <Typography>Sizes: {selectedProduct.sizes?.join(', ')}</Typography>
                <Typography>Category: {selectedProduct.category}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
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
                  window.location.href = `/payment?productId=${selectedProduct.id}`;
                } else {
                  window.location.href = '/payment';
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
    </>
  );
}

export default MenShirtsPage;
