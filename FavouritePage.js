import React, { useEffect, useState } from 'react';
import axios from 'axios';
import productDetails from '../utils/productDetails';
import useDarkModeSync from '../utils/useDarkModeSync';
import { shirtImages } from './MenShirtsPage';
import { tshirtImages } from './MenTShirtsPage';
import GlobalAppBarDrawer from '../components/GlobalAppBarDrawer';
import Typography from '@mui/material/Typography';
import GlobalProductDialog from '../components/GlobalProductDialog';
import GlobalFooter from '../components/GlobalFooter';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const FavouritePage = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useDarkModeSync(false);
  const [searchTerm, setSearchTerm] = useState('');
  // Filter popup state (like HomePage)
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({ Formal: false, Casual: false });
  const [pendingFilters, setPendingFilters] = useState({ Formal: false, Casual: false });
  const [pendingPrice, setPendingPrice] = useState([100, 5000]);
  const [priceRange, setPriceRange] = useState([100, 5000]);

  // Product dialog state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);

  // Filter popup handlers (like HomePage)
  const handleFilterClick = (event) => { setPendingFilters(selectedFilters); setPendingPrice(priceRange); setFilterAnchorEl(event.currentTarget); };
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleFilterChange = (event) => setPendingFilters((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
  const handlePendingPriceChange = (event, newValue) => setPendingPrice(newValue);
  const handleApplyFilters = () => { setSelectedFilters(pendingFilters); setPriceRange(pendingPrice); setFilterAnchorEl(null); };
  const handleClearFilters = () => { setPendingFilters({ Formal: false, Casual: false }); setPendingPrice([100, 5000]); setSelectedFilters({ Formal: false, Casual: false }); setPriceRange([100, 5000]); setFilterAnchorEl(null); };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem('token');
        const BASE_URL = 'http://localhost:5000';
        const res = await axios.get(`${BASE_URL}/api/favourite`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavourites(res.data);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, []);

  // Remove favourite handler
  const handleRemoveFavourite = async (productId) => {
    const token = localStorage.getItem('token');
    const BASE_URL = 'http://localhost:5000';
    try {
      await axios.delete(`${BASE_URL}/api/favourite/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavourites(favourites.filter(fav => String(fav.productId) !== String(productId)));
    } catch (err) {
      // handle error
    }
  };

  // Filter favourites by search term (like HomePage)
  // Filter favourites by search term and filters (like HomePage)
  const filteredFavourites = favourites.filter((fav) => {
    let product = productDetails.find(p => String(p.id) === String(fav.productId))
      || shirtImages.find(p => String(p.id) === String(fav.productId))
      || tshirtImages.find(p => String(p.id) === String(fav.productId));
    if (!product) return false;
    // Normalize image property for consistent access
    if (!product.image && product.src) {
      product = { ...product, image: product.src };
    }
    const search = (typeof searchTerm === 'string' ? searchTerm.trim().toLowerCase() : '');
    const matchesSearch =
      !search
      || product.name?.toLowerCase().includes(search)
      || product.company?.toLowerCase().includes(search)
      || product.category?.toLowerCase().includes(search)
      || product.description?.toLowerCase().includes(search);
    // Category filter
    const categoryActive = Object.keys(selectedFilters).filter(k => selectedFilters[k]);
    const inCategory = categoryActive.length === 0 || categoryActive.includes(product.category);
    // Price filter (convert price string to number)
    const priceNum = parseInt(product.price?.replace(/[^\d]/g, ''));
    const inPrice = priceNum >= priceRange[0] && priceNum <= priceRange[1];
    return matchesSearch && inCategory && inPrice;
  });

  return (
    <><Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: darkMode ? '#222' : '#fafafa' }}>
      <GlobalAppBarDrawer
        darkMode={darkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterAnchorEl={filterAnchorEl}
        handleFilterClick={handleFilterClick}
        handleFilterClose={handleFilterClose}
        pendingFilters={pendingFilters}
        handleFilterChange={handleFilterChange}
        pendingPrice={pendingPrice}
        handlePendingPriceChange={handlePendingPriceChange}
        handleApplyFilters={handleApplyFilters}
        handleClearFilters={handleClearFilters} />
      <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 4, md: 8 }, py: 4, background: darkMode ? '#222' : '#fafafa' }}>
        <Typography
          variant="h5"
          sx={{
            mt: { xs: 8, sm: 10 },
            mb: 2,
            fontWeight: 600,
            color: darkMode ? '#b0b0b0' : '#222',
            textAlign: 'center',
            fontFamily: 'cursive',
            letterSpacing: 2
          }}
        >
          Your Favourites
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="flex-start">
            {filteredFavourites.map((fav) => {
              let product = productDetails.find(p => String(p.id) === String(fav.productId));
              if (!product) {
                product = shirtImages.find(p => String(p.id) === String(fav.productId));
                if (product) {
                  product = { ...product, image: product.src };
                }
              }
              if (!product) {
                product = tshirtImages.find(p => String(p.id) === String(fav.productId));
                if (product) {
                  product = { ...product, image: product.src };
                }
              }
              if (!product) return null;
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={fav.productId}>
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
                      overflow: 'hidden',
                    }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setProductDialogOpen(true);
                    } }
                  >
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
                        handleRemoveFavourite(fav.productId);
                      } }
                      aria-label="remove-favourite"
                    >
                      <FavoriteIcon color="error" />
                    </IconButton>
                    <Box sx={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', mt: 2, mb: 1, overflow: 'visible' }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          width: '96%',
                          height: 190,
                          objectFit: 'contain',
                          borderRadius: 2,
                          overflow: 'visible'
                        }} />
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
        )}
      </Box>
      <GlobalProductDialog
        open={productDialogOpen}
        onClose={() => setProductDialogOpen(false)}
        product={selectedProduct} />
    </Box><GlobalFooter /></>
  );
};

export default FavouritePage;
