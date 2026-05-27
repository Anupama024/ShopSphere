import express from 'express';
const router = express.Router();
import Cart from '../models/Cart.js';
import User from '../models/User.js';

// Get user's cart
router.get('/cart/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add item to cart
router.post('/cart/:userId/add', async (req, res) => {
  try {
    const { productId, name, company, price, quantity = 1, selectedSize, image, src } = req.body;
    
    let cart = await Cart.findOne({ userId: req.params.userId });
    
    if (!cart) {
      cart = new Cart({
        userId: req.params.userId,
        items: [{
          productId,
          name,
          company,
          price,
          quantity,
          selectedSize,
          image,
          src
        }]
      });
    } else {
      // Check if item already exists
      const existingItem = cart.items.find(
        item => item.productId === productId && item.selectedSize === selectedSize
      );
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId,
          name,
          company,
          price,
          quantity,
          selectedSize,
          image,
          src
        });
      }
    }
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cart item quantity
router.put('/cart/:userId/item/:productId', async (req, res) => {
  try {
    const { quantity, selectedSize } = req.body;
    
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const item = cart.items.find(
      i => i.productId === parseInt(req.params.productId) && i.selectedSize === selectedSize
    );
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      cart.items = cart.items.filter(
        i => !(i.productId === parseInt(req.params.productId) && i.selectedSize === selectedSize)
      );
    } else {
      item.quantity = quantity;
    }
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove item from cart
router.delete('/cart/:userId/item/:productId', async (req, res) => {
  try {
    const { selectedSize } = req.query;
    
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      i => !(i.productId === parseInt(req.params.productId) && i.selectedSize === selectedSize)
    );
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clear entire cart
router.delete('/cart/:userId/clear', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
