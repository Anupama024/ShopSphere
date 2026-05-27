import mongoose from 'mongoose';

const FavouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: String, // Use String to match productDetails id
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Favourite = mongoose.model('Favourite', FavouriteSchema);
export default Favourite;