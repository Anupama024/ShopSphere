import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { addToCart } from '../utils/cartUtils';

/**
 * GlobalProductDialog
 * @param {object} props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {function} props.onClose - Function to close the dialog
 * @param {object} props.product - The product object to display (must have name, src/image, company, price, description, sizes, delivery)
 * @param {function} [props.onPayment] - Optional payment handler (called on Payment button click)
 */
const GlobalProductDialog = ({ open, onClose, product, onPayment }) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return null;

  const handlePayment = () => {
    if (onPayment) {
      onPayment(product);
    } else {
      if (product?.id) {
        navigate('/payment', { state: { productId: product.id } });
      } else {
        navigate('/payment');
      }
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize || null);
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        {product.name}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {addedToCart && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ✓ Product added to cart!
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: 'center' }}>
          <img
            src={product.src || product.image}
            alt={product.name}
            style={{ width: 220, height: 'auto', borderRadius: 12, objectFit: 'cover', boxShadow: '0 2px 12px #ccc' }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>{product.company}</Typography>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>Price: {product.price}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{product.description}</Typography>
            {product.sizes && (
              <Box sx={{ mb: 2 }}>
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <InputLabel>Select Size</InputLabel>
                  <Select
                    value={selectedSize}
                    label="Select Size"
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {product.sizes.map((size, i) => (
                      <MenuItem key={i} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {product.sizes.map((size, i) => (
                    <Chip
                      key={i}
                      label={size}
                      size="small"
                      onClick={() => setSelectedSize(size)}
                      variant={selectedSize === size ? 'filled' : 'outlined'}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>
            )}
            {/* Show delivery date dynamically: 3-5 days from today */}
            <Typography variant="body2" sx={{ mb: 1 }}>
              {(() => {
                const days = 3 + Math.floor((product.id || 0) % 3); // 3, 4, or 5 days
                const deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + days);
                return `Delivery by ${deliveryDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
              })()}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ gap: 1, p: 2 }}>
        <Button onClick={onClose} color="primary">Close</Button>
        <Button onClick={handleAddToCart} color="info" variant="outlined">
          🛒 Add to Cart
        </Button>
        {addedToCart && (
          <Button onClick={handleViewCart} color="success" variant="contained">
            View Cart
          </Button>
        )}
        <Button onClick={handlePayment} color="success" variant="contained">Payment</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GlobalProductDialog;
