

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalAppBarDrawer from '../components/GlobalAppBarDrawer';
import GlobalProductCard from '../components/GlobalProductCard';
import GlobalProductDialog from '../components/GlobalProductDialog';
import productDetails from '../utils/productDetails';
import GlobalFooter from '../components/GlobalFooter';

import axios from 'axios';
function MenJeansPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null);
  const [selectedFilters, setSelectedFilters] = React.useState({ Formal: false, Casual: false });
  const [pendingFilters, setPendingFilters] = React.useState({ Formal: false, Casual: false });
  const [pendingPrice, setPendingPrice] = React.useState([100, 5000]);
  const [priceRange, setPriceRange] = React.useState([100, 5000]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [productDialogOpen, setProductDialogOpen] = React.useState(false);
  const [favourites, setFavourites] = React.useState([]);
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

  // Get jeans products from global productDetails
  const jeansProducts = productDetails.filter(p => p.id >= 301 && p.id <= 319);

  // Filter logic
  const handleFilterClick = (event) => { setPendingFilters(selectedFilters); setPendingPrice(priceRange); setFilterAnchorEl(event.currentTarget); };
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleFilterChange = (event) => setPendingFilters((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
  const handlePendingPriceChange = (event, newValue) => setPendingPrice(newValue);
  const handleApplyFilters = () => { setSelectedFilters(pendingFilters); setPriceRange(pendingPrice); setFilterAnchorEl(null); };
  const handleClearFilters = () => { setPendingFilters({ Formal: false, Casual: false }); setPendingPrice([100, 5000]); setSelectedFilters({ Formal: false, Casual: false }); setPriceRange([100, 5000]); setFilterAnchorEl(null); };

  // Card popup logic
  const handleProductClick = (product) => { setSelectedProduct(product); setProductDialogOpen(true); };
  const handleProductDialogClose = () => { setProductDialogOpen(false); setSelectedProduct(null); };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#fafafa' }}>
      <GlobalAppBarDrawer
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
        handleClearFilters={handleClearFilters}
        // Navigation for Men > Jeans in drawer
        // The drawerContent is left undefined so the default (with navigation) is used
      />
      <Box sx={{ flex: 1, width: '100vw', px: { xs: 2, sm: 4, md: 8 }, pt: 0, pb: 4, mt: '64px', overflowY: 'auto', background: '#fafafa' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#222', textAlign: 'center', fontFamily: 'cursive' }}>
          Men Jeans Collection
        </Typography>
        <Grid container spacing={3} sx={{ m: 0, width: '100%', maxWidth: 1400, mx: 'auto', pr: { xs: 1, sm: 3, md: 6 } }}>
          {jeansProducts
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
            .map(product => {
              const isFav = favourites.includes(String(product.id));
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <GlobalProductCard
                    product={product}
                    onClick={() => handleProductClick(product)}
                    isFav={isFav}
                    onFavouriteToggle={() => handleFavourite(product.id, isFav)}
                  />
                </Grid>
              );
            })}
        </Grid>
        <GlobalProductDialog
          open={productDialogOpen}
          onClose={handleProductDialogClose}
          product={selectedProduct}
        />
      </Box>
      <GlobalFooter />
    </Box>
  );
}

export default MenJeansPage;
