import LoginBgSlideshow from '../components/LoginBgSlideshow';
import React, { useState } from 'react';
import useDarkModeSync from '../utils/useDarkModeSync';
import { Box, Typography, TextField, Button, Paper, Divider, Switch, List, ListItem, ListItemText, IconButton, InputBase, Popover, Tooltip, Avatar, FormGroup, FormControlLabel, Checkbox, Slider, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterListIcon from '@mui/icons-material/FilterList';
import LogoutIcon from '@mui/icons-material/Logout';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GlobalAppBarDrawer from '../components/GlobalAppBarDrawer';
import GlobalFooter from '../components/GlobalFooter';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearCart, getCartCount } from '../utils/cartUtils';



function PaymentPage() {
  const location = useLocation();
  const cartState = location.state?.cartItems || null;
  const cartTotals = location.state?.totals || null;
  const initialProductId = location.state && location.state.productId ? location.state.productId : '';
  const defaultAmount = cartTotals ? cartTotals.total : '';
  const [form, setForm] = useState({
    name: '',
    card: '',
    expiry: '',
    cvv: '',
    amount: String(defaultAmount || ''),
    productId: initialProductId || ''
  });
  const [status, setStatus] = useState('');
  const [darkMode, setDarkMode] = useDarkModeSync(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleThemeToggle = () => setDarkMode((prev) => !prev);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
    setStatus('');
  };

  // Validation helpers
  const validateCardNumber = (num) => /^\d{16}$/.test(num);
  const validateExpiry = (exp) => /^(0[1-9]|1[0-2])\/(\d{2})$/.test(exp);
  const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);
  const validateAmount = (amt) => Number(amt) > 0;

  const handleSubmit = async e => {
    e.preventDefault();
    // Trim all form values
    const trimmedForm = {
      name: form.name ? form.name.trim() : '',
      card: form.card ? form.card.trim() : '',
      expiry: form.expiry ? form.expiry.trim() : '',
      cvv: form.cvv ? form.cvv.trim() : '',
      amount: form.amount ? String(form.amount).trim() : '',
      productId: form.productId ? form.productId : ''
    };
    // Frontend validation - check all required fields
    const isNameValid = trimmedForm.name && trimmedForm.name.length > 0;
    const isCardValid = trimmedForm.card && trimmedForm.card.length > 0;
    const isExpiryValid = trimmedForm.expiry && trimmedForm.expiry.length > 0;
    const isCVVValid = trimmedForm.cvv && trimmedForm.cvv.length > 0;
    const isAmountValid = trimmedForm.amount && trimmedForm.amount.length > 0 && Number(trimmedForm.amount) > 0;

    if (!isNameValid || !isCardValid || !isExpiryValid || !isCVVValid || !isAmountValid) {
      setFormError('All fields are required');
      return;
    }
    setFormError('');
    setStatus('Processing...');
    try {
      const payload = {
        name: trimmedForm.name,
        card: trimmedForm.card,
        expiry: trimmedForm.expiry,
        cvv: trimmedForm.cvv,
        amount: Number(trimmedForm.amount),
        productId: trimmedForm.productId ? Number(trimmedForm.productId) : undefined,
        cartItems: cartState || []
      };
      const res = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Payment successful! Redirecting...');
        // Clear the cart after successful payment
        clearCart();
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        setStatus(data.message || 'Payment failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setStatus('Payment failed');
    }
  };

  // --- AppBar state for PaymentPage ---
  const [searchTerm, setSearchTerm] = useState('');
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

  return (
    <>
      <LoginBgSlideshow />
      <GlobalAppBarDrawer
        darkMode={darkMode}
        appBarContent={
          <>
            <Typography
              variant="h5"
              sx={{ fontFamily: 'cursive', fontWeight: 700, letterSpacing: 2, color: darkMode ? '#b0b0b0' : '#424242', flex: 0, mr: 1 }}
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
      />
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'transparent',
        pt: '64px',
        position: 'relative',
        zIndex: 1
      }}>
        <Paper sx={{
          p: 4,
          minWidth: 340,
          maxWidth: 400,
          background: 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.18)',
          zIndex: 2,
          position: 'relative'
        }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, textAlign: 'center' }}>Payment</Typography>
          <Divider sx={{ mb: 2 }} />
          {cartState && (
            <Box sx={{ mb: 3, p: 2, background: 'rgba(255,255,255,0.65)', borderRadius: 2, border: '1px solid rgba(0,0,0,0.08)' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Cart Checkout Summary</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Items: {cartState.length}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Total Amount: ₹{cartTotals ? cartTotals.total : form.amount}</Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>You are checking out all cart items at once.</Typography>
            </Box>
          )}
          <form onSubmit={handleSubmit}>
            {/* Hidden productId field */}
            <input type="hidden" name="productId" value={form.productId} />
            <TextField label="Name on Card" name="name" value={form.name} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Card Number" name="card" value={form.card} onChange={handleChange} fullWidth required sx={{ mb: 2 }} inputProps={{ maxLength: 16, inputMode: 'numeric', pattern: '[0-9]*' }} />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField label="Expiry (MM/YY)" name="expiry" value={form.expiry} onChange={handleChange} required sx={{ flex: 1 }} placeholder="MM/YY" inputProps={{ maxLength: 5 }} />
              <TextField label="CVV" name="cvv" value={form.cvv} onChange={handleChange} required sx={{ flex: 1 }} inputProps={{ maxLength: 4, inputMode: 'numeric', pattern: '[0-9]*' }} />
            </Box>
            <TextField
              label="Amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              type="number"
              inputProps={{ min: 1 }}
              disabled={Boolean(cartState)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>Pay Now</Button>
          </form>
          {formError && <Typography sx={{ mt: 2, textAlign: 'center', color: 'red' }}>{formError}</Typography>}
          {status && <Typography sx={{ mt: 2, textAlign: 'center', color: status.includes('success') ? 'green' : 'red' }}>{status}</Typography>}
        </Paper>
      </Box>
      <GlobalFooter />
    </>
  );
}

export default PaymentPage;
