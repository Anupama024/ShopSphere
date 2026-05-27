import express from 'express';
import Favourite from '../models/Favourite.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();

// Get all favourites for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const favourites = await Favourite.find({ userId: req.user.id });
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a product to favourites
router.post('/', verifyToken, async (req, res) => {
  const { productId } = req.body;
  try {
    let fav = await Favourite.findOne({ userId: req.user.id, productId });
    if (fav) return res.status(400).json({ error: 'Already in favourites' });
    fav = new Favourite({ userId: req.user.id, productId });
    await fav.save();
    res.json(fav);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a product from favourites
router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    await Favourite.deleteOne({ userId: req.user.id, productId: req.params.productId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
