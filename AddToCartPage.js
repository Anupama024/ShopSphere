import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDarkModeSync from '../utils/useDarkModeSync';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import GlobalAppBarDrawer from '../components/GlobalAppBarDrawer';
import GlobalFooter from '../components/GlobalFooter';
import { getCartItems, removeFromCart, updateCartItemQuantity, calculateCartTotals, clearCart } from '../utils/cartUtils';
import Alert from '@mui/material/Alert';

const AddToCartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, discount: 0, deliveryFee: 0, total: 0 });
  const [darkMode, setDarkMode] = useDarkModeSync(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  // Load cart items on mount
  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
    setTotals(calculateCartTotals(items));
  }, []);

  const handleThemeToggle = () => setDarkMode((prev) => !prev);

  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) return;
    const updatedItems = updateCartItemQuantity(cartItemId, newQuantity);
    setCartItems(updatedItems);
    setTotals(calculateCartTotals(updatedItems));
  };

  const handleRemoveItem = (cartItemId) => {
    const updatedItems = removeFromCart(cartItemId);
    setCartItems(updatedItems);
    setTotals(calculateCartTotals(updatedItems));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/payment', { state: { cartItems, totals } });
  };

  const handleContinueShopping = () => {
    navigate('/home');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: darkMode ? '#1a1a1a' : '#fafafa' }}>
      <GlobalAppBarDrawer />

      <Container maxWidth="lg" sx={{ flex: 1, py: 4, mt: '64px' }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: darkMode ? '#fff' : '#222', textAlign: 'center' }}>
          Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ mb: 3, color: darkMode ? '#b0b0b0' : '#666' }}>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={handleContinueShopping}
              sx={{ px: 4, py: 1.5 }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: darkMode ? '#fff' : '#222' }}>
                Products ({cartItems.length})
              </Typography>

              <Paper
                sx={{
                  p: 3,
                  background: darkMode ? '#2a2a2a' : '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                  borderRadius: 2
                }}
              >
                {cartItems.map((item) => (
                  <Box key={item.cartItemId} sx={{ mb: 3, pb: 3, borderBottom: '1px solid rgba(200,200,200,0.3)', '&:last-child': { borderBottom: 'none', mb: 0, pb: 0 } }}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Product Image */}
                      <Grid item xs={12} sm={3}>
                        <Box
                          sx={{
                            width: '100%',
                            height: 150,
                            bgcolor: '#f0f0f0',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                          }}
                        >
                          <img
                            src={item.src || item.image}
                            alt={item.name}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: 8 }}
                          />
                        </Box>
                      </Grid>

                      {/* Product Details */}
                      <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 600, color: darkMode ? '#fff' : '#222' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5, color: darkMode ? '#b0b0b0' : '#666' }}>
                          {item.company}
                        </Typography>
                        {item.selectedSize && (
                          <Typography variant="body2" sx={{ mb: 0.5, color: darkMode ? '#b0b0b0' : '#666' }}>
                            Size: <strong>{item.selectedSize}</strong>
                          </Typography>
                        )}
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#d4af37' }}>
                          {item.price}
                        </Typography>
                      </Grid>

                      {/* Quantity Control */}
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: darkMode ? '#333' : '#f5f5f5', p: 1, borderRadius: 1, justifyContent: 'center' }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                            sx={{ color: darkMode ? '#b0b0b0' : '#666' }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ mx: 1, fontWeight: 600, minWidth: 20, textAlign: 'center', color: darkMode ? '#fff' : '#222' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                            sx={{ color: darkMode ? '#b0b0b0' : '#666' }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>

                      {/* Delete Button */}
                      <Grid item xs={6} sm={2}>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveItem(item.cartItemId)}
                          sx={{ width: '100%' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Paper>

              <Button
                variant="outlined"
                onClick={handleContinueShopping}
                sx={{ mt: 3, color: darkMode ? '#fff' : '#222', borderColor: darkMode ? '#fff' : '#222' }}
              >
                Continue Shopping
              </Button>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: darkMode ? '#fff' : '#222' }}>
                Order Summary
              </Typography>

              <Paper
                sx={{
                  p: 3,
                  background: darkMode ? '#2a2a2a' : '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  position: 'sticky',
                  top: 100
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: darkMode ? '#b0b0b0' : '#666' }}>Subtotal:</Typography>
                    <Typography sx={{ fontWeight: 600, color: darkMode ? '#fff' : '#222' }}>₹{totals.subtotal}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: '#27ae60' }}>Discount (15%):</Typography>
                    <Typography sx={{ fontWeight: 600, color: '#27ae60' }}>-₹{totals.discount}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: darkMode ? '#b0b0b0' : '#666' }}>Delivery Fee:</Typography>
                    <Typography sx={{ fontWeight: 600, color: darkMode ? '#fff' : '#222' }}>
                      {totals.deliveryFee === 0 ? 'FREE' : `₹${totals.deliveryFee}`}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2, borderColor: darkMode ? '#444' : '#ddd' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: darkMode ? '#fff' : '#222' }}>
                    Total:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#d4af37' }}>
                    ₹{totals.total}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #3d2817 0%, #5c3d2e 100%)',
                    color: '#fff',
                    fontWeight: 600,
                    py: 1.5,
                    '&:hover': { background: '#2d1810' }
                  }}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                {/* Info Messages */}
                <Box sx={{ mt: 3 }}>
                  {totals.deliveryFee === 0 && (
                    <Alert severity="success" sx={{ mb: 1, fontSize: '0.85rem' }}>
                      🎉 Free shipping on this order!
                    </Alert>
                  )}
                  <Alert severity="info" sx={{ fontSize: '0.85rem' }}>
                    ✓ Secure checkout with multiple payment options
                  </Alert>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      <GlobalFooter />
    </Box>
  );
};

export default AddToCartPage;
