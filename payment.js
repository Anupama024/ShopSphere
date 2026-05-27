
import express from 'express';
import Payment from '../models/Payment.js';
const router = express.Router();

// GET /api/payment/history
router.get('/history', async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order history' });
  }
});

// POST /api/payment
router.post('/', async (req, res) => {
  try {
    console.log('Received payment data:', req.body);
    let { name, card, expiry, cvv, amount, productId, cartItems } = req.body;
    amount = Number(amount);
    
    // Validation
    if (!name || !card || !expiry || !cvv || amount === undefined || amount === null || amount === '' || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'All payment fields are required' });
    }
    
    // Either cartItems or productId must be provided
    if (!cartItems || cartItems.length === 0) {
      if (!productId) {
        return res.status(400).json({ message: 'Either cart items or product ID is required' });
      }
      productId = Number(productId);
    }
    
    // Create payment record
    const paymentData = {
      name,
      card: card.slice(-4).padStart(card.length, '*'), // Store only last 4 digits for security
      expiry,
      cvv: '*'.repeat(cvv.length), // Mask CVV for security
      amount,
      paymentStatus: 'completed'
    };
    
    // Add productId if single product payment
    if (productId) {
      paymentData.productId = productId;
    }
    
    // Add cartItems if cart payment
    if (cartItems && cartItems.length > 0) {
      paymentData.cartItems = cartItems;
    }
    
    const payment = new Payment(paymentData);
    await payment.save();
    
    res.json({ message: 'Payment successful', paymentId: payment._id });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ message: 'Payment failed', error: err.message });
  }
});

export default router;
